import React, { useRef } from "react";
import {
  convertGweiToWei,
  convertWeiToEth,
  getTokenBalance,
  setApproval,
} from "../../../services/web3-services";
import config from "../../../config";
import {
  checkIfUserIsInTopline,
  getAllRewardTierCosts,
  getRewardTierCost,
  getTotalRewardsGenerated,
  getTotalRewardsReinvested,
  Users,
  joinGodl,
  joinGodlEstimateGas,
  mintPAXG,
  paused,
  getTotalUsers,
} from "../../../services/godlWeb3";
import { web3GlobalContext } from "../../../context/global-context";
import paxgAbi from "../../../contracts-abi/paxg.json";
import { existingUserStatus } from "../../../services/godlWeb3";
import { AddCustomToken } from "../../../services/addCustomToken";
import useWindowSize from "../../../utils/windowSize";
// import ConnectWallet from "../../../components/ConnectWallet/ConnectWallet";
import ReactPlayer from "react-player";
//
import { images } from "../../../assets/images";
import { IconContext } from "react-icons";
import { BsInfoCircle } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import CountUp from "react-countup";
import { Modal } from "antd";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
var isWhitelisted;
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
var payable2;
var payable3;
var payable4;
var payable5;
var payable6;
var payable7;
var payable8;
var payable9;
var payable10;
var referralLinkAddress;
var walletType;
var level;
import { ConnectWallet, useAddress, useChain } from "@thirdweb-dev/react";

