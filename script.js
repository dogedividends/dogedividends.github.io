// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", async function() {
    // Initialize all interactive elements
    initializeNavigation();
    initializeAnimations();
    initializeTokenStats();
    initializeMobileMenu();
    initializeParallax();
    initializeCountdown();
    initializeButtons();
    
    // Initialize Web3 and wallet connection
    await initializeWeb3();
    
    // Add event listeners for wallet connection
    const connectWalletBtn = document.getElementById('connectWallet');
    const claimRewardsBtn = document.getElementById('claimRewards');
    
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', async () => {
            try {
                await connectWallet();
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        });
    }
    
    if (claimRewardsBtn) {
        claimRewardsBtn.addEventListener('click', async () => {
            try {
                await claimRewards();
            } catch (error) {
                console.error('Error claiming rewards:', error);
            }
        });
    }

    // Update rewards info every 30 seconds if wallet is connected
    setInterval(() => {
        if (userAddress) {
            updateRewardsInfo();
        }
    }, 30000);
});

function copyAddress() {
    const address = '0xfdac5dd5d3397c81b6fb3b659d8607e1ffac7287';
    navigator.clipboard.writeText(address).then(() => {
        const notification = document.querySelector('.copy-notification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    });
}

// Navigation and Scroll Handling
function initializeNavigation() {
    const header = document.querySelector('header');
    if (!header) {
        console.warn('Header element not found. Navigation initialization aborted.');
        return;
    }
    
    let lastScroll = 0;
    let isScrolling = false;
    let isNavigating = false;

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                isNavigating = true;
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');

                // Calculate offset for header height
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Reset navigation state after animation
                setTimeout(() => {
                    isNavigating = false;
                }, 1000);

                // Close mobile menu if open
                const nav = document.querySelector('nav');
                const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
                if (nav && window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    if (mobileMenuButton) {
                        mobileMenuButton.classList.remove('active');
                    }
                }
            }
        });
    });

    // Scroll handling
    window.addEventListener('scroll', () => {
        if (!header || !isScrolling && !isNavigating) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    header.classList.remove('scroll-up');
                    header.classList.remove('scroll-down');
                } else if (currentScroll > lastScroll && currentScroll > 100) {
                    if (!header.classList.contains('scroll-down')) {
                        header.classList.remove('scroll-up');
                        header.classList.add('scroll-down');
                    }
                } else if (currentScroll < lastScroll) {
                    if (header.classList.contains('scroll-down')) {
                        header.classList.remove('scroll-down');
                        header.classList.add('scroll-up');
                    }
                }
                
                lastScroll = currentScroll;
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Reset header visibility when reaching top or bottom of page
    window.addEventListener('scrollend', () => {
        if (!header) return;
        
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('scroll-down');
            header.classList.remove('scroll-up');
        } else if ((window.innerHeight + currentScroll) >= document.documentElement.scrollHeight) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
    });
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature, .timeline-item, .step, .social-link, .about-item').forEach((el) => {
        observer.observe(el);
    });
}

// Token Statistics
function initializeTokenStats() {
    function updateTokenStats() {
        const mockPrice = (Math.random() * 0.001).toFixed(6);
        const mockHolders = Math.floor(Math.random() * 5000) + 15000;
        const mockMarketCap = (mockPrice * 1000000000).toFixed(2);
        const mockBurned = Math.floor(Math.random() * 1000000) + 5000000;

        // Animate number changes
        animateValue('price', mockPrice, '$');
        animateValue('holders', mockHolders);
        animateValue('marketcap', (mockMarketCap/1000000).toFixed(2), '$', 'M');
        animateValue('burned-tokens', mockBurned);
    }

    function animateValue(elementId, value, prefix = '', suffix = '') {
        const element = document.getElementById(elementId);
        const start = parseFloat(element.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        const end = parseFloat(value);
        const duration = 1000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = start + (end - start) * progress;
            element.textContent = `${prefix}${Number(current).toLocaleString('en-US', {
                minimumFractionDigits: String(value).split('.')[1]?.length || 0,
                maximumFractionDigits: String(value).split('.')[1]?.length || 0
            })}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Update stats initially and every 5 seconds
    updateTokenStats();
    setInterval(updateTokenStats, 5000);
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-toggle');
    mobileMenuButton.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('header').appendChild(mobileMenuButton);

    const nav = document.querySelector('nav');
    
    // Toggle menu on button click
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuButton.classList.remove('active');
            }
        }
    });

    // Prevent menu from closing when clicking inside nav
    nav.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
            e.stopPropagation();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
}

// Parallax Effect
function initializeParallax() {
    const hero = document.querySelector('#hero');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scroll = window.pageYOffset;
                hero.style.backgroundPositionY = `${scroll * 0.5}px`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Countdown Timer
function initializeCountdown() {
    function updateCountdown() {
        const nextPhaseDate = new Date('2024-12-31T23:59:59').getTime();
        const now = new Date().getTime();
        const distance = nextPhaseDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElement = document.querySelector('.timeline-item:not(.active)');
        if (countdownElement) {
            countdownElement.setAttribute('data-countdown', `${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Button Interactions
function initializeButtons() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#buy') return; // Allow smooth scroll for internal links
            
            e.preventDefault();
            this.classList.add('loading');
            
            // Simulate loading state
            setTimeout(() => {
                this.classList.remove('loading');
                if (this.getAttribute('href')) {
                    window.location.href = this.getAttribute('href');
                }
            }, 1500);
        });
    });

    // Add hover effect for all interactive elements
    const interactiveElements = document.querySelectorAll('.feature, .about-item, .social-link, .cta-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Web3 Integration
const CONTRACT_ADDRESS = '0xfdac5dd5d3397c81b6fb3b659d8607e1ffac7287';
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_claimDividend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"circulatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"distributorGas","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"shareholder","type":"address"}],"name":"getUnpaidEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDividendExempt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isFeeExempt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"rescueERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minPeriod","type":"uint256"},{"internalType":"uint256","name":"_minDistribution","type":"uint256"},{"internalType":"uint256","name":"_distributorGas","type":"uint256"}],"name":"setDistributionCriteria","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_buy","type":"uint256"},{"internalType":"uint256","name":"_trans","type":"uint256"},{"internalType":"uint256","name":"_wallet","type":"uint256"}],"name":"setParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_liquidity","type":"uint256"},{"internalType":"uint256","name":"_marketing","type":"uint256"},{"internalType":"uint256","name":"_burn","type":"uint256"},{"internalType":"uint256","name":"_rewards","type":"uint256"},{"internalType":"uint256","name":"_development","type":"uint256"},{"internalType":"uint256","name":"_total","type":"uint256"},{"internalType":"uint256","name":"_sell","type":"uint256"},{"internalType":"uint256","name":"_trans","type":"uint256"}],"name":"setStructure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setisBot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"bool","name":"exempt","type":"bool"}],"name":"setisDividendExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setisExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"shares","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"totalExcluded","type":"uint256"},{"internalType":"uint256","name":"totalRealised","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_wallet","type":"address"}],"name":"totalRewardsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"adr","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

