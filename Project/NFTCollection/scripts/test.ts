import tokenURI from "./tokenURI.json"

const tokenURIStringify = JSON.stringify(tokenURI);
const parsedTokenURI = JSON.parse(tokenURIStringify);

// console.log(parsedTokenURI);

for (let i = 1; i < 11; i++) {
  let currentTokenId = i;
  console.log(`Minting token id: ${currentTokenId}`);

  let currentTokenURI = parsedTokenURI[`${i}`];
  console.log(currentTokenURI)

  // let safeMintTx = await nftContract.safeMint(wallet.address, i, tokenURI[i])
}