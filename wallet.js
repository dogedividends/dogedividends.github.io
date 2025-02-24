const CONTRACT_ADDRESS = '0xfdac5dd5d3397c81b6fb3b659d8607e1ffac7287';
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_claimDividend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"totalRewardsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"shareholder","type":"address"}],"name":"getUnpaidEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

const BSC_CHAIN_ID = '0x38'; // BSC Mainnet
const BSC_NETWORK_CONFIG = {
    chainId: BSC_CHAIN_ID,
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/']
};

class WalletManager {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
        this.isConnected = false;
        this.provider = null;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.checkExistingConnection();
    }

    async checkExistingConnection() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    await this.connectWallet();
                }
            } catch (error) {
                console.error('Error checking existing connection:', error);
            }
        }
    }

    setupEventListeners() {
        const connectButton = document.getElementById('connect-wallet');
        const claimButton = document.getElementById('claim-rewards');
        
        connectButton.addEventListener('click', () => this.connectWallet());
        claimButton.addEventListener('click', () => this.claimRewards());

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', async (accounts) => {
                if (accounts.length > 0) {
                    this.account = accounts[0];
                    await this.updateUI();
                } else {
                    this.disconnectWallet();
                }
            });

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }
    }

    async connectWallet() {
        try {
            // Check for various wallet providers
            let provider = null;
            
            if (window.phantom?.solana && window.phantom?.ethereum) {
                // User has Phantom wallet installed
                provider = window.phantom.ethereum;
            } else if (window.ethereum) {
                // MetaMask or other Web3 wallet
                provider = window.ethereum;
            }

            if (!provider) {
                alert('Please install MetaMask or Phantom wallet to use this feature.');
                return;
            }

            this.provider = provider;
            
            // Request account access
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            this.account = accounts[0];
            
            // Initialize Web3
            this.web3 = new Web3(provider);
            
            // Check and switch to BSC network
            await this.ensureBSCNetwork();
            
            // Initialize contract
            this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            
            this.isConnected = true;
            await this.updateUI();
            this.startDataRefresh();
            
        } catch (error) {
            console.error('Error connecting wallet:', error);
            if (error.code === 4001) {
                alert('Please accept the connection request in your wallet.');
            } else {
                alert('Error connecting wallet. Please make sure you are using a BSC-compatible wallet.');
            }
        }
    }

    async ensureBSCNetwork() {
        try {
            const chainId = await this.web3.eth.getChainId();
            if (chainId !== parseInt(BSC_CHAIN_ID, 16)) {
                await this.switchToBSC();
            }
        } catch (error) {
            console.error('Error ensuring BSC network:', error);
            throw error;
        }
    }

    async switchToBSC() {
        try {
            await this.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: BSC_CHAIN_ID }]
            });
        } catch (error) {
            if (error.code === 4902 || error.code === -32603) {
                try {
                    await this.provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [BSC_NETWORK_CONFIG]
                    });
                } catch (addError) {
                    console.error('Error adding BSC network:', addError);
                    throw new Error('Please add Binance Smart Chain to your wallet manually.');
                }
            } else {
                console.error('Error switching to BSC:', error);
                throw error;
            }
        }
    }

    disconnectWallet() {
        this.account = null;
        this.isConnected = false;
        this.updateUI();
    }

    updateUI() {
        const connectButton = document.getElementById('connect-wallet');
        const claimButton = document.getElementById('claim-rewards');
        const pendingRewards = document.getElementById('pending-rewards');
        const totalClaimed = document.getElementById('total-claimed');

        if (this.isConnected) {
            connectButton.classList.add('connected');
            connectButton.innerHTML = `<i class="fas fa-wallet"></i><span>${this.account.substring(0, 6)}...${this.account.substring(38)}</span>`;
            claimButton.disabled = false;
            this.updateRewardsData();
        } else {
            connectButton.classList.remove('connected');
            connectButton.innerHTML = '<i class="fas fa-wallet"></i><span>Connect Wallet</span>';
            claimButton.disabled = true;
            pendingRewards.innerHTML = '<span class="connect-prompt">Connect wallet to view</span>';
            totalClaimed.innerHTML = '<span class="connect-prompt">Connect wallet to view</span>';
        }
    }

    async updateRewardsData() {
        if (!this.isConnected) return;

        try {
            // Update total distributed
            const totalDistributed = await this.contract.methods.totalDistributed().call();
            document.getElementById('total-distributed').innerHTML = 
                `${this.formatNumber(this.web3.utils.fromWei(totalDistributed, 'ether'))} DOGE`;

            // Update pending rewards
            const pendingRewards = await this.contract.methods.getUnpaidEarnings(this.account).call();
            document.getElementById('pending-rewards').innerHTML = 
                `${this.formatNumber(this.web3.utils.fromWei(pendingRewards, 'ether'))} DOGE`;

            // Update total claimed
            const totalClaimed = await this.contract.methods.totalRewardsDistributed(this.account).call();
            document.getElementById('total-claimed').innerHTML = 
                `${this.formatNumber(this.web3.utils.fromWei(totalClaimed, 'ether'))} DOGE`;

        } catch (error) {
            console.error('Error updating rewards data:', error);
        }
    }

    formatNumber(num) {
        return parseFloat(num).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    startDataRefresh() {
        // Refresh data every 30 seconds
        setInterval(() => this.updateRewardsData(), 30000);
    }

    async claimRewards() {
        if (!this.isConnected) return;

        const claimButton = document.getElementById('claim-rewards');
        claimButton.disabled = true;
        claimButton.innerHTML = '<span class="button-content"><i class="fas fa-spinner fa-spin"></i>Claiming...</span>';

        try {
            await this.contract.methods._claimDividend().send({ from: this.account });
            alert('Rewards claimed successfully!');
            this.updateRewardsData();
        } catch (error) {
            console.error('Error claiming rewards:', error);
            alert('Error claiming rewards. Please try again.');
        }

        claimButton.disabled = false;
        claimButton.innerHTML = '<span class="button-content"><i class="fas fa-gift"></i>Claim DOGE Rewards</span>';
    }
}

// Initialize wallet manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.walletManager = new WalletManager();
}); 