let web3;
let contract;
let userAddress;

async function initializeWeb3() {
    console.log('Initializing Web3...');
    if (typeof window.ethereum !== 'undefined') {
        try {
            console.log('MetaMask is installed!');
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            
            // Check if already connected
            const accounts = await web3.eth.getAccounts();
            console.log('Current accounts:', accounts);
            
            if (accounts.length > 0) {
                userAddress = accounts[0];
                updateConnectButton();
                updateRewardsInfo();
                document.getElementById('claimRewards').disabled = false;
            }

            // Listen for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
            
            console.log('Web3 initialization complete!');
        } catch (error) {
            console.error('Error initializing Web3:', error);
        }
    } else {
        console.log('Please install MetaMask!');
        const connectButton = document.getElementById('connectWallet');
        if (connectButton) {
            connectButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Install MetaMask</span>';
            connectButton.addEventListener('click', () => {
                window.open('https://metamask.io', '_blank');
            });
        }
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length > 0) {
        userAddress = accounts[0];
        updateConnectButton();
        updateRewardsInfo();
        document.getElementById('claimRewards').disabled = false;
    } else {
        userAddress = null;
        updateConnectButton();
        document.getElementById('claimRewards').disabled = true;
        document.getElementById('totalDistributed').textContent = 'Connect Wallet';
        document.getElementById('claimableRewards').textContent = 'Connect Wallet';
        document.getElementById('totalEarned').textContent = 'Connect Wallet';
    }
}

async function connectWallet() {
    console.log('Attempting to connect wallet...');
    if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask not found, redirecting to install page');
        window.open('https://metamask.io', '_blank');
        return;
    }

    try {
        console.log('Requesting account access...');
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        console.log('Accounts received:', accounts);
        
        // Check if we're on the correct network (BSC)
        const chainId = await window.ethereum.request({ 
            method: 'eth_chainId' 
        });
        
        console.log('Current chainId:', chainId);
        
        if (chainId !== '0x38') { // BSC Mainnet
            try {
                console.log('Switching to BSC network...');
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }],
                });
            } catch (switchError) {
                // If BSC network is not added, add it
                if (switchError.code === 4902) {
                    try {
                        console.log('Adding BSC network...');
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x38',
                                chainName: 'Binance Smart Chain',
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'BNB',
                                    decimals: 18
                                },
                                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                blockExplorerUrls: ['https://bscscan.com/']
                            }]
                        });
                    } catch (addError) {
                        console.error('Error adding BSC network:', addError);
                    }
                }
            }
        }

        userAddress = accounts[0];
        console.log('Wallet connected:', userAddress);
        updateConnectButton();
        updateRewardsInfo();
        document.getElementById('claimRewards').disabled = false;
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

function updateConnectButton() {
    const connectButton = document.getElementById('connectWallet');
    if (userAddress) {
        connectButton.innerHTML = `<i class="fas fa-wallet"></i><span>${userAddress.substring(0, 6)}...${userAddress.substring(38)}</span>`;
    } else {
        connectButton.innerHTML = '<i class="fas fa-wallet"></i><span>Connect Wallet</span>';
    }
}

async function updateRewardsInfo() {
    if (!userAddress) return;

    try {
        // Get total DOGE distributed
        const totalDistributed = await contract.methods.totalDistributed().call();
        document.getElementById('totalDistributed').textContent = formatDoge(totalDistributed);

        // Get claimable rewards
        const claimable = await contract.methods.getUnpaidEarnings(userAddress).call();
        document.getElementById('claimableRewards').textContent = formatDoge(claimable);

        // Get total earned
        const totalEarned = await contract.methods.totalRewardsDistributed(userAddress).call();
        document.getElementById('totalEarned').textContent = formatDoge(totalEarned);
    } catch (error) {
        console.error('Error updating rewards info:', error);
    }
}

function formatDoge(amount) {
    return (amount / 1e18).toFixed(2) + ' DOGE';
}

async function claimRewards() {
    if (!userAddress) return;

    try {
        await contract.methods._claimDividend().send({ from: userAddress });
        updateRewardsInfo();
    } catch (error) {
        console.error('Error claiming rewards:', error);
    }
}
