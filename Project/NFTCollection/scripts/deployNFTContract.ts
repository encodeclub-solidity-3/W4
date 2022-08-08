import { ethers } from "ethers";
import "dotenv/config";
import * as NFTContractJson from "../artifacts/contracts/PuppyWorld.sol/PuppyWorld.json";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

// TODO: Make script compatible with token gated voting

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("goerli");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  console.log("Deploying NFT Contract");

  const NFTContractFactory = new ethers.ContractFactory(
    NFTContractJson.abi,
    NFTContractJson.bytecode,
    signer
  );

  const nftContract = await NFTContractFactory.deploy();
  console.log("Awaiting confirmations");
  await nftContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${nftContract.address}`);

  // Puppy World deployed at contract:
  // 0xe34e72d49fe8e5991dc97537c05dbacdffd3adfb
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
