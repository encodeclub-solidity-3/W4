import tokenURI from "./tokenURI.json"

const tokenURIStringify = JSON.stringify(tokenURI);
const parsedTokenURI = JSON.parse(tokenURIStringify);

// console.log(parsedTokenURI);

// for (let i = 1; i < 11; i++) {
//   let currentTokenId = i;
//   console.log(`Minting token id: ${currentTokenId}`);

//   let currentTokenURI = parsedTokenURI[`${i}`];
//   console.log(currentTokenURI)

//   // let safeMintTx = await nftContract.safeMint(wallet.address, i, tokenURI[i])
// }

import axios from "axios";
const port = process.env.PORT || 3000;
axios.get(`https://ipfs.io/ipfs/QmTnWg7raSZBCepCzmUUKA54Xx3UWw2cKY8pG4Bf9mj2nr`)
  .then( (res) => {
    let currentTokenData = res.data;
    let imageData = currentTokenData.ipfs;
    let currentTokenMetadata = currentTokenData.metadata;
    console.log(res.data[0])
  })