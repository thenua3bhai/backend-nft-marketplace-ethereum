const { network, ethers } = require("hardhat");
const { networkConfig, developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config");
require("dotenv").config();
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const waitBlockConfirmations = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;
  //so that surely verified on etherscan until we will wait

  log("----------------------------------------------------");
  const arguments = []; //args not needed since no constructor is in contract
  const nftMarketplace = await deploy("NftMarketplace", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  // Verify the deployment

  if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
    log("Real Testnet/Mainnet detected Verifying...");
    await verify(nftMarketplace.address, arguments);
    log("Contract Verified");
  }

  const networkName = network.name == "hardhat" ? "localhost" : network.name;
  log(network.name);
  log(`Contract deployed to Network :${networkName} and Address: ${nftMarketplace.address}`);
  log("----------------------------------------------------");
};

module.exports.tags = ["all", "marketplace"];
