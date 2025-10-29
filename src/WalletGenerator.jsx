// src/WalletGenerator.jsx
import React, { useState } from "react";
import { Wallet } from "ethers";

export default function WalletGenerator() {
  const [wallet, setWallet] = useState(null);

  const create = () => {
    const w = Wallet.createRandom();
    setWallet({
      address: w.address,
      privateKey: w.privateKey,
      mnemonic: w.mnemonic?.phrase || null,
    });
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard");
    }).catch(() => {
      alert("Copy failed");
    });
  };

  return (
    <div style={{ maxWidth: 760, margin: 24, fontFamily: "Arial, sans-serif" }}>
      <h2>Generate Wallet</h2>
      <p style={{ color: "#666" }}>
        This generates an Ethereum-style wallet (address, private key, mnemonic). For learning only — do not use on mainnet.
      </p>

      <button
        onClick={create}
        style={{
          padding: "10px 16px",
          background: "#ff9800",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Generate Wallet
      </button>

      {wallet && (
        <div style={{ marginTop: 18, padding: 14, border: "1px solid #e3e3e3", borderRadius: 10 }}>
          <div style={{ marginBottom: 10 }}>
            <strong>Address:</strong>
            <div style={{ wordBreak: "break-all", marginTop: 6 }}>{wallet.address}</div>
            <button onClick={() => copy(wallet.address)} style={{ marginTop: 8 }}>Copy Address</button>
          </div>

          <div style={{ marginTop: 12 }}>
            <strong>Private Key:</strong>
            <div style={{ wordBreak: "break-all", marginTop: 6 }}>{wallet.privateKey}</div>
            <button onClick={() => copy(wallet.privateKey)} style={{ marginTop: 8 }}>Copy Private Key</button>
          </div>

          <div style={{ marginTop: 12 }}>
            <strong>Mnemonic:</strong>
            <div style={{ wordBreak: "break-all", marginTop: 6 }}>{wallet.mnemonic}</div>
            <button onClick={() => copy(wallet.mnemonic)} style={{ marginTop: 8 }}>Copy Mnemonic</button>
          </div>
        </div>
      )}
    </div>
  );
}
