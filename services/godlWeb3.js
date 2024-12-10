import {
  createContractObject,
  getConnectedWalletAddress,
} from "./web3-services";
import godlABI from "../contracts-abi/godlNetwork.json";
import auriumABI from "../contracts-abi/auriumToken.json";
import paxgABI from "../contracts-abi/paxg.json";
import config from "../config";
const contractAddress = config.godlNetworkAddress;

export const existingUserStatus = async (address, web3Obj) => {
  try {
    console.log("___", web3Obj)

    if (web3Obj) {

      const godlNetworkContract = await createContractObject(
        web3Obj,
        godlABI,
        contractAddress
      );
      const args = {
        method: 'isExistingUser',
      };

      const res = await godlNetworkContract?.methods[args.method](address)?.call();
      return res;
    }
  } catch (error) {
    console.log("Error in godlWeb3 | existingUserStatus", error);
    return;
  }
};

export const getTotalUsers = async (web3Obj) => {
  try {
    if (web3Obj) {
      const godlNetworkContract = await createContractObject(
        web3Obj,
        godlABI,
        contractAddress
      );
      const res = await godlNetworkContract.methods.getTotalUsers().call();
      return res;
    }
  } catch (error) {
    console.log("Error in godlWeb3 | getTotalUsers", error);
    return;
  }
};
export const getAdmin = async (web3Obj) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const res = await godlNetworkContract?.methods?.owner()?.call();
    return res;
  } catch (error) {
    console.log("Error in godlWeb3 | getAdmin", error);
    return;
  }
};

export const joinGodl = async (
  referrerAddress,
  level,
  web3Obj,
  fromAddress
) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const txReceipt = await godlNetworkContract.methods
      .join(referrerAddress, level)
      .send({ from: fromAddress });
    return txReceipt;
  } catch (error) {
    console.log("Error in godlWeb3 | joinGodl", error);
    return;
  }
};

export const joinGodlEstimateGas = async (
  referrerAddress,
  level,
  web3Obj,
  fromAddress
) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const result = await godlNetworkContract.methods
      .join(referrerAddress, level)
      .estimateGas({ gas: 3000000, from: fromAddress });
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | joinGodlEstimateGas", error);
    return;
  }
};

export const addUserInTopline = async (addressArray, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const txReceipt = await godlNetworkContract.methods
      .addUserInTopline(addressArray)
      .send({ from: fromAddress });

    return txReceipt;
  } catch (error) {
    console.log("Error in godlWeb3 | addUserInTopline", error);
    return;
  }
};
export const checkIfUserIsInTopline = async (address, web3Obj) => {
  try {
    if (web3Obj) {
      const godlNetworkContract = await createContractObject(
        web3Obj,
        godlABI,
        contractAddress
      );
      const result = await godlNetworkContract.methods
        .checkIfUserIsInTopline(address)
        .call();
      return result;
    }
  } catch (error) {
    console.log("Error in godlWeb3 | checkIfUserIsInTopline", error);
    return;
  }
};
export const getRewardTierCost = async (
  currentlevel,
  levelToPurchase,
  web3Obj
) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );
    const result = await godlNetworkContract.methods
      .getRewardTierCost(currentlevel, levelToPurchase)
      .call();
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | getRewardTierCost", error);
    return;
  }
};
export const getAllRewardTierCosts = async (web3Obj) => {
  try {
    if (web3Obj) {
      const godlNetworkContract = await createContractObject(
        web3Obj,
        godlABI,
        contractAddress
      );
      const result = await godlNetworkContract.methods
        .getAllRewardTierCosts()
        .call();
      return result;
    }
  } catch (error) {
    console.log("Error in godlWeb3 | getAllRewardTierCosts", error);
    return;
  }
};

