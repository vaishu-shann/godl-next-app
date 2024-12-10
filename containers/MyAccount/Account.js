import React from "react";
import useWindowSize from "../../utils/windowSize";
import paxgAbi from "../../contracts-abi/paxg.json";
import { web3GlobalContext } from "../../context/global-context";
import {
  buyLevelFor,
  buyLevelForEstimatedGas,
  existingUserStatus,
  getAllRewardTierCosts,
  getUser,
  paused,
  setAutoPurchase,
  updateWalletAddress,
  withdrawRewards,
} from "../../services/godlWeb3";
import {
  convertEthToWei,
  convertWeiToEth,
  getTokenBalance,
  setApproval,
} from "../../services/web3-services";
import { AddCustomToken } from "../../services/addCustomToken";
import config from "../../config";
// import ConnectWallet from "../../components/ConnectWallet/ConnectWallet";

//
import Web3 from "web3";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IconContext } from "react-icons";
import { MdContentCopy } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import copy from "copy-to-clipboard";
import { useEffect } from "react";
import { useContext } from "react";
import { Modal } from "antd";
import Select from "react-select";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

var level1;
var level2;
var level3;
var level4;
var level5;
var level6;
var level7;
var level8;
var level9;
var level10;
var payable1;
var payable2;
var payable3;
var payable4;
var payable5;
var payable6;
var payable7;
var payable8;
var payable9;
var payable10;
let rewardInEth;
let rewardEarned;
var rewardEarnInUSD;
var reinvestInUSD;
var TierCostInWei;
import { ConnectWallet, useAddress, useChain } from "@thirdweb-dev/react";

 function UserData () {
  const { t } = useTranslation();
  const walletAddress = useAddress();
  const chain = useChain();
  const chainGlobal = chain?.chainId;
  const router = useRouter()
  const {
    setWalletAddress,
    web3Obj,
    paxGodlValue,
    pauseUnPauseState,
    isCorrectNetwork,
    setPaxgoldValue,
  } = useContext(web3GlobalContext);
  const windowSize = useWindowSize();
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [userStats, setUserStats] = useState({});
  const [referralCount, setReferralCount] = useState(0);
  const [joinCTA, setJoinCTA] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(
    walletAddress ? walletAddress : ""
  );
  const [totalRewardBalance, setTotalRewardBalance] = useState();
  const [ctaloadingText, setCtaLoadingText] = useState("");
  const [levelSelected, setLevelSelected] = useState();
  const [errorText, setErrorText] = useState(false);
  const [currentLevel, setCurrentLevel] = useState("");
  const [reinvestmentFlag, setReinvestmentFlag] = useState(false);
  const [newWalletAddress, setAddNewWalletAddress] = useState("");
  const [addCTA, setAddCTA] = useState("");
  const [tierUpCost, setTireupCost] = useState("");
  const [ctaGray, setCtaGray] = useState(false);
  const [newAddrErrorText, setNewAddrErrorText] = useState(false);
  const [newAddrloadingText, setNewAddrLoadingText] = useState("");
  const [referrerAddress, setReferrerAddress] = useState("");
  const [showRewardInUSD, setShowRewardInUSD] = useState(false);
  const [showReinvestInUSD, setShowReinvestInUSD] = useState(false);
  const [paxgBalance, setPaxgBalance] = useState();
  const [showLevelEstimatedGas, setShowLevelEstimatedGas] = useState(false);
  const [LevelEstimatedGas, setLevelEstimatedGas] = useState();
  const [withdrawLoadingText, setWithdrawLoadingText] = useState("");
  const [withdrawErrorText, setWithdrawErrorText] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const copyToClipboard = () => {
    document.getElementById("wallet-address").style.color = "#f9d461";
    document.getElementById("wallet-address").style.fontWeight = 600;
    setTimeout(() => {
      document.getElementById("wallet-address").style.color = "#fff";
      document.getElementById("wallet-address").style.fontWeight = 400;
    }, 250);
    let currentUrl = window.location.href;
    currentUrl = currentUrl.replace("/user-profile", "");
    console.log("Modified URL:", currentUrl);
    copy(`${currentUrl}/${walletAddress}`);
  };

  const checkPaxgBalance = async () => {
    let balance = await getTokenBalance(
      web3Obj,
      paxgAbi,
      config.paxgTokenAddress,
      walletAddress
    );
    let balanceInWei = [balance.toString()];
    let balanceInEth = await convertWeiToEth(balanceInWei);
    setPaxgBalance(balanceInEth[0]);
    return balanceInEth[0];
  };

  const userData = async () => {
    let dataRes = await getUser(walletAddress, web3Obj);
    console.log("dataRes----", dataRes.currentLevel);
    setCurrentLevel(dataRes.currentLevel);
    setReinvestmentFlag(dataRes.reinvestFlag);
    setUserStats(dataRes);
    if (dataRes.referrer === "0x0000000000000000000000000000000000000000") {
      setReferrerAddress("You're among the TopLine");
    } else {
      setReferrerAddress(dataRes.referrer);
    }
    let rewardEarnedInWei = [dataRes.totalRewards.toString()];
    let rewardEarnedInEth = await convertWeiToEth(rewardEarnedInWei);
    rewardEarned = rewardEarnedInEth[0];
    let refCount = 0;
    for (let i = 0; i < dataRes?.referralCount?.length; i++) {
      refCount += Number(dataRes.referralCount[i]);
      setReferralCount(refCount);
    }
    let rewardRes = await getAllRewardTierCosts(web3Obj);
    rewardInEth = await convertWeiToEth(rewardRes);

    calculatePayable1(dataRes.currentLevel, rewardInEth);
    calculatePayable2(dataRes.currentLevel, rewardInEth);
    calculatePayable3(dataRes.currentLevel, rewardInEth);
    calculatePayable4(dataRes.currentLevel, rewardInEth);
    calculatePayable5(dataRes.currentLevel, rewardInEth);
    calculatePayable6(dataRes.currentLevel, rewardInEth);
    calculatePayable7(dataRes.currentLevel, rewardInEth);
    calculatePayable8(dataRes.currentLevel, rewardInEth);
    calculatePayable9(dataRes.currentLevel, rewardInEth);
    calculatePayable10(dataRes.currentLevel, rewardInEth);

    let totalRbalanceArray = [dataRes.rewardBalance.toString()];
    let totalRbalanceInEth = await convertWeiToEth(totalRbalanceArray);
    setTotalRewardBalance(totalRbalanceInEth[0]);
  };
  const calculatePayable1 = async (currentLevel, rewardInEth) => {
    payable1 = 0;
    for (let i = currentLevel; i < 1; i++) {
      payable1 += Number(rewardInEth[i]);
    }
  };

  const calculatePayable2 = async (currentLevel, rewardInEth) => {
    payable2 = 0;
    for (let i = currentLevel; i < 2; i++) {
      payable2 += Number(rewardInEth[i]);
    }
  };
  const calculatePayable3 = async (currentLevel, rewardInEth) => {
    payable3 = 0;
    for (let i = currentLevel; i < 3; i++) {
      payable3 += Number(rewardInEth[i]);
    }
  };
  const calculatePayable4 = async (currentLevel, rewardInEth) => {
    payable4 = 0;
    for (let i = currentLevel; i < 4; i++) {
      payable4 += Number(rewardInEth[i]);
    }
  };
  const calculatePayable5 = async (currentLevel, rewardInEth) => {
    payable5 = 0;
    for (let i = currentLevel; i < 5; i++) {
      payable5 += Number(rewardInEth[i]);
    }
  };
  const calculatePayable6 = async (currentLevel, rewardInEth) => {
    payable6 = 0;
    for (let i = currentLevel; i < 6; i++) {
      payable6 += Number(rewardInEth[i]);
    }
  };
  const calculatePayable7 = async (currentLevel, rewardInEth) => {
    payable7 = 0;
    for (let i = currentLevel; i < 7; i++) {
      payable7 += Number(rewardInEth[i]);
    }
  };

  const calculatePayable8 = async (currentLevel, rewardInEth) => {
    payable8 = 0;
    for (let i = currentLevel; i < 8; i++) {
      payable8 += Number(rewardInEth[i]);
    }
  };
  const calculatePayable9 = async (currentLevel, rewardInEth) => {
    payable9 = 0;
    for (let i = currentLevel; i < 9; i++) {
      payable9 += Number(rewardInEth[i]);
    }
  };

  const calculatePayable10 = async (currentLevel, rewardInEth) => {
    payable10 = 0;
    for (let i = currentLevel; i < 10; i++) {
      payable10 += Number(rewardInEth[i]);
    }
  };
  const getUserStats = async () => {
    let rewardRes = await getAllRewardTierCosts(web3Obj);
    rewardInEth = await convertWeiToEth(rewardRes);
    level1 = Number(rewardInEth[0]).toFixed(3);
    level2 = Number(rewardInEth[1]).toFixed(3);
    level3 = Number(rewardInEth[2]).toFixed(3);
    level4 = Number(rewardInEth[3]).toFixed(3);
    level5 = Number(rewardInEth[4]).toFixed(3);
    level6 = Number(rewardInEth[5]).toFixed(3);
    level7 = Number(rewardInEth[6]).toFixed(3);
    level8 = Number(rewardInEth[7]).toFixed(3);
    level9 = Number(rewardInEth[8]).toFixed(3);
    level10 = Number(rewardInEth[9]).toFixed(3);
  };

  useEffect(() => {
    if (walletAddress && isCorrectNetwork) {
      userData();
      getUserStats();
      pausedValidation();
      checkPaxgBalance();
    } else {
      router.push("/");
    }
  }, [
    walletAddress,
    paxgBalance,
    isCorrectNetwork,
    pauseUnPauseState,
    currentLevel,
  ]);

  useEffect(() => {
    if (!isCorrectNetwork) {
      setCtaGray(true);
    }
  }, [isCorrectNetwork]);

  const pausedValidation = async () => {
    try {
      let res = await paused(web3Obj);
      if (res) {
        setCtaGray(res);
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };
  const copyToReferrerAddress = (address) => {
    document.getElementById("ref-address").style.color = "#f9d461";
    document.getElementById("ref-address").style.fontWeight = 600;
    setTimeout(() => {
      document.getElementById("ref-address").style.color = "#fff";
      document.getElementById("ref-address").style.fontWeight = 400;
    }, 250);
    copy(address);
  };
  const onClickLevel = async (e) => {
    setLevelSelected(e.value);
    console.log(e.value);
    console.log("---",currentLevel);
    let tierCost = 0;
    for (let i = currentLevel; i < e.value; i++) {
      tierCost += Number(rewardInEth[i]);
    }
    setTireupCost(tierCost);
    let levelUpArray = [tierCost.toString()];
    TierCostInWei = await convertEthToWei(levelUpArray);
  };

  const levelUpApproval = async () => {
    try {
  
      if (!levelSelected) {
        setLoadingText(
          t(
            "myAccountPage.section4.buttonCtaPopup.popup_approve.notSelectTier_errorText"
          )
        );
        return;
      }

      if( Number(levelSelected) <= Number(currentLevel) ){
        
        setErrorText(true);
        setLoadingText(
         `You are already in Level ${currentLevel}. Please upgrade the level `
        );
        return
      }
      if (selectedAddress.length === 0) {
        setLoadingText("Kindly enter the wallet address to level up.");
        return;
      }
      if (!levelSelected) {
        setLoadingText(
          t(
            "myAccountPage.section4.buttonCtaPopup.popup_approve.notSelectTier_errorText"
          )
        );
        return;
      }
      setErrorText(false);
      setLoadingText(
        t(
          "myAccountPage.section4.buttonCtaPopup.popup_approve.buttonApproveOnClickResponse"
        )
      );
      let levelUpArray = [tierUpCost.toString()];
      let levelUpInWei = await convertEthToWei(levelUpArray);
      const paramObjApproval = {
        approvalAddress: config.godlNetworkAddress,
        approvalAmount: levelUpInWei[0],
      };
      const txReceiptApproval = await setApproval(
        web3Obj,
        paxgAbi,
        config.paxgTokenAddress,
        paramObjApproval,
        walletAddress
      );
      console.log("--txReceipt--", txReceiptApproval);
      setLoadingText(
        t(
          "myAccountPage.section4.buttonCtaPopup.popup_tierUp.approvalSuccessText"
        )
      );
      setJoinCTA("join");
    } catch (error) {
      console.log("Error in factory | levelUp - ", error);
      setLoadingText("");
      if (error.code === 4001) {
        setErrorText(true);
        setLoadingText("You have rejected the transaction. Kindly try again.");
      } else {
        setErrorText(true);
        setLoadingText("Error - Transaction Reverted. Please Try Again.");
      }
      return false;
    }
  };
  const onlevelUp = async () => {
    try {
      setErrorText(false);
      setLoadingText(
        t(
          "myAccountPage.section4.buttonCtaPopup.popup_tierUp.buttonTierUpOnClickResponse"
        )
      );
      setShowLevelEstimatedGas(true);
      let levelGas = await buyLevelForEstimatedGas(
        selectedAddress,
        levelSelected,
        web3Obj,
        walletAddress
      );
      let levelGasInArray = [levelGas.toString()];
      let levelGasInEth = await convertWeiToEth(levelGasInArray);
      setLevelEstimatedGas(levelGasInEth[0]);
      let res = await buyLevelFor(selectedAddress, levelSelected, web3Obj,walletAddress);
      console.log("---level up -- ", res);
      if (res.status) {
        setLoadingText("");
        setJoinCTA("joined");
        setPaxgoldValue();
        await userData();
      }
    } catch (error) {
      console.log("levelUpApproval - ", error);
      if (error.code === 4001) {
        setErrorText(true);
        setLoadingText("You have rejected the transaction. Kindly try again.");
      } else {
        setErrorText(true);
        setLoadingText("Error - Transaction Reverted. Please Try Again.");
      }
      return false;
    }
  };

  const onReInvestmet = async () => {
    try {
      setErrorText(false);
      setCtaLoadingText(t("myAccountPage.section3.buttonOnClickResponse"));
      let res = await setAutoPurchase(!reinvestmentFlag, web3Obj,walletAddress);
      console.log("onReInvestmet", res);
      if (res.status) {
        setCtaLoadingText("");
        await userData();
      }
    } catch (error) {
      console.log("onReInvestmet - ", error);
      if (error.code === 4001) {
        setErrorText(true);
        setCtaLoadingText(
          "You have rejected the transaction. Kindly try again."
        );
      } else {
        setErrorText(true);
        setCtaLoadingText("Error - Transaction Reverted. Please Try Again.");
      }
      return false;
    }
  };

  const addnewAddress = async () => {
    try {
      if (!Web3.utils.isAddress(newWalletAddress)) {
        setNewAddrErrorText(true);
        setNewAddrLoadingText("Kindly enter a valid Ethereum Address");
        return false;
      }
      let isExists = await existingUserStatus(newWalletAddress, web3Obj);
      if (isExists) {
        setNewAddrErrorText(true);
        setNewAddrLoadingText(
          "Entered wallet address already exists in the GODL Network."
        );
        return false;
      }
      setNewAddrErrorText(false);
      setNewAddrLoadingText(
        t(
          "myAccountPage.section4.section5.buttonCtaPopup.buttonAddNewAddressOnClickResponse"
        )
      );
      let resNewAddr = await updateWalletAddress(newWalletAddress, web3Obj,walletAddress);
      if (resNewAddr.status) {
        setNewAddrErrorText(false);
        setAddCTA("added");
        setNewAddrLoadingText("New wallet address added.");
        // await userData();
        router.push("/");
        // window.location.reload();
      }
    } catch (error) {
      if (error.code === 4001) {
        setNewAddrErrorText(true);
        setNewAddrLoadingText(
          "You have rejected the transaction. Kindly try again."
        );
      } else {
        setNewAddrErrorText(true);
        setNewAddrLoadingText(
          "Error - Transaction Reverted. Please Try Again."
        );
      }
      return false;
    }
  };

  const widthrawReward = async () => {
    try {
      setWithdrawErrorText(false);
      setWithdrawLoadingText("Withdraw under progress...");
      const withdrawRes = await withdrawRewards(web3Obj,walletAddress);
      console.log(withdrawRes);
      if (withdrawRes.status) {
        await userData();
        let balanceBeforeWithdraw = Number(paxgBalance)
        console.log("balanceBeforeWithdraw",balanceBeforeWithdraw)
       let balanceAfterWithdraw = await checkPaxgBalance();
       console.log("balanceAfterWithdraw",balanceAfterWithdraw)
       let withdrwaBalance =   Number(balanceAfterWithdraw)- balanceBeforeWithdraw
       console.log("withdrwaBalance",withdrwaBalance)
        setWithdrawLoadingText(`You Withdrew ${Number(withdrwaBalance).toFixed(5)}PAXG successfully.`);
      }
    } catch (error) {
      if (error.code === 4001) {
        setWithdrawErrorText(true);
        setWithdrawLoadingText(
          "You have rejected the transaction. Kindly try again."
        );
      } else {
        setWithdrawErrorText(true);
        setWithdrawLoadingText(
          "Error - Transaction Reverted. Please Try Again."
        );
      }
      return false;
    }
  };
  const onCloseWalletAddress = async () => {
    setModal1Open(false);
    setAddNewWalletAddress("");
    setLoadingText("");
  };
  const onCloseWidthdraw = async () => {
    setModal3Open(false);
  };
  const onCloseModal2 = async () => {
    setModal2Open(false);
    setPaxgBalance(0);
    TierCostInWei = 0;
    setErrorText(false);
    setLoadingText("");
    if (joinCTA === "joined") {
      setWalletAddress(walletAddress);
    }
  };
  const rewardEarnedInUsd = async (price) => {
    setShowRewardInUSD(true);
    rewardEarnInUSD = price * paxGodlValue;
  };
  const reinvestmentInUsd = async (price) => {
    setShowReinvestInUSD(true);
    reinvestInUSD = price * paxGodlValue;
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      color: "#fff!important",
      width: "97%",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: state.isFocused ? "#615531" : "#615531",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#615531" : "#615531",
        cursor: "pointer",
      },
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: "#fff!important",
      background: isFocused ? "#615531" : isSelected ? "#35342f" : "#35342f",
      zIndex: 1,
      
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#fff!important",
    }),
  };
  const options = [
    { value: "1", label: "Level 1" },
    { value: "2", label: "Level 2" },
    { value: "3", label: "Level 3" },
    { value: "4", label: "Level 4" },
    { value: "5", label: "Level 5" },
    { value: "6", label: "Level 6" },
    { value: "7", label: "Level 7" },
    { value: "8", label: "Level 8" },
    { value: "9", label: "Level 9" },
    { value: "10", label: "Level 10" },
  ];

  const CustomOption = options.map((item) => {
    item.label = (
      <div className={Number(currentLevel) > Number(item.value)  ? "diable-div" :""} style={{ color: currentLevel === item.value  ? "#f9d461" : "#fff",cursor: Number(currentLevel) >= Number(item.value)  ? "not-allowed":'pointer' ,pointerEvents: Number(currentLevel) >= Number(item.value)  ? "none" : 'auto'}}  >
       {item.label}:{" "}
        {item.value === "1"
          ? level1
          : item.value === "2"
          ? level2
          : item.value === "3"
          ? level3
          : item.value === "4"
          ? level4
          : item.value === "5"
          ? level5
          : item.value === "6"
          ? level6
          : item.value === "7"
          ? level7
          : item.value === "8"
          ? level8
          : item.value === "9"
          ? level9
          : item.value === "10"
          ? level10
          : ""}{" "}
        PAXG | Payable: 
        {" "} {item.value === "1"
          ? Number(payable1).toFixed(3)
          : item.value === "2"
          ? Number(payable2).toFixed(3)
          : item.value === "3"
          ? Number(payable3).toFixed(3)
          : item.value === "4"
          ? Number(payable4).toFixed(3)
          : item.value === "5"
          ? Number(payable5).toFixed(3)
          : item.value === "6"
          ? Number(payable6).toFixed(3)
          : item.value === "7"
          ? Number(payable7).toFixed(3)
          : item.value === "8"
          ? Number(payable8).toFixed(3)
          : item.value === "9"
          ? Number(payable9).toFixed(3)
          : item.value === "10"
          ? Number(payable10).toFixed(3)
          : ""}{" "}
        PAXG
      </div>
    );
    return item;
  });
  return (
    <div>
      <div className="user-data">
        <div className="gradient-bar" />

        <div className="prof-header">{t("myAccountPage.section1.heading")}</div>

        <div className="acc-ref-link">
          <div className="referral-link" id="wallet-address">
            {" "}
            {t("myAccountPage.section1.copyLinkText")}
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <IconContext.Provider
                value={{
                  size: "1.4em",
                  color: "#fff",
                  className: "global-class-name",
                }}
              >
                <div
                  style={{ marginLeft: 8, marginTop: 5, cursor: "pointer" }}
                  onClick={() => {
                    copyToClipboard();
                  }}
                >
                  <MdContentCopy />
                </div>
              </IconContext.Provider>
            </div>
          </div>{" "}
        </div>

        <div className="refer-plots">
          <div className="steps">
            <IconContext.Provider
              value={{
                size: "1.4em",
                color: "#f9d461",
                className: "global-class-name",
              }}
            >
              <div
                className="steps-icon"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  copyToClipboard();
                }}
              >
                <MdContentCopy />
              </div>
            </IconContext.Provider>
            <div className="r-title">
              {" "}
              {t("myAccountPage.section1.step1.title")}
            </div>
            <div className="r-desc">
              {t("myAccountPage.section1.step1.description")}
            </div>
          </div>
          <div className="steps">
            <IconContext.Provider
              value={{
                size: "1.4em",
                color: "#f9d461",
                className: "global-class-name",
              }}
            >
              <div className="steps-icon">
                <FaTelegramPlane />
              </div>
            </IconContext.Provider>
            <div className="r-title">
              {" "}
              {t("myAccountPage.section1.step2.title")}
            </div>
            <div className="r-desc">
              {t("myAccountPage.section1.step2.description")}
            </div>
          </div>
          <div className="steps">
            <IconContext.Provider
              value={{
                size: "1.4em",
                color: "#f9d461",
                className: "global-class-name",
              }}
            >
              <div className="steps-icon">
                <FiGift />
              </div>
            </IconContext.Provider>
            <div className="r-title">
              {t("myAccountPage.section1.step3.title")}
            </div>
            <div className="r-desc">
              {t("myAccountPage.section1.step3.description")}
            </div>
          </div>
        </div>

        <div className="gradient-bar" />
        <div className="prof-header">{t("myAccountPage.section2.heading")}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "15px 0 15px",
          }}
        >
          <div className="referral-link">
            {t("myAccountPage.section2.stats1")}:{" "}
          </div>
          <div
            className="referral-link"
            id="ref-address"
            style={{
              display: "flex",
              textTransform: "none",
              letterSpacing: "0.5px",
              marginLeft: 8,
            }}
          >
            {referrerAddress}
            {referrerAddress != "You're among the TopLine" && (
              <IconContext.Provider
                value={{
                  size: "1em",
                  color: "gray",
                  className: "global-class-name",
                }}
              >
                <div
                  style={{
                    marginLeft: 8,
                    cursor: "pointer",
                  }}
                  onClick={() => copyToReferrerAddress(referrerAddress)}
                >
                  <MdContentCopy />
                </div>
              </IconContext.Provider>
            )}
          </div>{" "}
        </div>
        <div className="user-stats">
          <div className="ring">
            <div className="ring-status" style={{ left: "42%" }}>
              <CountUp
                end={userStats ? userStats.currentLevel : "-"}
                duration={3}
              />
              {/* </div>
              </div> */}
            </div>
            <div className="stats-desc">
              {t("myAccountPage.section2.stats3")}
            </div>
          </div>
          <div className="ring">
            {!showRewardInUSD ? (
              <div
                style={{ left: "23%", cursor: "pointer" }}
                className="ring-status"
                onClick={() => rewardEarnedInUsd(rewardEarned)}
              >
                <CountUp end={rewardEarned} duration={3} decimals={3} />
              </div>
            ) : (
              <div
                style={{ left: "23%", cursor: "pointer" }}
                className="ring-status"
                onClick={() => setShowRewardInUSD(false)}
              >
                <CountUp end={rewardEarnInUSD} duration={3} decimals={3} />
              </div>
            )}

            <div className="stats-desc">
              {t("myAccountPage.section2.stats5")}
              <span> {!showRewardInUSD ? "(PAXG)" : "(USD)"} </span>{" "}
            </div>
          </div>
          <div className="ring">
            <div style={{ left: "42%" }} className="ring-status">
              <CountUp end={referralCount ? referralCount : "-"} duration={3} />
            </div>
            <div className="stats-desc">
              {t("myAccountPage.section2.stats4")}
            </div>
          </div>
          <div className="ring">
            {!showReinvestInUSD ? (
              <div
                style={{ left: "23%", cursor: "pointer" }}
                className="ring-status"
                onClick={() => reinvestmentInUsd(totalRewardBalance)}
              >
                <CountUp end={totalRewardBalance} duration={3} decimals={3} />
              </div>
            ) : (
              <div
                style={{ left: "23%", cursor: "pointer" }}
                className="ring-status"
                onClick={() => setShowReinvestInUSD(false)}
              >
                <CountUp end={reinvestInUSD} duration={3} decimals={3} />
              </div>
            )}

            <div className="stats-desc">
              {t("myAccountPage.section2.stats2")}
              <span>{!showReinvestInUSD ? "(PAXG)" : "(USD)"}</span>
            </div>
          </div>
        </div>
        <div className="gradient-bar" />
        <div className="prof-header">{t("myAccountPage.section3.heading")}</div>
        <div className="reinvest-desc">
          {t("myAccountPage.section3.para1")}{" "}
          {t("myAccountPage.section3.para2")}
        </div>
        {walletAddress && (
          <div className="reinvest-desc">
            {/* {t("myAccountPage.section3.para3")} */} Currently your auto
            tier-up mode is
            <span> {reinvestmentFlag ? "ON" : "OFF"}</span>.
          </div>
        )}
        <div className="toggle">
          {/* t("myAccountPage.section3.buttonText") */}
          {ctaGray ? (
            <button className="cnt-wallet-gray">
              {!reinvestmentFlag ? "TURN ON" : "TURN OFF "}
            </button>
          ) : (
            <button
              className="cnt-wallet"
              style={{ cursor: walletAddress ? "pointer" : "not-allowed" }}
              onClick={onReInvestmet}
            >
              {!reinvestmentFlag ? "TURN ON" : "TURN OFF "}{" "}
            </button>
          )}

          <div
            className="godl-price"
            style={{
              color: errorText ? "#ff3333" : "rgb(249, 212, 97)",
              marginTop: 8,
            }}
          >
            {ctaloadingText}
          </div>
        </div>
        <div className="gradient-bar" />
        <div className="prof-header">{t("myAccountPage.section4.heading")}</div>
        <div className="reinvest-desc">
          {t("myAccountPage.section4.para1")}{" "}
          {t("myAccountPage.section4.para2")}
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{windowSize.width <= 960 ? "L1" : "Level 1"}</th>
                <th>{windowSize.width <= 960 ? "L2" : "Level 2"}</th>
                <th>{windowSize.width <= 960 ? "L3" : "Level 3"}</th>
                <th>{windowSize.width <= 960 ? "L4" : "Level 4"}</th>
                <th>{windowSize.width <= 960 ? "L5" : "Level 5"}</th>
                <th>{windowSize.width <= 960 ? "L6" : "Level 6"}</th>
                <th>{windowSize.width <= 960 ? "L7" : "Level 7"}</th>
                <th>{windowSize.width <= 960 ? "L8" : "Level 8"}</th>
                <th>{windowSize.width <= 960 ? "L9" : "Level 9"}</th>
                <th>{windowSize.width <= 960 ? "L10" : "Level 10"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    color: "#fbdb5d",
                    fontWeight: 600,
                    fontSize: windowSize.width <= 960 ? "12px" : "16px",
                  }}
                >
                  Price(PAXG)
                </td>
                <td>0.010</td>
                <td>0.025</td>
                <td>0.050</td>
                <td>0.10</td>
                <td>0.50</td>
                <td>1.50</td>
                <td>2.00</td>
                <td>3.00</td>
                <td>4.00</td>
                <td>5.00</td>
              </tr>
              <tr>
                <td
                  style={{
                    color: "#fbdb5d",
                    fontWeight: 600,
                    fontSize: windowSize.width <= 960 ? "12px" : "16px",
                  }}
                >
                  Reward %
                </td>
                <td>10</td>
                <td>9</td>
                <td>8</td>
                <td>7</td>
                <td>6</td>
                <td>5</td>
                <td>4</td>
                <td>3</td>
                <td>2</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
        {ctaGray ? (
          <button className="cnt-wallet-gray">
            {t("myAccountPage.section4.buttonText")}{" "}
          </button>
        ) : (
          <button className="cnt-wallet" onClick={() => setModal2Open(true)}>
            {t("myAccountPage.section4.buttonText")}
          </button>
        )}
        <div style={{ marginTop: 50 }} />
        <div className="gradient-bar" />
        <div className="prof-header">Withdraw Reward (PAXG)</div>
        <div className="reinvest-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem.Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
        </div>
        <div className="toggle">
          {ctaGray ? (
            <button className="cnt-wallet-gray"> Withdraw</button>
          ) : (
            <button className="cnt-wallet" onClick={widthrawReward}>
              Withdraw
            </button>
          )}
        </div>
        {withdrawLoadingText && (
          <div
            style={{
              color: withdrawErrorText ? "red" : "#fff",
              fontSize: 14,
              marginTop: -30,
              marginBottom: 10,
            }}
          >
            {withdrawLoadingText}{" "}
          </div>
        )}
        <div style={{ marginTop: 50 }} />
        <div className="gradient-bar" />
        <div className="prof-header">
          {t("myAccountPage.section4.section5.heading")}
        </div>
        <div className="reinvest-desc">
          {t("myAccountPage.section4.section5.para1")}{" "}
          {t("myAccountPage.section4.section5.para2")}
        </div>
        <div className="toggle">
          {ctaGray ? (
            <button className="cnt-wallet-gray">
              {" "}
              {t("myAccountPage.section4.section5.buttonText")}
            </button>
          ) : (
            <button className="cnt-wallet" onClick={() => setModal1Open(true)}>
              {t("myAccountPage.section4.section5.buttonText")}
            </button>
          )}
        </div>
      </div>
      <Modal
        className="popup-modal"
        title={t(
          "myAccountPage.section4.buttonCtaPopup.popup_tierUp.buttonTierUpText"
        )}
        centered
        open={modal2Open}
        onOk={() => setModal2Open()}
        onCancel={() => onCloseModal2()}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {walletAddress ? (
          <div>
            <input
              placeholder={t("myAccountPage.section4.section5.buttonText")}
              className="modal-input"
              style={{
                cursor: walletAddress ? "auto" : "not-allowed",
                marginTop: 15,
              }}
              onChange={(e) => setSelectedAddress(e.target.value)}
              value={selectedAddress}
            />
            
           <div style={{ marginTop: 15 }} />
              <Select styles={customStyles} options={CustomOption}  onChange={onClickLevel}  placeholder={"Select Level"}  value={CustomOption.find(obj => obj.value === selectedValue)} />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {joinCTA === "join" ? (
                <button
                  className="cnt-wallet"
                  onClick={() => onlevelUp()}
                  style={{ marginTop: 15 }}
                >
                  {" "}
                  Level Up
                </button>
              ) : (
                <div>
                  {joinCTA === "joined" ? (
                    <div>
                      <div
                        className="cta-large"
                        style={{ marginTop: 20, marginBottom: 10 }}
                      >
                        {" "}
                        {t(
                          "myAccountPage.section4.buttonCtaPopup.popup_tierUp_success.buttonTierUpSuccessText"
                        )}
                      </div>
                      <div>
                        {" "}
                        <a
                          className="add-metamask"
                          style={{ textDecoration: "underline", color: "#fff" }}
                          onClick={() =>
                            AddCustomToken(
                              config.godlToken,
                              "GODL",
                              18,
                              "",
                              web3Obj
                            )
                          }
                        >
                          {" "}
                          {t(
                            "myAccountPage.section4.buttonCtaPopup.popup_tierUp_success.addTokenText"
                          )}
                        </a>{" "}
                      </div>
                    </div>
                  ) : (
                    <button
                      className="cnt-wallet"
                      onClick={() => levelUpApproval()}
                      style={{ marginTop: 15 }}
                    >
                      {" "}
                      {t(
                        "homePage.section1.button1CTA.popup_withWalletConnected_newUser.popup_approve.buttonApproveText"
                      )}
                    </button>
                  )}
                </div>
              )}
              {loadingText && (
                <div
                  className="godl-price"
                  style={{
                    color: errorText ? "#ff3333" : "#fff",
                    marginTop: 15,
                  }}
                >
                  {loadingText}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="reinvest-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d
              eiusmod tempor incididunt ut labore et dolo re magna aliqua.
            </div>
            {/* <div className="count-desc" style={{ textAlign: "center" }}>
              {" "}
              {t(
                "homePage.section1.button1CTA.popup_withoutWalletConnection.errorText"
              )}
            </div> */}
            <ConnectWallet  modalSize="compact"/>
          </div>
        )}
      </Modal>
      <Modal
        className="popup-modal"
        title={t("myAccountPage.section4.section5.buttonCtaPopup.heading")}
        centered
        open={modal1Open}
        onOk={() => setModal1Open()}
        onCancel={onCloseWalletAddress}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="reinvest-desc" style={{ padding: "10px 0 8px" }}>
          {t("myAccountPage.section4.section5.buttonCtaPopup.para1")}
        </div>
        <input
          placeholder={t(
            "myAccountPage.section4.section5.buttonCtaPopup.inputBoxPlaceholder"
          )}
          className="modal-input"
          style={{
            cursor: walletAddress ? "auto" : "not-allowed",
            marginTop: 15,
          }}
          onChange={(e) => setAddNewWalletAddress(e.target.value)}
          value={newWalletAddress}
        />
        {walletAddress ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {addCTA === "added" ? (
              <div
                className="cta-large"
                style={{ marginTop: 20, marginBottom: 10 }}
              >
                {" "}
                Successfully Added !
              </div>
            ) : (
              <div>
                <button
                  className="cta-large"
                  style={{ marginTop: 15 }}
                  onClick={addnewAddress}
                >
                  {" "}
                  {t(
                    "myAccountPage.section4.section5.buttonCtaPopup.buttonAddNewAddressText"
                  )}
                </button>
              </div>
            )}
            <div
              className="godl-price"
              style={{
                color: newAddrErrorText ? "#ff3333" : "#fff",
                marginTop: 15,
              }}
            >
              {newAddrloadingText}
            </div>
          </div>
        ) : (
          <div>
       
            <ConnectWallet  modalSize="compact" />
          </div>
        )}
      </Modal>
      <Modal
        className="popup-modal"
        title="Withdraw Reward"
        centered
        open={modal3Open}
        onOk={() => setModal3Open()}
        onCancel={onCloseWidthdraw}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="reinvest-desc" style={{ padding: "10px 0 8px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur.
        </div>

        {walletAddress ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {addCTA === "added" ? (
              <div
                className="cta-large"
                style={{ marginTop: 20, marginBottom: 10 }}
              >
                {" "}
                Successfully Withdrawed !
              </div>
            ) : (
              <div>
                <button
                  className="cta-large"
                  style={{ marginTop: 15 }}
                  onClick={addnewAddress}
                >
                  {" "}
                  Withdraw PAXG
                </button>
              </div>
            )}
            <div
              className="godl-price"
              style={{
                color: newAddrErrorText ? "#ff3333" : "#fff",
                marginTop: 15,
              }}
            >
              {newAddrloadingText}
            </div>
          </div>
        ) : (
          <div>
       
            <ConnectWallet  modalSize="compact" />
          </div>
        )}
      </Modal>
    </div>
  );
};


UserData.getInitialProps = async (ctx) => {
  return {};
};
export default UserData
