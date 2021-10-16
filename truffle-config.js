const path = require("path");
const process = require('process');
require('dotenv').config({ path: '/Users/zlederman/Documents/Code/js/truffle-react/.env' })
const HDWalletProvider = require("@truffle/hdwallet-provider")
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    kovan: {
      provider: () => {
          return new HDWalletProvider(process.env.MNEMONIC_REAL, process.env.RPC_URL);
      },

      network_id: '*'
    }
  }
  ,
  compilers :{
    solc: {
      version: "^0.8",
    }
  }
};