export const transferOwnership = async (address, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const txReceipt = await godlNetworkContract.methods
      .transferOwnership(address)
      .send({ from: fromAddress });
    return txReceipt;
  } catch (error) {
    console.log("Error in godlWeb3 | transferOwnership", error);
    return;
  }
};
export const setFeeReceiver = async (address, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const txReceipt = await godlNetworkContract.methods
      .setFeeReceiver(address)
      .send({ from: fromAddress });
    return txReceipt;
  } catch (error) {
    console.log("Error in godlWeb3 | transferOwnership", error);
    return;
  }
};

export const getUser = async (address, web3Obj) => {
  try {
    if (web3Obj) {
      const godlNetworkContract = await createContractObject(
        web3Obj,
        godlABI,
        contractAddress
      );
      const result = await godlNetworkContract.methods.getUser(address).call();
      return result;
    }
  } catch (error) {
    console.log("Error in godlWeb3 | getUser", error);
    return;
  }
};
export const getTotalRewardsGenerated = async (web3Obj) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const result = await godlNetworkContract.methods
      .getTotalRewardsGenerated()
      .call();

    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | getUser", error);
    return;
  }
};
export const getTotalRewardsReinvested = async (web3Obj) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );
    const result = await godlNetworkContract.methods
      .getTotalRewardsReinvested()
      .call();
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | getUser", error);
    return;
  }
};

export const getUserReferrals = async (address, web3Obj) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );
    const result = await godlNetworkContract.methods
      .getUserReferrals(address)
      .call();
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | getUserReferrals", error);
    return false;
  }
};
export const buyLevelFor = async (address, level, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const result = await godlNetworkContract.methods
      .buyLevelFor(address, level)
      .send({ from: fromAddress });
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | buyLevelFor", error);
    return;
  }
};
export const buyLevelForEstimatedGas = async (
  address,
  level,
  web3Obj,
  fromAddress
) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const result = await godlNetworkContract.methods
      .buyLevelFor(address, level)
      .estimateGas({ gas: 3000000, from: fromAddress });
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | buyLevelFor", error);
    return;
  }
};

export const setAutoPurchase = async (flag, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const result = await godlNetworkContract.methods
      .setAutoPurchase(flag)
      .send({ from: fromAddress });
    return result;


  } catch (error) {
    console.log("Error in godlWeb3 | setAutoPurchase", error);
    return;
  }
};

export const mintGodl = async (amount, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      auriumABI,
      config.godlToken
    );

    const result = await godlNetworkContract.methods
      .mint(amount)
      .send({ from: fromAddress });
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | mintGodl", error);
    return;
  }
};

export const mintGodlEstimatedGas = async (amount, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      auriumABI,
      config.godlToken
    );

    const result = await godlNetworkContract.methods
      .mint(amount)
      .estimateGas({ gas: 3000000, from: fromAddress });
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | mintGodlEstimatedGas", error);
    return;
  }
};

export const mintPAXG = async (amount, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      paxgABI,
      config.paxgTokenAddress
    );

    const result = await godlNetworkContract.methods
      .increaseSupply(amount)
      .send({ from: fromAddress });
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | mintGodl", error.code);
    return;
  }
};

export const getHTokenDetails = async function (web3Obj) {
  try {
    if (web3Obj) {


      const hTokenContract = await createContractObject(
        web3Obj,
        auriumABI,
        config.godlToken
      );

      const name = await hTokenContract.methods?.name()?.call();
      const symbol = await hTokenContract.methods?.symbol()?.call();
      const value = await hTokenContract.methods?.value_()?.call();
      const hTokenDetails = {
        name,
        symbol,
        value,
      };
      return hTokenDetails;
    }
  } catch (error) {
    console.log("Error in hToken-contract-utils | getHTokenDetails", error);
    return;
  }
};
export const getHTokenMintAmount = async function (web3Obj, paramObj) {
  try {
    const hTokenContract = await createContractObject(
      web3Obj,
      auriumABI,
      config.godlToken
    );

    const hTokenMintAmount = await hTokenContract.methods
      .getAuriumTokenAmountsOut(paramObj.paxgAmount)
      .call();
    return hTokenMintAmount;
  } catch (error) {
    console.log("Error in hToken-contract-utils | getHTokenMintAmount", error);
    return;
  }
};

