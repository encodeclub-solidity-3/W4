import { ethers } from "ethers";
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/PuppyWorld.sol/PuppyWorld.json"
import tokenURI from "./tokenURI.json"

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

function setupProvider() {
  const infuraOptions = process.env.INFURA_API_KEY
    ? process.env.INFURA_API_SECRET
      ? {
        projectId: process.env.INFURA_API_KEY,
        projectSecret: process.env.INFURA_API_SECRET,
      }
      : process.env.INFURA_API_KEY
    : "";
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: infuraOptions,
  };
  const provider = ethers.providers.getDefaultProvider("goerli", options);
  return provider;
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  const provider = setupProvider();
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  console.log("Deploying NFTs");
  const nftContract = new ethers.Contract(
    "0xe34e72d49fe8e5991dc97537c05dbacdffd3adfb",
    tokenJson.abi,
    signer
  );


  for (let i = 0; i < 10; i++) {
    let tokenId = i + 1;
    console.log(`Minting token id: ${tokenId}`);
    let tokenURI = `http://localhost:3000/${i}`;
    console.log(`Current token metadata: ${tokenURI}`)

    let safeMintTx = await nftContract.safeMint(wallet.address, tokenId, tokenURI);
    await safeMintTx.wait();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Deployed contract in the recording: 0x1Af1CD6d6da31b1a8add5b5F48120410ddEAE4be
// Token Tracker: https://ropsten.etherscan.io/token/0x1Af1CD6d6da31b1a8add5b5F48120410ddEAE4be