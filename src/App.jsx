import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  // ✅ Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("User rejected the connection:", err);
      }
    } else {
      alert("MetaMask not detected! Please install it from metamask.io");
    }
  };

  // ✅ Sign a message
  const signMessage = async () => {
    if (!walletAddress) {
      alert("Connect your wallet first!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const sig = await signer.signMessage(message);
      setSignature(sig);
    } catch (err) {
      console.error("Error signing message:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🔗 Connect MetaMask Wallet</h1>

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "8px",
            backgroundColor: "#f6851b",
            color: "white",
            border: "none",
          }}
        >
          Connect MetaMask
        </button>
      ) : (
        <div>
          <p><strong>Connected:</strong> {walletAddress}</p>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h3>✍️ Sign a Message</h3>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
        <br /><br />
        <button
          onClick={signMessage}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign Message
        </button>

        {signature && (
          <div style={{ marginTop: "20px" }}>
            <h4>🧾 Signature:</h4>
            <textarea
              readOnly
              value={signature}
              rows="4"
              cols="60"
              style={{ padding: "8px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
