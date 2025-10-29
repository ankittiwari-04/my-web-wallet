import React from "react";
import WalletGenerator from "./WalletGenerator";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 50,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <WalletGenerator />
    </div>
  );
}

export default App;
