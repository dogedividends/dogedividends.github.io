# DogeD Token - BSC Dividend Claiming

This repository contains the website for DogeD Token, a BSC token that rewards holders with $DOGE dividends.

## Wallet Connection Feature

The website now includes a seamless wallet connection experience that enables users to:

1. Connect to Binance Smart Chain (BSC) via MetaMask
2. View their available $DOGE dividends
3. Claim dividends by calling the `_claimDividend` function on the smart contract

### Requirements for Users

- **MetaMask**: The recommended wallet for BSC interactions. [Download MetaMask](https://metamask.io/download.html)

### Smart Contract

The DogeD token contract is deployed at: `0xfdac5dd5d3397c81b6fb3b659d8607e1ffac7287`

### User Flow

1. User visits the "Claim Dividends" section on the website
2. User clicks on "Connect MetaMask" button
3. If the wallet is not installed, the site prompts the user to install it
4. Once connected, the site automatically:
   - Switches to BSC network (or prompts to add it if not configured)
   - Displays the connected wallet address
   - Shows available dividends for claiming
5. User can claim dividends by clicking the "Claim Dividends" button

### Technical Implementation

The wallet connection feature uses:

- Web3.js for blockchain interactions
- MetaMask's Ethereum Provider API
- ABI interface for the dividend contract
- Enhanced formatting for small reward values (displays up to 9 decimal places for very small numbers)
- Backup RPC support for improved reliability

### Development

To modify the wallet connection functionality:

1. Edit `wallet.js` to update wallet connection logic
2. Modify the UI in `index.html` under the "claim-dividends" section
3. Adjust styles in `styles.css` under "Wallet Connection & Dividend Claim Styles"

## License

All rights reserved © 2024 Doge Dividends 