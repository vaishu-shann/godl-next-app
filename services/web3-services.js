import Web3 from "web3";
// const Web3 = require('web3')
import config from "../config";

export const createWeb3Object = async () => {
  try {
    const provider = new Web3.providers.HttpProvider(config.rpcUrl);
    const web3Obj = new Web3(provider);
    // let contract =new web3Obj.eth.Contract("","")
    return web3Obj;
  } catch (error) {
    console.log("Error while creating web3 Object", error);
    return;
  }
};

export const getTokenBalance = async (
  web3Obj,
  contractABI,
  contractAddress,
  walletAddress
) => {
  try {
    if (typeof window.ethereum !== "undefined") {

      window.ethereum.enable();

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      let result = await contract.methods.balanceOf(walletAddress).call();

      console.log("getBalance", result);

      return result;
    }
  } catch (error) {
    console.log("Error in web3-utils | getTokenBalance", error);
    return;
  }
};

export const createContractObject = async function (
  web3Obj,
  contractABI,
  contractAddress
) {
  try {
    if (web3Obj) {
      const contractObj = new web3Obj.eth.Contract(
        contractABI,
        contractAddress
      );
      return contractObj;
    }
  } catch (error) {
    console.log("Error in web3-utils | createContractObject", error);
    return;
  }
};

export const convertEthToWei = async function (valueInEth) {
  try {
    let valueInWei = [];
    for (let i = 0; i < valueInEth.length; i++) {
      valueInWei.push(Web3.utils.toWei(valueInEth[i]));
    }
    return valueInWei;
  } catch (error) {
    console.log("Error in web3-utils | convertEthToWei", error);
    return;
  }
};

export const convertWeiToEth = async function (valueInWei) {
  try {
    let valueInEth = [];

    for (let i = 0; i < valueInWei.length; i++) {
      valueInEth.push(Web3.utils.fromWei(valueInWei[i], "ether"));
    }
    // console.log("valueInEth", valueInEth);

    return valueInEth;
  } catch (error) {
    console.log("Error in web3-utils | convertWeiToEth", error);
    return;
  }
};
export const convertGweiToWei = async function (valueInGwei) {
  try {
    let valueInWei = [];
    for (let i = 0; i < valueInGwei.length; i++) {
      valueInWei.push(Web3.utils.toWei(valueInGwei[i], "gwei"));
    }
    return valueInWei;
  } catch (error) {
    console.log("Error in web3-utils | convertGweiToWei", error);
    return;
  }
};

export const convertToChecksum = async function (address) {
  try {
    return Web3.utils.toChecksumAddress(address);
  } catch (error) {
    console.log("Error in web3-utils | convertToChecksum", error);
    return;
  }
};

export const getConnectedWalletAddress = async (web3Obj, walletType) => {
  try {
    if (walletType === "metamask") {
      return web3Obj.currentProvider.selectedAddress;
    } else if (walletType === "trustwallet") {
      let res = web3Obj.currentProvider.accounts[0];

      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in web3 services | getConnectedWalletAddress ", error);
    return;
  }
};

export const setApproval = async function (
  web3Obj,
  paxgAbi,
  contractAddress,
  paramObj,
  walletAddress
) {
  try {
    if (web3Obj) {
      const contractObj = await createContractObject(
        web3Obj,
        paxgAbi,
        contractAddress
      );

      const existingAllowance = await contractObj.methods
        .allowance(walletAddress, paramObj.approvalAddress)
        .call();

      let allowanceInString = existingAllowance.toString();

      const existingAllowanceAsBn = await Web3.utils.BN(allowanceInString);

      if (
        existingAllowanceAsBn.sub(Web3.utils.BN(paramObj.approvalAmount)) >= 0
      ) {
        return false;
      } else {
        const txReceipt = await contractObj.methods
          .approve(paramObj.approvalAddress, paramObj.approvalAmount)
          .send({ from: walletAddress });

        return txReceipt;
      }
    }
  } catch (error) {
    console.log("Error in paxg-contract-utils | setApproval", error);
    return;
  }
};
