import React from "react";
import bgImg from "./assets/assets/background/parallax-bg.gif";
import "./App.css";

const App = () => {
  return (
    <div>
      <div className="imgContainer">
        <img className="gif" src={bgImg} alt="background" />
      </div>
    </div>
  );
};

export default App;
