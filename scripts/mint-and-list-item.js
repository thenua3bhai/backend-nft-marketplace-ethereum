const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");
const cryptoBeetlesAbi = require("../../frontend-nextjs-graph-marketplace/constants/CryptoBeetles.json");
const marketplaceAddresses = require("../../frontend-nextjs-graph-marketplace/constants/networkMapping.json");
const marketplaceAbi = require("../../frontend-nextjs-graph-marketplace/constants/NftMarketplace.json");
const { networkConfig } = require("../helper-hardhat-config");

const PRICE = ethers.utils.parseEther("0.5");

async function mintAndList() {
  const chainId = network.config.chainId;
  const tokenId = [0, 1, 2, 3];

  const accounts = await ethers.getSigners();

  const marketplaceAddress = marketplaceAddresses[chainId]["NftMarketplace"][0];
  console.log(marketplaceAddress, typeof chainId, chainId);

  const nftMarketplace = await ethers.getContractAt(marketplaceAbi, marketplaceAddress);

  const cryptoBeetles = await ethers.getContractAt(cryptoBeetlesAbi, networkConfig[chainId]["cryptoBeetlesAddress"]);

  //
  //
  //Approving nft
  //
  //
  // console.log("Approving NFT...for Address", nftMarketplace.address);
  // const approvalTx = await cryptoBeetles.approve(nftMarketplace.address, tokenId[3]);
  // await approvalTx.wait(1);
  // console.log("Nft approved with token id:", tokenId[3]);

  //
  //
  //Listing nft
  //
  //

  // console.log("Listing NFT...");
  // const tx1 = await nftMarketplace.listItem(cryptoBeetles.address, tokenId[3], PRICE);

  // await tx1.wait(1);

  // console.log("NFT Listed!");
  //

  //Cancel listing
  //

  console.log("Cancel Listing ");
  const tx2 = await nftMarketplace.cancelListing(cryptoBeetles.address, tokenId[3]);
  console.log("Nft cancelled tokenid", tokenId[3]);

  if (network.config.chainId == 31337) {
    // Moralis has a hard time if you move more than 1 at once!

    await moveBlocks(1, (sleepAmount = 1000));
  }
}

mintAndList()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
