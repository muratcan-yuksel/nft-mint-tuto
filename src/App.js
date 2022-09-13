import React, { useState } from "react";
import bgImg from "./assets/assets/background/parallax-bg.gif";
import MainMint from "./components/MainMint";
import NavBar from "./components/NavBar";
import "./App.css";

const App = () => {
  const [accounts, setAccounts] = useState([]);
  return (
    <div>
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
};

export default App;
