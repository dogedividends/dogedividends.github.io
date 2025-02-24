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
        this.availableWallets = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.checkExistingConnection();
        await this.detectWallets();
    }

    async detectWallets() {
        this.availableWallets = [];

        // Check for MetaMask
        if (window.ethereum?.isMetaMask) {
            this.availableWallets.push({
                name: 'MetaMask',
                provider: window.ethereum,
                icon: '<i class="fab fa-ethereum"></i>',
                supportsBSC: true
            });
        }

        // Check for Binance Wallet
        if (window.BinanceChain) {
            this.availableWallets.push({
                name: 'Binance Wallet',
                provider: window.BinanceChain,
                icon: '<i class="fas fa-coins"></i>',
                supportsBSC: true
            });
        }

        // Check for Trust Wallet
        if (window.ethereum?.isTrust) {
            this.availableWallets.push({
                name: 'Trust Wallet',
                provider: window.ethereum,
                icon: '<i class="fas fa-shield-alt"></i>',
                supportsBSC: true
            });
        }

        // Check for Phantom
        if (window.phantom?.ethereum) {
            this.availableWallets.push({
                name: 'Phantom',
                provider: window.phantom.ethereum,
                icon: '<i class="fas fa-ghost"></i>',
                supportsBSC: false
            });
        }

        // Generic Web3 wallet check
        if (window.ethereum && !this.availableWallets.some(w => w.provider === window.ethereum)) {
            this.availableWallets.push({
                name: 'Web3 Wallet',
                provider: window.ethereum,
                icon: '<i class="fas fa-wallet"></i>',
                supportsBSC: true
            });
        }
    }

    createWalletSelectionDialog() {
        // Remove existing dialog if any
        const existingDialog = document.getElementById('wallet-selection-dialog');
        if (existingDialog) {
            existingDialog.remove();
        }

        const dialog = document.createElement('div');
        dialog.id = 'wallet-selection-dialog';
        dialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            padding: 2rem;
            border-radius: 20px;
            z-index: 1000;
            min-width: 300px;
            border: 1px solid var(--primary-gold);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        `;

        const title = document.createElement('h3');
        title.textContent = 'Select a Wallet';
        title.style.cssText = `
            color: var(--primary-gold);
            margin-bottom: 1.5rem;
            text-align: center;
        `;

        const walletList = document.createElement('div');
        walletList.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 1rem;
        `;

        const supportedWallets = this.availableWallets.filter(wallet => wallet.supportsBSC);
        
        if (supportedWallets.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'No BSC-compatible wallets found. Please install MetaMask, Trust Wallet, or Binance Wallet.';
            message.style.cssText = `
                color: #fff;
                text-align: center;
                margin-bottom: 1rem;
            `;
            walletList.appendChild(message);
        } else {
            supportedWallets.forEach(wallet => {
                const button = document.createElement('button');
                button.innerHTML = `${wallet.icon} ${wallet.name}`;
                button.style.cssText = `
                    background: rgba(255, 215, 0, 0.1);
                    border: 1px solid var(--primary-gold);
                    color: var(--primary-gold);
                    padding: 1rem;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    justify-content: center;
                `;
                button.onmouseover = () => {
                    button.style.background = 'rgba(255, 215, 0, 0.2)';
                    button.style.transform = 'translateY(-2px)';
                };
                button.onmouseout = () => {
                    button.style.background = 'rgba(255, 215, 0, 0.1)';
                    button.style.transform = 'translateY(0)';
                };
                button.onclick = () => this.proceedWithWallet(wallet);
                walletList.appendChild(button);
            });
        }

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: var(--primary-gold);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            line-height: 1;
        `;
        closeButton.onclick = () => dialog.remove();

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            z-index: 999;
        `;
        overlay.onclick = () => {
            dialog.remove();
            overlay.remove();
        };

        dialog.appendChild(closeButton);
        dialog.appendChild(title);
        dialog.appendChild(walletList);
        document.body.appendChild(overlay);
        document.body.appendChild(dialog);
    }

    async proceedWithWallet(wallet) {
        // Remove the dialog
        const dialog = document.getElementById('wallet-selection-dialog');
        const overlay = dialog.previousSibling;
        if (dialog) dialog.remove();
        if (overlay) overlay.remove();

        try {
            this.provider = wallet.provider;
            
            // Request account access
            const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
            this.account = accounts[0];
            
            // Initialize Web3
            this.web3 = new Web3(this.provider);
            
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
                alert('Error connecting wallet: ' + error.message);
            }
        }
    }

    async connectWallet() {
        await this.detectWallets();
        this.createWalletSelectionDialog();
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