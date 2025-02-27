// Constants
const CONTRACT_ADDRESS = '0xfdac5dd5d3397c81b6fb3b659d8607e1ffac7287';
const BSC_CHAIN_ID = '0x38'; // BSC Mainnet
const BSC_RPC_URL = 'https://bsc-dataseed.binance.org/';
const BSC_RPC_URL_BACKUP = 'https://bsc-dataseed1.defibit.io/';
const BSC_EXPLORER = 'https://bscscan.com/tx/';

// Full contract ABI
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_claimDividend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"circulatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"distributorGas","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"shareholder","type":"address"}],"name":"getUnpaidEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDividendExempt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isFeeExempt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"rescueERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minPeriod","type":"uint256"},{"internalType":"uint256","name":"_minDistribution","type":"uint256"},{"internalType":"uint256","name":"_distributorGas","type":"uint256"}],"name":"setDistributionCriteria","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_buy","type":"uint256"},{"internalType":"uint256","name":"_trans","type":"uint256"},{"internalType":"uint256","name":"_wallet","type":"uint256"}],"name":"setParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_liquidity","type":"uint256"},{"internalType":"uint256","name":"_marketing","type":"uint256"},{"internalType":"uint256","name":"_burn","type":"uint256"},{"internalType":"uint256","name":"_rewards","type":"uint256"},{"internalType":"uint256","name":"_development","type":"uint256"},{"internalType":"uint256","name":"_total","type":"uint256"},{"internalType":"uint256","name":"_sell","type":"uint256"},{"internalType":"uint256","name":"_trans","type":"uint256"}],"name":"setStructure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setisBot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"bool","name":"exempt","type":"bool"}],"name":"setisDividendExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setisExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"shares","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"totalExcluded","type":"uint256"},{"internalType":"uint256","name":"totalRealised","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"totalRewardsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"adr","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

// Global variables
let currentAccount = null;
let walletProvider = null;
let web3 = null;
let contract = null;
let connectedWalletType = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('connect-metamask').addEventListener('click', () => connectWallet('metamask'));
    document.getElementById('claim-button').addEventListener('click', claimDividends);
    document.getElementById('disconnect-button').addEventListener('click', disconnectWallet);
    document.getElementById('check-wallet-rewards').addEventListener('click', checkWalletRewards);
    
    // Check contract accessibility
    checkContractAccessibility();
    
    // Check if wallet was previously connected
    checkPreviousConnection();
    
    // Fetch total rewards data
    fetchTotalRewardsData();
});

// Check if a wallet is already connected
async function checkPreviousConnection() {
    // Check if we have a stored connection
    const walletConnected = localStorage.getItem('walletConnected');
    const walletType = localStorage.getItem('walletType');
    
    if (walletConnected === 'true' && walletType) {
        // Try to reconnect based on wallet type
        connectWallet(walletType, true);
    } else {
        // No stored connection, check if wallets are already connected
        checkWalletConnection();
    }
}

