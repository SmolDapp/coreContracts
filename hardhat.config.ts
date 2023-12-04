import {config as dotEnvConfig} from "dotenv";
import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-vyper";

dotEnvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  vyper: {
    version: "0.3.10",
  },
  networks: {
    optimism: {
      accounts: [process.env.PRIVATE_KEY as string],
      hardfork: 'paris'
    },
    polygon: {
      accounts: [process.env.PRIVATE_KEY as string]
    },
    zkevm: {
      accounts: [process.env.PRIVATE_KEY as string]
    }
  }
};

export default config;
