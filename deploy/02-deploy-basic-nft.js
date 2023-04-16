const { network } = require("hardhat");
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config");
//const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const waitBlockConfirmations = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;
  const chainId = network.config.chainId;

  log("----------------------------------------------------");
  if (chainId == 31337) {
    log("Local network detected! Deploying mocks...");
    const args = [];
    const basicNft = await deploy("BasicNft", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: waitBlockConfirmations,
    });

    const basicNftTwo = await deploy("BasicNftTwo", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: waitBlockConfirmations,
    });

    // Verify the deployment
    //   if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    //   ) {
    //     log("Verifying...");
    //     await verify(basicNft.address, args);
    //     await verify(basicNftTwo.address, args);
    //   }
    log("Basic NFT deployed to ", basicNft.address);
    log("Basic NFT Two deployed to ", basicNftTwo.address);
    log("----------------------------------------------------");
  }
};

module.exports.tags = ["all", "basicnft"];