// Connect wallet based on type
async function connectWallet(walletType, silent = false) {
    try {
        if (walletType === 'metamask') {
            await connectMetaMask(silent);
        } else {
            console.error("Unknown wallet type:", walletType);
            return;
        }
        
        // Save connection info
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletType', walletType);
        connectedWalletType = walletType;
        
        // Update UI
        updateWalletUI();
        
        // Show success message if not silent
        if (!silent) {
            showMessage(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} wallet connected successfully!`, 'success');
        }
    } catch (error) {
        console.error(`Error connecting ${walletType} wallet:`, error);
        showMessage(`Error connecting ${walletType} wallet: ${error.message}`, 'error');
    }
}

// Check if a wallet is already connected
async function checkWalletConnection() {
    // Check for Ethereum provider (MetaMask)
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                connectMetaMask(true);
            }
        } catch (error) {
            console.error("Error checking MetaMask connection:", error);
        }
    }
}

// MetaMask Connection
async function connectMetaMask(silent = false) {
    if (!window.ethereum) {
        if (!silent) {
            showWalletError("MetaMask is not installed! Please install MetaMask to continue.", 
                           "https://metamask.io/download.html");
        }
        return;
    }
    
    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Switch to BSC network if not already on it
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: BSC_CHAIN_ID }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: BSC_CHAIN_ID,
                            chainName: 'Binance Smart Chain',
                            nativeCurrency: {
                                name: 'BNB',
                                symbol: 'BNB',
                                decimals: 18
                            },
                            rpcUrls: [BSC_RPC_URL],
                            blockExplorerUrls: ['https://bscscan.com/'],
                        }],
                    });
                } catch (addError) {
                    console.error("Error adding BSC network to MetaMask:", addError);
                    showWalletError("Failed to add Binance Smart Chain to MetaMask. Please add it manually.");
                    return;
                }
            } else {
                console.error("Error switching to BSC network:", switchError);
                showWalletError("Failed to switch to Binance Smart Chain. Please try again.");
                return;
            }
        }
        
        // Set up Web3 with Ethereum provider
        setupWeb3(window.ethereum, accounts[0], 'metamask');
        
        // Setup event listeners for account and chain changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        if (!silent) {
            showWalletError("Failed to connect to MetaMask. Please try again.");
        }
    }
}

// Phantom Connection
async function connectPhantom(silent = false) {
    console.log("Attempting to connect to Phantom wallet...");
    
    if (!window.phantom) {
        console.error("Phantom wallet not detected: window.phantom is undefined");
        if (!silent) {
            showWalletError("Phantom wallet is not installed! Please install Phantom to continue.", 
                           "https://phantom.app/download");
        }
        return;
    }
    
    if (!window.phantom.solana) {
        console.error("Phantom Solana provider not detected: window.phantom.solana is undefined");
        if (!silent) {
            showWalletError("Phantom wallet is not installed or Solana provider is not available! Please install Phantom to continue.", 
                           "https://phantom.app/download");
        }
        return;
    }
    
    try {
        console.log("Phantom wallet detected, attempting to connect...");
        
        // Request connection to Phantom
        const resp = await window.phantom.solana.connect();
        console.log("Connected to Phantom Solana:", resp);
        
        const provider = window.phantom.solana;
        
        if (!provider.isConnected) {
            console.error("Provider reports not connected after connect() call");
            throw new Error("Failed to connect to Phantom wallet");
        }
        
        console.log("Checking for Phantom BSC support...");
        // Use Phantom's BSC support (if available)
        if (provider.isPhantom && provider.bsc) {
            try {
                console.log("Phantom BSC support detected, attempting to connect...");
                // Connect to BSC through Phantom's multichain support
                const accounts = await provider.bsc.request({ 
                    method: 'eth_requestAccounts' 
                });
                
                console.log("BSC accounts:", accounts);
                
                if (accounts && accounts.length > 0) {
                    console.log("Switching to BSC chain...");
                    // Try to switch to BSC chain
                    await provider.bsc.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: BSC_CHAIN_ID }],
                    });
                    
                    console.log("Successfully switched to BSC chain");
                    
                    // Set up Web3 with Phantom's BSC provider
                    setupWeb3(provider.bsc, accounts[0], 'phantom');
                    
                    // Setup event listeners
                    provider.bsc.on('accountsChanged', handleAccountsChanged);
                    provider.bsc.on('chainChanged', handleChainChanged);
                    
                    console.log("Phantom BSC setup complete");
                    return;
                } else {
                    console.error("No BSC accounts returned from Phantom");
                }
            } catch (error) {
                console.error("Error connecting to Phantom BSC:", error);
                
                // Check for specific error messages
                if (error.message && (
                    error.message.includes("User rejected") || 
                    error.message.includes("User denied") ||
                    error.message.includes("rejected the request")
                )) {
                    showWalletError("You rejected the connection request. Please try again and approve the connection.");
                } else {
                    // Fall through to try EVM adapter approach or show general error
                    showWalletError(`Error connecting to Phantom BSC: ${error.message}`);
                }
                return;
            }
        } else {
            console.log("Phantom BSC support not detected");
        }
        
        // If Phantom's native BSC support isn't available or failed,
        // show an error message instructing the user to use MetaMask for BSC
        console.log("Showing error message about limited BSC support");
        const errorMessage = `
            <p>Phantom's BSC support is limited or not available in your wallet version.</p>
            <p>To interact with this dApp on BSC, you have two options:</p>
            <ol>
                <li>Use MetaMask instead by clicking the "Connect MetaMask" button</li>
                <li>If you prefer to use Phantom, make sure you have the latest version with BSC support enabled</li>
            </ol>
        `;
        showWalletError(errorMessage);
        
    } catch (error) {
        console.error("Error connecting to Phantom:", error);
        
        // Check for specific error types
        if (error.message && (
            error.message.includes("User rejected") || 
            error.message.includes("User denied") ||
            error.message.includes("rejected the request")
        )) {
            if (!silent) {
                showWalletError("You rejected the connection request. Please try again and approve the connection.");
            }
        } else {
            if (!silent) {
                showWalletError("Failed to connect to Phantom wallet. Please try again. Error: " + error.message);
            }
        }
    }
}

// Set up Web3 with the provider
function setupWeb3(provider, account, walletType) {
    walletProvider = provider;
    currentAccount = account;
    connectedWalletType = walletType;
    
    // Initialize Web3 with the provider
    web3 = new Web3(provider);
    
    // Initialize contract
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    
    // Update UI to show connected account
    updateWalletUI();
    
    // Check for available dividends
    checkAvailableDividends(account);
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
    } else if (accounts[0] !== currentAccount) {
        // Account changed
        currentAccount = accounts[0];
        updateWalletUI();
        checkAvailableDividends(currentAccount);
    }
}

// Handle chain changes
function handleChainChanged(chainId) {
    if (chainId !== BSC_CHAIN_ID) {
        showWalletError("Please switch to Binance Smart Chain to interact with this dApp.");
    } else {
        // Refresh the page to ensure everything is in sync
        window.location.reload();
    }
}

// Update the UI to show connected wallet
function updateWalletUI() {
    if (currentAccount) {
        // Update wallet status
        const walletStatus = document.getElementById('wallet-status');
        walletStatus.textContent = 'Connected';
        walletStatus.classList.add('connected');
        
        // Update wallet address
        const formattedAddress = `${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`;
        document.getElementById('wallet-address').textContent = formattedAddress;
        
        // Hide wallet buttons and show wallet info
        document.querySelector('.wallet-buttons').style.display = 'none';
        document.querySelector('.wallet-info').style.display = 'block';
        
        // Fetch and display available dividends
        checkAvailableDividends(currentAccount);
        
        // Pre-fill the wallet check input with current address
        const walletToCheck = document.getElementById('wallet-to-check');
        if (walletToCheck) {
            walletToCheck.value = currentAccount;
        }
    } else {
        // Reset UI for disconnected state
        document.getElementById('wallet-status').textContent = 'Not Connected';
        document.getElementById('wallet-status').classList.remove('connected');
        document.getElementById('wallet-address').textContent = '';
        document.getElementById('available-dividends').textContent = '0';
        
        // Show wallet buttons and hide wallet info
        document.querySelector('.wallet-buttons').style.display = 'flex';
        document.querySelector('.wallet-info').style.display = 'none';
        
        // Clear the wallet check input
        const walletToCheck = document.getElementById('wallet-to-check');
        if (walletToCheck) {
            walletToCheck.value = '';
        }
        
        // Hide wallet rewards result
        const walletRewardsResult = document.getElementById('wallet-rewards-result');
        if (walletRewardsResult) {
            walletRewardsResult.style.display = 'none';
        }
    }
}

// Fetch available dividends (alias for checkAvailableDividends for backward compatibility)
function fetchAvailableDividends() {
    if (currentAccount) {
        checkAvailableDividends(currentAccount);
    }
}

// Check available dividends for the connected account
async function checkAvailableDividends(account) {
    if (!web3 || !contract || !account) {
        return;
    }
    
    try {
        // Call the getUnpaidEarnings function
        const unpaidEarnings = await contract.methods.getUnpaidEarnings(account).call();
        
        // Convert from wei to ether and update UI
        const earningsInDoge = web3.utils.fromWei(unpaidEarnings, 'ether');
        const availableDividends = document.getElementById('available-dividends');
        
        if (availableDividends) {
            availableDividends.textContent = parseFloat(earningsInDoge).toFixed(8);
        }
        
    } catch (error) {
        console.error("Error checking dividends:", error);
    }
}

// Show wallet error message
function showWalletError(message, installUrl = null) {
    showMessage(message, 'error');
    
    if (installUrl) {
        // Create and show install button if URL is provided
        const messageContainer = document.getElementById('message-container');
        const installButton = document.createElement('a');
        installButton.href = installUrl;
        installButton.target = '_blank';
        installButton.className = 'install-button';
        installButton.textContent = 'Install Wallet';
        messageContainer.appendChild(installButton);
    }
}

// Show message (success, error, info)
function showMessage(message, type = 'info') {
    // Clear any existing messages
    const existingMessage = document.getElementById('message-container');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.id = 'message-container';
    messageContainer.className = `message-container ${type}-message`;
    
    // Create message text
    const messageText = document.createElement('p');
    messageText.innerHTML = message; // Use innerHTML to support HTML content
    messageContainer.appendChild(messageText);
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() {
        messageContainer.remove();
    };
    messageContainer.appendChild(closeButton);
    
    // Add to page - insert at the beginning of the claim section
    const claimSection = document.getElementById('claim-dividends');
    if (claimSection) {
        // Insert as the first child of the container div inside the claim section
        const container = claimSection.querySelector('.container');
        if (container) {
            container.insertBefore(messageContainer, container.firstChild);
        } else {
            // Fallback to appending to the claim section itself
            claimSection.appendChild(messageContainer);
        }
    } else {
        // If claim section not found, append to body as fallback
        document.body.appendChild(messageContainer);
    }
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageContainer.parentNode) {
                messageContainer.remove();
            }
        }, 5000);
    }
}

// Claim dividends
async function claimDividends() {
    if (!web3 || !contract || !currentAccount) {
        showWalletError("Please connect your wallet to claim dividends.");
        return;
    }
    
    const claimButton = document.getElementById('claim-button');
    // Store the original button text before making any changes
    let originalButtonText = 'Claim Dividends';
    if (claimButton) {
        originalButtonText = claimButton.innerHTML;
    }
    
    try {
        // Show processing message
        showMessage('Processing your transaction...', 'info');
        
        // Disable claim button during transaction
        if (claimButton) {
            claimButton.disabled = true;
            claimButton.innerHTML = '<span class="spinner"></span> Processing...';
        }
        
        // Call the _claimDividend function
        const tx = await contract.methods._claimDividend().send({
            from: currentAccount,
            gasLimit: web3.utils.toHex(200000), // Adjust gas limit as needed
        });
        
        // Transaction successful
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <p>Transaction successful! Your dividends have been claimed.</p>
            <a href="${BSC_EXPLORER + tx.transactionHash}" target="_blank" class="tx-link">View transaction on BSCScan</a>
        `;
        
        showMessage(successMessage.innerHTML, 'success');
        
        // Update dividends amount
        setTimeout(() => {
            checkAvailableDividends(currentAccount);
        }, 3000);
        
    } catch (error) {
        console.error("Error claiming dividends:", error);
        
        // Check for user rejected transaction
        let errorMessage = 'Transaction failed: ';
        
        if (error.code === 4001 || 
            (error.message && (error.message.includes('User denied') || 
                              error.message.includes('User rejected')))) {
            errorMessage += 'You rejected the transaction';
        } else {
            errorMessage += (error.message || 'Unknown error');
        }
        
        // Show error message
        showMessage(errorMessage, 'error');
        
    } finally {
        // Re-enable claim button and restore original text
        if (claimButton) {
            claimButton.disabled = false;
            claimButton.innerHTML = originalButtonText;
        }
    }
}

// Disconnect wallet
function disconnectWallet() {
    try {
        // Reset wallet connection state
        currentAccount = null;
        walletProvider = null;
        connectedWalletType = null;
        
        // Clear local storage
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletType');
        
        // Update UI
        updateWalletUI();
        
        // Show success message
        showMessage('Wallet disconnected successfully', 'success');
        
        console.log('Wallet disconnected');
    } catch (error) {
        console.error('Error disconnecting wallet:', error);
        showMessage('Error disconnecting wallet', 'error');
    }
}

// Fetch total rewards data
async function fetchTotalRewardsData() {
    // Create a temporary web3 instance if none exists
    let tempWeb3 = web3 || new Web3(BSC_RPC_URL);
    let tempContract;
    
    try {
        // Create contract instance
        tempContract = contract || new tempWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        console.log("Fetching total distributed...");
        // Fetch total distributed
        const totalDistributed = await tempContract.methods.totalDistributed().call();
        console.log("Raw totalDistributed value:", totalDistributed);
        const totalDistributedInDoge = tempWeb3.utils.fromWei(totalDistributed, 'ether');
        console.log("Converted totalDistributed value:", totalDistributedInDoge);
        
        // Format the value with appropriate precision for small numbers
        let formattedDistributed;
        if (parseFloat(totalDistributedInDoge) < 0.001) {
            // For very small numbers, use fixed decimal places instead of scientific notation
            formattedDistributed = parseFloat(totalDistributedInDoge).toFixed(9);
        } else {
            formattedDistributed = parseFloat(totalDistributedInDoge).toLocaleString(undefined, {
                minimumFractionDigits: 8,
                maximumFractionDigits: 8
            });
        }
        document.getElementById('total-distributed').textContent = `${formattedDistributed} $DOGE`;
        
        console.log("Fetching total dividends...");
        // Fetch total dividends
        const totalDividends = await tempContract.methods.totalDividends().call();
        console.log("Raw totalDividends value:", totalDividends);
        const totalDividendsInDoge = tempWeb3.utils.fromWei(totalDividends, 'ether');
        console.log("Converted totalDividends value:", totalDividendsInDoge);
        
        // Format the value with appropriate precision for small numbers
        let formattedDividends;
        if (parseFloat(totalDividendsInDoge) < 0.001) {
            // For very small numbers, use fixed decimal places instead of scientific notation
            formattedDividends = parseFloat(totalDividendsInDoge).toFixed(9);
        } else {
            formattedDividends = parseFloat(totalDividendsInDoge).toLocaleString(undefined, {
                minimumFractionDigits: 8,
                maximumFractionDigits: 8
            });
        }
        document.getElementById('total-dividends').textContent = `${formattedDividends} $DOGE`;
        
    } catch (error) {
        console.error("Error fetching total rewards data:", error);
        console.log("Error details:", error.message);
        
        // Try with backup RPC URL
        try {
            console.log("Trying backup RPC URL...");
            tempWeb3 = new Web3(BSC_RPC_URL_BACKUP);
            tempContract = new tempWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            
            // Fetch total distributed
            const totalDistributed = await tempContract.methods.totalDistributed().call();
            const totalDistributedInDoge = tempWeb3.utils.fromWei(totalDistributed, 'ether');
            
            // Format the value with appropriate precision for small numbers
            let formattedDistributed;
            if (parseFloat(totalDistributedInDoge) < 0.001) {
                // For very small numbers, use fixed decimal places instead of scientific notation
                formattedDistributed = parseFloat(totalDistributedInDoge).toFixed(9);
            } else {
                formattedDistributed = parseFloat(totalDistributedInDoge).toLocaleString(undefined, {
                    minimumFractionDigits: 8,
                    maximumFractionDigits: 8
                });
            }
            document.getElementById('total-distributed').textContent = `${formattedDistributed} $DOGE`;
            
            // Fetch total dividends
            const totalDividends = await tempContract.methods.totalDividends().call();
            const totalDividendsInDoge = tempWeb3.utils.fromWei(totalDividends, 'ether');
            
            // Format the value with appropriate precision for small numbers
            let formattedDividends;
            if (parseFloat(totalDividendsInDoge) < 0.001) {
                // For very small numbers, use fixed decimal places instead of scientific notation
                formattedDividends = parseFloat(totalDividendsInDoge).toFixed(9);
            } else {
                formattedDividends = parseFloat(totalDividendsInDoge).toLocaleString(undefined, {
                    minimumFractionDigits: 8,
                    maximumFractionDigits: 8
                });
            }
            document.getElementById('total-dividends').textContent = `${formattedDividends} $DOGE`;
            
            console.log("Backup RPC successful");
        } catch (backupError) {
            console.error("Error with backup RPC:", backupError);
            document.getElementById('total-distributed').textContent = "Error loading";
            document.getElementById('total-dividends').textContent = "Error loading";
        }
    }
}

// Check rewards for a specific wallet
async function checkWalletRewards() {
    const walletToCheck = document.getElementById('wallet-to-check').value.trim();
    const walletRewardsResult = document.getElementById('wallet-rewards-result');
    const walletTotalRewards = document.getElementById('wallet-total-rewards');
    
    // Validate wallet address
    if (!walletToCheck || !Web3.utils.isAddress(walletToCheck)) {
        showMessage("Please enter a valid wallet address", "error");
        return;
    }
    
    // Create a temporary web3 instance if none exists
    let tempWeb3 = web3 || new Web3(BSC_RPC_URL);
    let tempContract;
    
    try {
        // Show loading state
        walletRewardsResult.style.display = 'block';
        walletTotalRewards.textContent = "Loading...";
        
        // Create contract instance
        tempContract = contract || new tempWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        console.log("Checking rewards for wallet:", walletToCheck);
        // Fetch total rewards distributed to the wallet
        const totalRewards = await tempContract.methods.totalRewardsDistributed(walletToCheck).call();
        console.log("Raw totalRewards value:", totalRewards);
        const totalRewardsInDoge = tempWeb3.utils.fromWei(totalRewards, 'ether');
        console.log("Converted totalRewards value:", totalRewardsInDoge);
        
        // Format the value with appropriate precision for small numbers
        let formattedRewards;
        if (parseFloat(totalRewardsInDoge) < 0.001) {
            // For very small numbers, use fixed decimal places instead of scientific notation
            formattedRewards = parseFloat(totalRewardsInDoge).toFixed(9);
        } else {
            formattedRewards = parseFloat(totalRewardsInDoge).toLocaleString(undefined, {
                minimumFractionDigits: 8,
                maximumFractionDigits: 8
            });
        }
        
        // Update UI
        walletTotalRewards.textContent = `${formattedRewards} $DOGE`;
        
    } catch (error) {
        console.error("Error checking wallet rewards:", error);
        console.log("Error details:", error.message);
        
        // Try with backup RPC URL
        try {
            console.log("Trying backup RPC URL for wallet check...");
            tempWeb3 = new Web3(BSC_RPC_URL_BACKUP);
            tempContract = new tempWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            
            // Fetch total rewards distributed to the wallet
            const totalRewards = await tempContract.methods.totalRewardsDistributed(walletToCheck).call();
            const totalRewardsInDoge = tempWeb3.utils.fromWei(totalRewards, 'ether');
            
            // Format the value with appropriate precision for small numbers
            let formattedRewards;
            if (parseFloat(totalRewardsInDoge) < 0.001) {
                // For very small numbers, use fixed decimal places instead of scientific notation
                formattedRewards = parseFloat(totalRewardsInDoge).toFixed(9);
            } else {
                formattedRewards = parseFloat(totalRewardsInDoge).toLocaleString(undefined, {
                    minimumFractionDigits: 8,
                    maximumFractionDigits: 8
                });
            }
            
            // Update UI
            walletTotalRewards.textContent = `${formattedRewards} $DOGE`;
            console.log("Backup RPC successful for wallet check");
        } catch (backupError) {
            console.error("Error with backup RPC for wallet check:", backupError);
            walletTotalRewards.textContent = "Error loading";
            showMessage(`Error checking rewards: ${error.message}`, "error");
        }
    }
}

// Check if contract is accessible
async function checkContractAccessibility() {
    try {
        // Create a temporary web3 instance
        const tempWeb3 = new Web3(BSC_RPC_URL);
        
        // Create a temporary contract instance
        const tempContract = new tempWeb3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        // Try to call a simple view function to check if the contract is accessible
        const symbol = await tempContract.methods.symbol().call();
        console.log("Contract is accessible. Symbol:", symbol);
        
        return true;
    } catch (error) {
        console.error("Primary RPC failed, trying backup:", error);
        
        try {
            // Try with backup RPC
            const tempWeb3Backup = new Web3(BSC_RPC_URL_BACKUP);
            
            // Create a temporary contract instance
            const tempContractBackup = new tempWeb3Backup.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            
            // Try to call a simple view function to check if the contract is accessible
            const symbol = await tempContractBackup.methods.symbol().call();
            console.log("Contract is accessible via backup RPC. Symbol:", symbol);
            
            return true;
        } catch (backupError) {
            console.error("Contract is not accessible via either RPC:", backupError);
            
            // Update UI to show error
            document.getElementById('total-distributed').textContent = "Error loading data";
            document.getElementById('total-dividends').textContent = "Error loading data";
            
            return false;
        }
    }
} 