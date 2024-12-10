import React, { useContext, useEffect } from "react";
import CountUp from "react-countup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import { MdContentCopy } from "react-icons/md";
import { IconContext } from "react-icons";
import copy from "copy-to-clipboard";

import { NetworkGraph } from "../../../components/NetworkTable/NetworkTable";
import { getUser, getUserReferrals } from "../../../services/godlWeb3";
import { web3GlobalContext } from "../../../context/global-context";
import { convertWeiToEth } from "../../../services/web3-services";
import { getEllipsisTxt } from "../../../utils/formatter";
import {images} from "../../../assets/images"
var rewardBalance;
var registerationTime;
var tierUSD;
var rewardUSD;

 function Explorer  (){
  const { t } = useTranslation();

  const [search, setSearch] = useState(true);
  const [searchedInput, setSearchedInput] = useState("");
  const [searchedInputLU, setSearchedInputLU] = useState("");
  const [userStats, setUserStats] = useState({});
  const [referralStats, setReferralStats] = useState({});
  const { web3Obj, paxGodlValue } = useContext(web3GlobalContext);
  const [currentLevel, setCurrentLevel] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [totalRewardBalance, setTotalRewardBalance] = useState("");
  const [referrerAddress, setReferrerAddress] = useState("");
  const [errorText, setErrorText] = useState("");
  const [errorTextLU, setErrorTextLU] = useState("");
  const [showTierUSD, setTierUSD] = useState(false);
  const [showRewardUSD, setRewardUSD] = useState(false);

  const onSearch = async () => {
    try {
      if (!Web3.utils.isAddress(searchedInput)) {
        setErrorText("Kindly enter a valid Ethereum address.");
        return false;
      }

      let getReferrals = await getUserReferrals(searchedInput, web3Obj);
      console.log("getReferrals", getReferrals);

      if(!getReferrals){
      console.log("getReferrals inside");
      setErrorText("Given user has not yet joined the network.");
        return false;
      }
      setReferralStats(getReferrals);

      setSearch(false);
      await getUserdata(searchedInput);
    } catch (error) {
      setErrorText("Given user has not yet joined the network.");
      return false;
    }
  };

  const copyToClipboard = (address) => {
    document.getElementById("wallet-address").style.color = "#f9d461";
    document.getElementById("wallet-address").style.fontWeight = 600;
    setTimeout(() => {
      document.getElementById("wallet-address").style.color = "#fff";
      document.getElementById("wallet-address").style.fontWeight = 400;
    }, 250);
    copy(address);
  };
  const onUserLookup = async () => {
    try {
      let getReferrals = true;
      setErrorTextLU("");
      if (!Web3.utils.isAddress(searchedInputLU)) {
        setErrorTextLU("Kindly enter a valid Ethereum address.");

        return false;
      }
       getReferrals = await getUserReferrals(searchedInputLU, web3Obj);

      if(!getReferrals){
        setErrorTextLU("Given user has not yet joined the network.");
        return false;
      }
      setReferralStats(getReferrals);
      console.log("getReferrals", getReferrals);
      await getUserdata(searchedInputLU);
    } catch (error) {
      setErrorTextLU("Given user has not yet joined the network.");
      return false;
    }
  };

  const getUserdata = async (inputValue) => {
    let userData = await getUser(inputValue, web3Obj);
    setCurrentLevel(userData.currentLevel);
    setUserStats(userData);
    console.log("userData", userData);
    let refCount = 0;
    for (let i = 0; i < userData?.referralCount?.length; i++) {
      refCount += Number(userData.referralCount[i]);
      setReferralCount(refCount);
    }
    let rewardBalanceArray = [userData.rewardBalance];
    let rewardBalanceInEth = await convertWeiToEth(rewardBalanceArray);
    rewardBalance = rewardBalanceInEth[0];
    let totalRbalanceArray = [userData.totalRewards];
    let totalRbalanceInEth = await convertWeiToEth(totalRbalanceArray);
    setTotalRewardBalance(totalRbalanceInEth[0]);

    var utcSeconds = Number(userData.registrationTime);
    // var date = new Date(utcSeconds * 1000);
    // registerationTime = date.toISOString().split("T")[0];
    // let date = new Date(utcSeconds);

    const unixSeconds = Number(userData.registrationTime);
    const unixMilliSeconds = unixSeconds * 1000;
    const myDate = new Date(unixMilliSeconds);
    registerationTime = myDate.toDateString();

    if (userData.referrer === "0x0000000000000000000000000000000000000000") {
      setReferrerAddress("");
    } else {
      setReferrerAddress(userData.referrer);
    }
  };

  const onConvertTier = async (price) => {
    setTierUSD(true);
    tierUSD = price * paxGodlValue;
  };

  const onConvertReward = async (price) => {
    setRewardUSD(true);
    rewardUSD = price * paxGodlValue;
  };

  return (
    <div>
      {search ? (
        <div className="search-screen">
          <div className="search-head">{t("referralExplorerPage.heading")}</div>
          <div className="search-desc">
            {" "}
            {t("referralExplorerPage.para1")} {t("referralExplorerPage.para2")}
          </div>
          <div className="search-bar">
            <input
              className="search-textfield"
              placeholder={t("referralExplorerPage.inputBoxPlaceholder")}
              onChange={(e) => setSearchedInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
            <img
              src={images.serachIcon.src}
              alt="search-icon"
              className="search-icon"
              onClick={onSearch}
            />
          </div>
          <div style={{ marginBottom: 15, fontSize: 14, color: "#ff3333" }}>
            {errorText}
          </div>

          <button className="search-btn" onClick={onSearch}>
            {t("referralExplorerPage.buttonText")}
          </button>
        </div>
      ) : (
        <div className="lookup-screen">
          <div className="gradient-bar" />
          <div className="prof-header">{t("referralExplorerPage.heading")}</div>
          <div className="lookup-searchbar">
            <input
              className="search-textfield-lookup"
              placeholder={searchedInput}
              onChange={(e) => setSearchedInputLU(e.target.value)}
              // value={userLoopupAddress?userLoopupAddress:searchedInputLU}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
            <button className="search-btn" onClick={() => onUserLookup()}>
              {t("referralExplorerPage.buttonText")}
            </button>
          </div>
          <div
            style={{
              marginTop: 15,
              marginBottom: 15,
              fontSize: 14,
              color: "#ff3333",
              marginLeft: 29,
            }}
          >
            {errorTextLU}
    
          </div>

          <div className="" style={{ marginTop: 60 }}>
            <div className="graph"></div>

            <NetworkGraph
              referralStats={referralStats}
              onUserLookup={onUserLookup}
            />

            <div className="exp-countup">
              <div className="count">
                <div>
                  {" "}
                  <div id="wallet-address" style={{ display: "flex" }}>
                    {referrerAddress.length === 42
                      ? getEllipsisTxt(referrerAddress, 3)
                      : "Topline"}
                    {referrerAddress.length === 42 && (
                      <div>
                        <IconContext.Provider
                          value={{
                            size: "0.7em",
                            color: "gray",
                            className: "global-class-name",
                          }}
                        >
                          <div
                            style={{
                              marginTop:12,
                              marginLeft: 8,
                              cursor: "pointer",
                            }}
                            onClick={() => copyToClipboard(referrerAddress)}
                          >
                            <MdContentCopy />
                          </div>
                        </IconContext.Provider>
                      </div>
                    )}
                  </div>
                </div>
                <div className="count-desc">
                  {t("referralExplorerPage.stats1")}{" "}
                </div>
              </div>
              <div className="count">
                <CountUp end={currentLevel ? currentLevel : "-"} duration={3} />
                <div className="count-desc">
                  {t("referralExplorerPage.stats3")}{" "}
                </div>
              </div>
              <div className="count">
                <CountUp
                  end={referralCount ? referralCount : "-"}
                  duration={3}
                />
                <div className="count-desc">
                  {t("referralExplorerPage.stats4")}
                </div>
              </div>
              <div className="count">
                {!showTierUSD ? (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onConvertTier(rewardBalance)}
                  >
                    {" "}
                    <CountUp end={rewardBalance} duration={3} decimals={5} />
                  </div>
                ) : (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setTierUSD(false)}
                  >
                    {" "}
                    <CountUp end={tierUSD} duration={3} decimals={3} />
                  </div>
                )}
                <div className="count-desc">
                  {t("referralExplorerPage.stats2")}
                  {!showTierUSD ? "(PAXG)" : "(USD)"}
                </div>
              </div>

              <div className="count">
                {!showRewardUSD ? (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onConvertReward(totalRewardBalance)}
                  >
                    {" "}
                    <CountUp
                      end={totalRewardBalance}
                      duration={3}
                      decimals={5}
                    />
                  </div>
                ) : (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setRewardUSD(false)}
                  >
                    {" "}
                    <CountUp end={rewardUSD} duration={3} decimals={3} />
                  </div>
                )}
                <div className="count-desc">
                  {t("referralExplorerPage.stats5")}{" "}
                  {!showRewardUSD ? "(PAXG)" : "(USD)"}
                </div>
              </div>
              <div className="count">
                <div>{registerationTime}</div>
                <div className="count-desc">
                  {t("referralExplorerPage.stats6")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Explorer.getInitialProps = async (ctx) => {
  return {};
};
export default Explorer