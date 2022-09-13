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
        const response = await contract.mint(mintAmount);
        console.log("Mint response: ", response);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return <div>MainMint</div>;
};

export default MainMint;
