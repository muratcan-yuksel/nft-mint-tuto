import React, { useState } from "react";
// import bgImg from "./assets/assets/background/parallax-bg.gif";
import "./App.css";
import MainMint from "./components/MainMint";
import NavBar from "./components/NavBar";

const App = () => {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="overlay">
      <div className="App">
        <div className="App">
          <NavBar accounts={accounts} setAccounts={setAccounts} />
          <MainMint accounts={accounts} setAccounts={setAccounts} />
        </div>
        <div className="moving-background"> </div>
      </div>
    </div>
  );
};

export default App;
