import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState("I am Ankit");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("MetaMask not found! Please install it.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch balance
  const getBalance = async (address) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    setBalance(ethers.formatEther(balance));
  };

  // Sign message
  const signMessage = async () => {
    if (!account) return alert("Connect your wallet first!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(message);
    alert(`Signature: ${signature}`);
  };

  // Send ETH
  const sendETH = async () => {
    if (!account) return alert("Connect your wallet first!");
    if (!toAddress || !amount) return alert("Enter recipient and amount!");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount),
      });

      alert(`Transaction Sent! Hash: ${tx.hash}`);
      await tx.wait();
      alert("✅ Transaction confirmed!");
      getBalance(account); // refresh balance
    } catch (error) {
      console.error(error);
      alert("❌ Transaction failed!");
    }
  };

  useEffect(() => {
    if (account) getBalance(account);
  }, [account]);

  return (
    <div className="app">
      <h1>💳 MetaMask Wallet Dashboard</h1>

      {!account ? (
        <button onClick={connectWallet} className="connect-btn">
          Connect MetaMask
        </button>
      ) : (
        <div className="wallet-info">
          <p><strong>Address:</strong> {account}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
      )}

      <div className="message-box">
        <h3>🖊️ Sign a Message</h3>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={signMessage} className="sign-btn">
          Sign Message
        </button>
      </div>

      <div className="transaction-box">
        <h3>💸 Send ETH</h3>
        <input
          placeholder="Recipient Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendETH} className="send-btn">
          Send ETH
        </button>
      </div>
    </div>
  );
}

export default App;