export const HomeScreen = () => {
  const walletAddress = useAddress();
  const chain = useChain();
  const chainGlobal = chain?.chainId;
  const router = useRouter();
  const { t } = useTranslation();
  const windowSize = useWindowSize();
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [referrerAddress, setReferrerAddress] = useState("");
  const [levelCost, setLevelCost] = useState("");
  const [levelCostInEth, setLevelCostInEth] = useState("");
  const [levelSelected, setLevelSelected] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const [ctaloadingText, setCtaLoadingText] = useState("");
  const [errorText, setErrorText] = useState(false);
  const [totalUsers, setTotalUsers] = useState("");
  const [joinCTA, setJoinCTA] = useState("");
  const [userJoined, setUserJoined] = useState(false);
  const [ctaGray, setCtaGray] = useState(false);
  const [showUSDReward, setShowUSDReward] = useState(false);
  const [showUSDPrice, setShowUSDPrice] = useState(false);
  const [rewardvalue, setRewardValue] = useState("");
  const [totalReinvest, setTotalReinvest] = useState("");
  const [paxgBalance, setPaxgBalance] = useState();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showDisclaimerText, setShowDisclaimerText] = useState(true);
  const [showEstimatedGasFee, setShowEstimatedGasFee] = useState(false);
  const [joinEstimatedGasFee, setJoinEstimatedGasFee] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [scrollToVideo, setScrollToVideo] = useState(false);

  const {
    web3Obj,
    setWalletAddress,
    paxGodlValue,
    pauseUnPauseState,
    isCorrectNetwork,
    setExistingUser,
    showGif,
    setShowGif,
  } = useContext(web3GlobalContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      walletType = localStorage.getItem("wallet_type");
    } else {
    }
  }, []);

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
  useEffect(() => {
    if (web3Obj) {
      totalUser();
      getTotalReward();
      getTotalReinvested();
    }
  }, [web3Obj, pauseUnPauseState, walletAddress]);
  useEffect(() => {
    if (walletAddress) {
      checkPaxgBalance();
    }
  }, [walletAddress, paxgBalance]);
  useEffect(() => {
    const currentUrl = window.location.href;
    const has0x = currentUrl.includes("0x");
    if (has0x) {
      setModal2Open(true);  
      referralLinkAddress = window.location.href.substring(
        window.location.href.length - 42,
        window.location.href.length
      );
      setReferrerAddress(referralLinkAddress);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (window.location.href.search("video") != -1) {
      setScrollToVideo(true);

      const element = document.getElementById("YouTubeVideo");
      element.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    if (walletAddress && isCorrectNetwork) {
      whitelistValidation();
      getAllReward();
      pausedValidation();
    }
  }, [walletAddress, totalUsers, pauseUnPauseState]);

  useEffect(() => {
    if (walletAddress && isCorrectNetwork) {
      getAllReward();
    }
  }, [
    walletAddress,
    totalUsers,
    pauseUnPauseState,
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    level10,
    payable2,
    payable3,
    payable4,
    payable5,
    payable6,
    payable7,
    payable8,
    payable9,
    payable10,
  ]);

  const checkPaxgBalance = async () => {
    let balance = await getTokenBalance(
      web3Obj,
      paxgAbi,
      config.paxgTokenAddress,
      walletAddress
    );
    console.log("balance", balance);
    if (balance) {
      let balanceInWei = [balance.toString()];

      let balanceInEth = await convertWeiToEth(balanceInWei);

      console.log("__paxg balance___", balanceInEth);
    }
  };

  const getAllReward = async () => {
    let rewardRes = await getAllRewardTierCosts(web3Obj);
    let rewardInEth = await convertWeiToEth(rewardRes);
    if(rewardInEth){
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
    }
    payable2 = Number(level1) + Number(level2);
    payable3 = payable2 + Number(level3);
    payable4 = payable3 + Number(level4);
    payable5 = payable4 + Number(level5);
    payable6 = payable5 + Number(level6);
    payable7 = payable6 + Number(level7);
    payable8 = payable7 + Number(level8);
    payable9 = payable8 + Number(level9);
    payable10 = payable9 + Number(level10);
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
      <div>
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
        PAXG | Payable:{" "}
        {item.value === "1"
          ? level1
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

  const disclaimerPopup = async () => {
    setModal1Open(true);
  };

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

  const whitelistValidation = async () => {
    isWhitelisted = await checkIfUserIsInTopline(walletAddress, web3Obj);
  };

  const totalUser = async () => {
    let userCount = await getTotalUsers(web3Obj);
    setTotalUsers(userCount);
  };

  const getTotalReward = async () => {
    let resReward = await getTotalRewardsGenerated(web3Obj);
    
    let resRewardInWei = [resReward?resReward.toString():""];
    let resRewardInEth = await convertWeiToEth(resRewardInWei);
    // totalReward =
    setRewardValue(resRewardInEth ? resRewardInEth[0] : "");
  };
  const getTotalReinvested = async () => {
    let resReInvested = await getTotalRewardsReinvested(web3Obj);
    let resReinvestedInWei = [resReInvested?resReInvested.toString():""];
    let resReinvestedInEth = await convertWeiToEth(resReinvestedInWei);
    // totalReInvested = resReinvestedInEth[0];
    setTotalReinvest(resReinvestedInEth ? resReinvestedInEth[0] : "");
  };

  const onJoinClick = async () => {
    if (walletAddress) {
      let userRes = await existingUserStatus(walletAddress, web3Obj);
      setUserJoined(userRes);
    }
    setModal2Open(true);
  };

  const onCloseModal2 = async () => {
    if (referralLinkAddress) {
      setModal2Open(false);
      return;
    }
    setModal2Open(false);
    setCtaLoadingText("");
    setLoadingText("");
    setReferrerAddress("");
    if (joinCTA === "joined") {
      setShowGif(true);
    }
  };
  // const checkExistingUser = async () => {
  //   try {
  //     let isExists = await existingUserStatus(referrerAddress, web3Obj);
  //     setIsExistUser(isExists);
  //     return isExists;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };
  // let isExists = await checkExistingUser();
  // if (!isExists) {
  //   setErrorText(true);
  //   setLoadingText("Entered referrer address doen not exist in the GODL Network yet.");
  //   return false;
  // }

  const onApprove = async (e) => {
    try {
      if (!levelSelected) {
        setLoadingText("Kindly select a reward package level.");
        return;
      }

      setErrorText(false);
      setLoadingText(
        t(
          "homePage.section1.button1CTA.popup_withWalletConnected_newUser.popup_approve.buttonApproveOnClickResponse"
        )
      );
      const paramObjApproval = {
        approvalAddress: config.godlNetworkAddress,
        approvalAmount: levelCost,
      };
      if (!isWhitelisted && !Web3.utils.isAddress(referrerAddress)) {
        console.log("))))", referrerAddress);
        setErrorText(true);
        setLoadingText("Kindly enter a valid Ethereum address.");
        return false;
      }
      if (referrerAddress === walletAddress) {
        setErrorText(true);
        setLoadingText(
          "Referrer address cannot be your connected address. Kindly enter a valid Referrer address. "
        );
        return;
      }
      if (referrerAddress === "0x0000000000000000000000000000000000000000") {
        setErrorText(true);
        setLoadingText(
          "Referrer cannot be the zero address. Kindly enter a valid Ethereum address."
        );
        return;
      }

      if (!isWhitelisted) {
        let isExists = await existingUserStatus(referrerAddress, web3Obj);
        console.log("!isExistinguser 1", isExists);

        if (!isExists) {
          console.log("!isExistinguser 2", isExists);
          setErrorText(true);
          setLoadingText(
            "Entered referrer address doen not exist in the GODL Network yet."
          );
          return;
        }
      }

      const txReceiptApproval = await setApproval(
        web3Obj,
        paxgAbi,
        config.paxgTokenAddress,
        paramObjApproval,
        walletAddress
      );
      console.log("--txReceipt--", txReceiptApproval);
      setShowDisclaimerText(false);
      setLoadingText("");
      setJoinCTA("join");
    } catch (error) {
      console.log("Error in factory | Approve - ", error);
      setLoadingText("");
      return false;
    }
  };
  const onJoinGodl = async () => {
    try {
      setErrorText(false);
      setShowEstimatedGasFee(true);
      setLoadingText("Join under progress...");
      let gasRes = await joinGodlEstimateGas(
        isWhitelisted
          ? "0x0000000000000000000000000000000000000000"
          : referrerAddress,
        levelSelected,
        web3Obj,
        walletAddress
      );
      let gasResInArray = [gasRes.toString()];
      console.log("gasRes", gasRes);
      console.log("gasResInArray", gasResInArray);
      let gasResInGwei = await convertGweiToWei(gasResInArray);
      console.log("valueInWei", gasResInGwei[0]);

      setJoinEstimatedGasFee(gasResInGwei[0]);

      let res = await joinGodl(
        isWhitelisted
          ? "0x0000000000000000000000000000000000000000"
          : referrerAddress,
        levelSelected,
        web3Obj,
        walletAddress
      );
      console.log("---join res -- ", res);
      if (res.status) {
        setExistingUser(true);
        setLoadingText("");
        setJoinCTA("joined");

        await getAllReward();
        await totalUser();
        await getTotalReward();
        await getTotalReinvested();
        setWalletAddress(walletAddress);
      }
    } catch (error) {
      console.log("onJoinGodl - ", error);
      if (Number(error.code) === Number(4001)) {
        setErrorText(true);
        setLoadingText("You have rejected the transaction. Kindly try again.");
      } else {
        setErrorText(true);
        setLoadingText("Error - Transaction Reverted. Please Try Again.");
      }
      return false;
    }
  };
  const onClickLevel = async (e) => {
    setLevelSelected(e.value);
    console.log(Number(e.value));
    if (Number(e.value) === Number(0)) {
      return;
    }
    setLevelCost(await getRewardTierCost("0", e.value, web3Obj));
    let levelCostInWei = [await getRewardTierCost("0", e.value, web3Obj)];
    let levelCostInEth = await convertWeiToEth(levelCostInWei);
    setLevelCostInEth(levelCostInEth[0]);
    console.log("levelCostInEth", levelCostInEth[0]);
    // console.log("setLevelCost" , await getRewardTierCost("0", e.target.value, web3Obj) )
  };

  const handleBuyPaxgButtonClick = (async) => {
    window.open(
      "https://app.uniswap.org/#/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0x45804880de22913dafe09f4980848ece6ecbaf78",
      "_blank"
    );
  };
  const onMint = async () => {
    // try {
    //   setCtaLoadingText("Miniting in progess..");
    //   let mintPaxg = await mintPAXG("1000000000000000000000", web3Obj,walletAddress);
    //   console.log("mintPaxg", mintPaxg);
    //   if (mintPaxg.status) {
    //     setCtaLoadingText("Add PAXG to Wallet");
    //   }
    // } catch (error) {
    //   console.log("mint paxg error", error);
    //   if (Number(error.code) === Number(4001)) {
    //     console.log("error.message", error.message);
    //     console.log("error.code", error.code);
    //     setErrorText(true);
    //     setCtaLoadingText(
    //       "You have rejected the transaction. Kindly try again."
    //     );
    //   } else {
    //     console.log("error.message", error.message);
    //     console.log("error.code", error.code);
    //     setErrorText(true);
    //     setCtaLoadingText("Error - Transaction Reverted. Please Try Again.");
    //   }
    //   return false;
    // }
  };
  const onConvertUSD = async (price) => {
    setShowUSDPrice(true);
    rewardEarnInUSD = price * paxGodlValue;
  };
  const onConvertRewardtoUSD = async (price) => {
    setShowUSDReward(true);
    rewardValueInUSD = price * paxGodlValue;
  };
  const onAcceptterms = (e) => {
    setShowDisclaimer(!showDisclaimer);
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div>
      <div className="main-page">
        <div className="home-text">
          <div className="gradient-bar" />
          <div className="home-title">{t("homePage.section1.heading")} </div>
          <div className="home-subtitle">
            {t("homePage.section1.subHeading")}{" "}
          </div>
          {windowSize.width <= 960 && (
            <img
              src={images.LogoImage.src}
              alt="AuriumToken"
              className="home-img"
            />
          )}
          <div className="home-desc">
            {t("homePage.section1.para1")} {t("homePage.section1.para2")}{" "}
            {t("homePage.section1.para3")}
          </div>
          <div className="home-cta">
            {ctaGray ? (
              <button className="start-btn-gray">
                {t("homePage.section1.button1Text")}
              </button>
            ) : (
              <button className="start-btn" onClick={() => onJoinClick()}>
                {t("homePage.section1.button1Text")}
              </button>
            )}
            {ctaGray ? (
              <button className="join-btn-gray">
                {t("homePage.section1.button2Text")}
              </button>
            ) : (
              <button
                className="join-btn"
                onClick={() => router.push("/trade-godl")}
              >
                {t("homePage.section1.button2Text")}
              </button>
            )}

            <button className="join-btn" onClick={handleBuyPaxgButtonClick}>
              {t("homePage.section1.button3Text")}
            </button>
          </div>
          {ctaloadingText === "Add PAXG to Wallet" ? (
            <div
              style={{
                color: "#fff",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: 12,
                margin: "15px 0px 0 0px ",
                paddingTop: 10,
              }}
              onClick={() =>
                AddCustomToken(config.paxgTokenAddress, "PAXG", 18, "", web3Obj)
              }
            >
              {ctaloadingText}
            </div>
          ) : (
            <div
              style={{
                color: "#fff",
                fontSize: 12,
                margin: "15px 0px 0 0px ",
              }}
            >
              {ctaloadingText}
            </div>
          )}
        </div>
        {windowSize.width > 960 && (
          <img
            src={images.LogoImage.src}
            alt="AuriumToken"
            className="home-img"
          />
        )}
      </div>

      <div id="YouTubeVideo" style={{ overflowY: "auto" }}>
        <ReactPlayer
          url="https://youtu.be/3-gquBu80KA"
          playing={scrollToVideo ? true : false}
          className="react-player"
        />
      </div>
      <Modal
        className="popup-modal"
        title={
          userJoined
            ? t(
                "homePage.section1.button1CTA.popup_withWalletConnected_alreadyJoined.heading"
              )
            : t(
                "homePage.section1.button1CTA.popup_withoutWalletConnection.heading"
              )
        }
        centered
        open={modal2Open}
        onOk={() => onJoinGodl()}
        onCancel={() => onCloseModal2()}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {" "}
        {userJoined ? (
          <div className="sell-desc" style={{ margin: "20px 0" }}>
            {t(
              "homePage.section1.button1CTA.popup_withWalletConnected_alreadyJoined.para1"
            )}{" "}
            {t(
              "homePage.section1.button1CTA.popup_withWalletConnected_alreadyJoined.para2"
            )}{" "}
            {t(
              "homePage.section1.button1CTA.popup_withWalletConnected_alreadyJoined.para3"
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "25px auto 10px", width: "100%" }}>
              <div className="sell-desc">
                {t(
                  "homePage.section1.button1CTA.popup_withoutWalletConnection.heading"
                )}
              </div>
              <div />
              <div className="count-desc" style={{ marginBottom: 8 }}>
                {isWhitelisted
                  ? "You are among the Topline, referrer address is not required"
                  : ""}
              </div>
              <input
                placeholder={
                  isWhitelisted
                    ? "Not Required"
                    : t(
                        "homePage.section1.button1CTA.popup_withoutWalletConnection.referrerAddressInputBoxPlaceholder"
                      )
                }
                className="modal-input"
                style={{ cursor: walletAddress ? "auto" : "not-allowed" }}
                disabled={!isWhitelisted ? false : true}
                onChange={(e) => setReferrerAddress(e.target.value)}
                value={referrerAddress}
              />

              <div style={{ marginTop: 15 }} />
              <Select
                styles={customStyles}
                options={CustomOption}
                onChange={onClickLevel}
                placeholder={"Select Level"}
                value={CustomOption.find((obj) => obj.value === selectedValue)}
              />
            </div>
            {Number(paxgBalance) < Number(levelCostInEth) && (
              <div className="insuff-balance">
                <div>
                  <IconContext.Provider
                    value={{
                      size: "0.8em",
                      color: "#ff333",
                      className: "global-class-name",
                    }}
                  >
                    <div
                      style={{
                        marginRight: 8,
                        cursor: "pointer",
                      }}
                    >
                      <BsInfoCircle />
                    </div>
                  </IconContext.Provider>
                </div>
                <div>
                  Your account has insufficient PAXG balance. Kindly please
                  check your account.{" "}
                </div>
              </div>
            )}

            {walletAddress && showDisclaimerText ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <input
                  type="checkbox"
                  id="disclaimer"
                  name="Disclaimer"
                  className="check-disclaimer"
                  onChange={onAcceptterms}
                />

                <div className="disclaimer-head" onClick={disclaimerPopup}>
                  {t(
                    "homePage.section1.button1CTA.popup_withWalletConnected_newUser.popup_approve.tncButtonText"
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/* Gas Estimation */}
            {/* {walletAddress && showEstimatedGasFee ? (
              <div>
                <div className="estimated-fee">
                  <div>
                    <IconContext.Provider
                      value={{
                        size: "0.8em",
                        color: "#fff",
                        className: "global-class-name",
                      }}
                    >
                      <div
                        style={{
                          marginRight: 8,
                          cursor: "pointer",
                        }}
                      >
                        <BsInfoCircle />
                      </div>
                    </IconContext.Provider>
                  </div>
                  <div>Estimated Gas Fees : {joinEstimatedGasFee} ETH</div>
                </div>
              </div>
            ) : (
              <div></div>
            )} */}
            <div>
              {walletAddress ? (
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  {joinCTA === "join" ? (
                    <button
                      className="cta-large"
                      style={{ marginTop: 15 }}
                      onClick={() => onJoinGodl()}
                    >
                      {" "}
                      Join GODL
                    </button>
                  ) : (
                    <div>
                      {joinCTA === "joined" ? (
                        <div>
                          <div
                            className="cta-large"
                            style={{ marginBottom: 15, marginTop: 15 }}
                          >
                            {" "}
                            Successfully Joined!
                          </div>
                          <div
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
                            <a
                              className="add-metamask"
                              style={{
                                paddingTop: 15,
                                textDecoration: "underline",
                                color: "#fff",
                              }}
                            >
                              {" "}
                              Add GODL to{" "}
                              {walletType === "metamask"
                                ? "Metamask"
                                : "Trustwallet"}
                            </a>{" "}
                          </div>
                        </div>
                      ) : (
                        <div>
                          {showDisclaimer ? (
                            <button
                              className="cta-large"
                              style={{ marginRight: 0 }}
                              onClick={() => onApprove()}
                            >
                              {" "}
                              {t(
                                "homePage.section1.button1CTA.popup_withWalletConnected_newUser.popup_approve.buttonApproveText"
                              )}
                            </button>
                          ) : (
                            <button
                              className="start-btn-gray"
                              style={{ width: 175 }}
                            >
                              {" "}
                              {t(
                                "homePage.section1.button1CTA.popup_withWalletConnected_newUser.popup_approve.buttonApproveText"
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {loadingText && (
                    <div
                      className="godl-price"
                      style={{
                        color: errorText ? "#ff3333" : "#fff",
                        marginTop: 15,
                        textAlign: "center",
                      }}
                    >
                      {loadingText}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {/* <div className="count-desc">
                    {t(
                      "homePage.section1.button1CTA.popup_withoutWalletConnection.errorText"
                    )}
                  </div> */}
                  <div style={{ marginTop: 15 }} />
                  {/* <ConnectWallet /> */}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
      <Modal
        className="popup-modal"
        title={t(
          "homePage.section1.button1CTA.popup_withWalletConnected_newUser.popup_approve.tncButtonCtaPopup.heading"
        )}
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="sell-desc" style={{ margin: "20px 0" }}>
          {t(
            "homePage.section1.button1CTA.popup_withWalletConnected_newUser.popup_approve.tncButtonCtaPopup.para1"
          )}{" "}
          {t(
            "homePage.section1.button1CTA.popup_withWalletConnected_newUser.popup_approve.tncButtonCtaPopup.para2"
          )}
        </div>
      </Modal>
    </div>
  );
};

HomeScreen.getInitialProps = async (ctx) => {
  return {};
};
export default HomeScreen;
