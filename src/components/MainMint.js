import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import roboPunksNFT from "../contract/RoboPunksNFT.json";

//the address of the deployed contract
const roboPunksNFTAddress = "0xc224dfb26fbB41f703d7dF4146aB99ffC776Fa15";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      //this provides a way for ethers to connect the blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //something that signs a transaction
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );
      try {
        //we need to use this BigNumber as Solidity needs us to use it bro
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("Mint response: ", response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };
  return (
    <div>
      <h1>RoboPunks</h1>
      <p>
        It's 2078. Can the RoboPunks NFT save humans from destructive rampant
        NFT speculation? Mint Robopunks to find out.
      </p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>- </button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+ </button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <p>Connect your wallet to mint</p>
      )}
    </div>
  );
};

export default MainMint;