export const burnHToken = async function (web3Obj, paramObj, fromAddress) {
  try {
    const hTokenContract = await createContractObject(
      web3Obj,
      auriumABI,
      config.godlToken
    );

    const txReceipt = await hTokenContract.methods
      .burn(paramObj.approvalAmount)
      .send({ from: fromAddress });
    return txReceipt;
  } catch (error) {
    console.log("Errpr in hToken-contract-utils | burnHToken", error);
    return;
  }
};
export const burnHTokenEstimatedGas = async function (
  web3Obj,
  paramObj,
  fromAddress
) {
  try {
    const hTokenContract = await createContractObject(
      web3Obj,
      auriumABI,
      config.godlToken
    );

    const txReceipt = await hTokenContract.methods
      .burn(paramObj.approvalAmount)
      .estimateGas({ gas: 3000000, from: fromAddress });
    return txReceipt;
  } catch (error) {
    console.log("Errpr in hToken-contract-utils | burnHToken", error);
    return;
  }
};

export const getPaxgGetAmount = async function (web3Obj, paramObj) {
  try {
    const hTokenContract = await createContractObject(
      web3Obj,
      auriumABI,
      config.godlToken
    );
    const paxgAmountsOut = await hTokenContract.methods
      .getPaxgAmountsOut(paramObj.godlToSell)
      .call();
    return paxgAmountsOut;
  } catch (error) {
    console.log("Errpr in hToken-contract-utils | getPaxgGetAmount", error);
    return;
  }
};

export const getToplineCount = async (web3Obj) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const res = await godlNetworkContract.methods.getToplineCount().call();

    return res;
  } catch (error) {
    console.log("Error in godlWeb3 | getToplineCount", error);
    return;
  }
};
// updateWalletAddress
export const updateWalletAddress = async (newAddress, web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      config.godlNetworkAddress
    );

    const result = await godlNetworkContract.methods
      .updateWalletAddress(newAddress)
      .send({ from: fromAddress });
    return result;
  } catch (error) {
    console.log("Error in godlWeb3 | updateWalletAddress", error);
    return;
  }
};

export const paused = async (web3Obj) => {
  try {
    if (web3Obj) {
      const godlNetworkContract = await createContractObject(
        web3Obj,
        godlABI,
        contractAddress
      );
      const res = await godlNetworkContract.methods.paused().call();
      return res;
    }
  } catch (error) {
    console.log("Error in godlWeb3 | paused", error);
    return;
  }
};

export const pause = async (web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const res = await godlNetworkContract.methods
      .pause()
      .send({ from: fromAddress });
    return res;
  } catch (error) {
    console.log("Error in godlWeb3 | pause", error);
    return;
  }
};
export const unpause = async (web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const res = await godlNetworkContract.methods
      .unpause()
      .send({ from: fromAddress });
    return res;
  } catch (error) {
    console.log("Error in godlWeb3 | pause", error);
    return;
  }
};

export const getFeeReceiver = async (web3Obj) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );
    const res = await godlNetworkContract.methods.getFeeReceiver().call();
    return res;
  } catch (error) {
    console.log("Error in godlWeb3 | paused", error);
    return;
  }
};

export const withdrawRewards = async (web3Obj, fromAddress) => {
  try {
    const godlNetworkContract = await createContractObject(
      web3Obj,
      godlABI,
      contractAddress
    );

    const res = await godlNetworkContract.methods
      .withdrawRewards()
      .send({ from: fromAddress });
    return res;
  } catch (error) {
    console.log("Error in godlWeb3 | withdrawRewards", error);
    return;
  }
};
