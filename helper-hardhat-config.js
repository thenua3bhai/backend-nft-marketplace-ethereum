const { ethers } = require("hardhat");

const networkConfig = {
  default: {
    name: "hardhat",
  },
  31337: {
    name: "localhost",
  },
  5: {
    name: "goerli",
  },
  11155111: {
    name: "sepolia",
  },
  80001: { name: "mumbai", cryptoBeetlesAddress: "0x219a9df6998f56Ec781C0cFfd4058266e5AA967E" },

  1: {
    name: "mainnet",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6; //so that surely verified on etherscan until we will wait,

const frontEndContractsFile = "../frontend-nextjs-graph-marketplace/constants/networkMapping.json";

const frontEndAbiLocation = "../frontend-nextjs-graph-marketplace/constants/";

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  frontEndContractsFile,
  frontEndAbiLocation,
};
