// Aptos connection logic for vanilla JavaScript

const connectWalletBtn = document.getElementById('connect-wallet-btn');
const mintDiplomaBtn = document.getElementById('mint-diploma-btn');
const walletAddressDisplay = document.getElementById('wallet-address');
const messageDisplay = document.getElementById('message');
let walletAddress = null;

// Function to connect to Martian Wallet
connectWalletBtn.addEventListener('click', async () => {
    if (window.martian) {
        try {
            const response = await window.martian.connect();
            walletAddress = response.address;
            walletAddressDisplay.textContent = `Wallet connected: ${walletAddress}`;
            console.log('Wallet connected:', walletAddress);
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            messageDisplay.textContent = "Failed to connect wallet!";
        }
    } else {
        alert('Martian wallet is not installed.');
    }
});

// Function to mint an NFT diploma
mintDiplomaBtn.addEventListener('click', async () => {
    if (!walletAddress) {
        alert('Connect your wallet first!');
        return;
    }

    const graduateName = document.getElementById('graduate-name').value;
    const issueDate = document.getElementById('issue-date').value;

    if (!graduateName || !issueDate) {
        alert('Please fill out all fields.');
        return;
    }

    const transactionPayload = {
        type: "entry_function_payload",
        function: "0x<your_address>::NFTDiploma::mint_diploma",  // Update this with your contract address
        arguments: [graduateName, issueDate],
        type_arguments: [],
    };

    try {
        const txnRequest = await window.martian.generateTransaction(walletAddress, transactionPayload);
        const signedTxn = await window.martian.signTransaction(txnRequest);
        const txnHash = await window.martian.submitTransaction(signedTxn);
        console.log('Transaction hash:', txnHash);
        messageDisplay.textContent = `Diploma NFT minted successfully! Transaction hash: ${txnHash}`;
    } catch (error) {
        console.error('Minting failed:', error);
        messageDisplay.textContent = 'Minting failed!';
    }
});


// Script to connect to Martian Wallet

const connectWallet = async () => {
    if (window.martian) {
        try {
            const response = await window.martian.connect();
            console.log('Connected wallet:', response.address);
            return response.address;
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    } else {
        console.log('Martian Wallet is not installed.');
    }
};

// Call this function to connect the wallet
document.getElementById('connect-wallet-btn').addEventListener('click', async () => {
    const walletAddress = await connectWallet();
    document.getElementById('wallet-address').textContent = walletAddress;
});

