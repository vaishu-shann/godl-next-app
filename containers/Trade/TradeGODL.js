import React, { useEffect, useState } from "react";
import { getEllipsisTxt } from "../../utils/formatter";
import { web3GlobalContext } from "../../context/global-context";
import config from "../../config";
import {
  convertEthToWei,
  convertWeiToEth,
  getTokenBalance,
  setApproval,
} from "../../services/web3-services";
import {
  burnHToken,
  burnHTokenEstimatedGas,
  getHTokenDetails,
  getHTokenMintAmount,
  getPaxgGetAmount,
  mintGodl,
  mintGodlEstimatedGas,
} from "../../services/godlWeb3";
import paxgAbi from "../../contracts-abi/paxg.json";
import godlAbi from "../../contracts-abi/auriumToken.json";
import { AddCustomToken } from "../../services/addCustomToken";
//
import { IconContext } from "react-icons";
import { GiGoldBar } from "react-icons/gi";
import { BsInfoCircle } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { useContext } from "react";
import { ConnectWallet, useAddress, useChain } from "@thirdweb-dev/react";

var walletType;

const TradeGODL = () => {
  const walletAddress = useAddress();
  const chain = useChain();
  const chainGlobal = chain?.chainId;
  const { t } = useTranslation();
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [errorText, setErrorText] = useState(false);
  const [mintCTA, setMintCTA] = useState("");
  const [previewScreen, setPreviewScreen] = useState(false);
  const [hTokenName, setHTokenName] = useState("");
  const [hTokenSymbol, setHTokenSymbol] = useState("");
  const [value, setValue] = useState(0);
  const [paxgDeposit, setPaxgDeposit] = useState("");
  const [expectedHTokenMint, setExpectedHTokenMint] = useState("");
  const [godlToSell, setGodlToSell] = useState("");
  const [expectedPaxgReceived, setExpectedPaxgReceived] = useState("");
  const [buyPreviewScreen, setBuyPreviewScreen] = useState(false);
  const [burnCTA, setBurnCTA] = useState("");
  const [burnLoadingText, setBurnLoadingText] = useState("");
  const [burnErrorText, setBurnErrorText] = useState(false);
  const [godlMintedBoolen, setGodlMintedBoolen] = useState(false);
  const [godlMinted, setGodlMinted] = useState();
  const [mintTxHash, setMintTxHash] = useState();
  const [godlBurnedBoolen, setGodlBurnedBoolen] = useState(false);
  const [burnTxHash, setBurnTxHash] = useState();
  const [paxgReceived, setPaxgReceived] = useState();
  const [etherscanLink, setEtherscanLink] = useState();
  const [godlBalance, setGodlBalance] = useState();
  const [paxgBalance, setPaxgBalance] = useState();
  const [enterGodlBalance, SetEnterGodlBalance] = useState(false);
  const [enterPaxgBalance, SetEnterPaxgBalance] = useState(false);
  const [freezeMintInput, setFreezeMintInput] = useState(false);
  const [freezeBurnInput, setFreezeBurnInput] = useState(false);
  const [showMintEstimatedGas, setShowMintEstimatedGas] = useState(false);
  const [mintEstimatedGas, setMintEstimatedGas] = useState();
  const [showBurnEstimatedGas, setShowBurnEstimatedGas] = useState(false);
  const [burnEstimatedGas, setBurnEstimatedGas] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      walletType = localStorage.getItem("wallet_type");
    } else {
    }
  }, []);

  const { web3Obj } = useContext(web3GlobalContext);

  useEffect(() => {
    if (walletAddress) {
      checkGodlBalance();
      checkPaxgBalance();
    }
  }, [web3Obj, walletAddress, paxgBalance, godlBalance]);

  const checkGodlBalance = async () => {
    let balance = await getTokenBalance(
      web3Obj,
      godlAbi,
      config.godlToken,
      walletAddress
    );
    console.log("balance", balance);
    let balanceInWei = [balance.toString()];
    let balanceInEth = await convertWeiToEth(balanceInWei);
    setGodlBalance(balanceInEth ? balanceInEth[0] : "");
  };

  const checkPaxgBalance = async () => {
    let balance = await getTokenBalance(
      web3Obj,
      paxgAbi,
      config.paxgTokenAddress,
      walletAddress
    );
    console.log("balance", balance);
    let balanceInWei = [balance.toString()];
    let balanceInEth = await convertWeiToEth(balanceInWei);
    setPaxgBalance(balanceInEth ? balanceInEth[0] : "");
  };

  const onApproveBuy = async () => {
    try {
      checkGodlBalance();
      checkPaxgBalance();
      setFreezeMintInput(true);
      setErrorText(false);
      setLoadingText(
        t(
          "tradeGodlPage.section1.button1.buttonCta_popup.popup_approve.buttonApproveOnClickResponse"
        )
      );
      let paxgCostInEth = [enterPaxgBalance ? paxgBalance : paxgDeposit];
      let paxgCostInWei = await convertEthToWei(paxgCostInEth);
      const paramObjApproval = {
        approvalAddress: config.godlToken,
        approvalAmount: paxgCostInWei[0],
      };
      const txReceiptApproval = await setApproval(
        web3Obj,
        paxgAbi,
        config.paxgTokenAddress,
        paramObjApproval,
        walletAddress
      );
      console.log("--txReceipt--", txReceiptApproval);
      setLoadingText("");
      setMintCTA("mint");
    } catch (error) {
      console.log("mint - ", error);

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
  const onMint = async () => {
    try {
      checkGodlBalance();
      checkPaxgBalance();
      setErrorText(false);

      setLoadingText(
        t(
          "tradeGodlPage.section1.button1.buttonCta_popup.popup_mint.buttonMintOnClickResponse"
        )
      );
      let paxgCostInEth = [enterPaxgBalance ? paxgBalance : paxgDeposit];

      let paxgCostInWei = await convertEthToWei(paxgCostInEth);
      setShowMintEstimatedGas(true);
      let mintGas = await mintGodlEstimatedGas(
        paxgCostInWei[0],
        web3Obj,
        walletAddress
      );
      let mintGasFeeInArray = [mintGas.toString()];
      let mintGasFeeInEth = await convertWeiToEth(mintGasFeeInArray);
      setMintEstimatedGas(mintGasFeeInEth[0]);
      let res = await mintGodl(paxgCostInWei[0], web3Obj, walletAddress);
      console.log("onMint res", res);
      if (res.status) {
        setLoadingText("");
        setMintCTA("minted");
        setPaxgDeposit("");
        setBuyPreviewScreen(false);
        console.log(res.events.AuriumTokenMinted.returnValues.value);
        let mintedGodlInWei = [res.events.AuriumTokenMinted.returnValues.value];
        let mintedGodlInEth = await convertWeiToEth(mintedGodlInWei);
        setGodlMintedBoolen(true);
        setGodlMinted(mintedGodlInEth);
        setMintTxHash(getEllipsisTxt(res.transactionHash, 8));
        setEtherscanLink(
          config.etherscan.concat(res.transactionHash)
          // `https://etherscan.io/tx/${res.transactionHash}`
        );
        console.log("___________", mintedGodlInEth);
        checkGodlBalance();
        checkPaxgBalance();
      }
    } catch (error) {
      console.log(" onMint- ", error);
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

  const onPreviewLook = async () => {
    try {
      setBuyPreviewScreen(true);
      const hTokenDetails = await getHTokenDetails(web3Obj);
      console.log("hTokenDetails", hTokenDetails);
      const valueInWei = [hTokenDetails.value];
      const valueInEth = await convertWeiToEth(valueInWei);
      console.log(valueInEth);
      setHTokenName(hTokenDetails.name);
      setHTokenSymbol(hTokenDetails.symbol);
      setValue(valueInEth[0]);
    } catch (error) {
      console.log(" onPreviewLook- ", error);
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

  const getHTokenMintAmountLogic = async function () {
    try {
      console.log(paxgDeposit);

      let valueInEth = [enterPaxgBalance ? paxgBalance : paxgDeposit];

      let valueInWei = await convertEthToWei(valueInEth);

      console.log(valueInWei[0]);

      const paramObj = {
        paxgAmount: valueInWei[0],
      };
      const hTokenMintAmount = await getHTokenMintAmount(web3Obj, paramObj);
      console.log(hTokenMintAmount);
      valueInWei = [hTokenMintAmount];
      valueInEth = await convertWeiToEth(valueInWei);

      setExpectedHTokenMint(valueInEth[0]);
    } catch (error) {
      console.log("Error in hToken |  getHTokenMintAmountLogic- ", error);
      return false;
    }
  };

  const onSellPreviewLook = async () => {
    try {
      setPreviewScreen(true);
      setFreezeBurnInput(true);
      // fetching expected PAXG amount

      let godlInEth = [enterGodlBalance ? godlBalance : godlToSell];
      console.log("__", godlInEth);

      let godlInWei = await convertEthToWei(godlInEth);
      console.log("__", godlInWei[0]);

      const paramObj = {
        godlToSell: godlInWei[0],
      };

      let paxgAmountsOut = await getPaxgGetAmount(web3Obj, paramObj);
      let paxgAmoutsOutArray = [paxgAmountsOut];
      let paxgAmountsOutInEth = await convertWeiToEth(paxgAmoutsOutArray);
      setExpectedPaxgReceived(paxgAmountsOutInEth[0]);
      //
      //
      // fetching GODL price
      const hTokenDetails = await getHTokenDetails(web3Obj);
      console.log("hTokenDetails", hTokenDetails);
      const valueInWei = [hTokenDetails.value];
      const valueInEth = await convertWeiToEth(valueInWei);
      // console.log(valueInEth);
      setValue(valueInEth[0]);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const onApproveSell = async () => {
    try {
      setBurnErrorText(false);
      setBurnLoadingText(
        t(
          "tradeGodlPage.section1.button1.buttonCta_popup.popup_approve.buttonApproveOnClickResponse"
        )
      );
      let godlToSellInEth = [enterGodlBalance ? godlBalance : godlToSell];
      let godlToSellInWei = await convertEthToWei(godlToSellInEth);
      const paramObjApproval = {
        approvalAddress: config.godlToken,
        approvalAmount: godlToSellInWei[0],
      };
      const txReceiptApproval = await setApproval(
        web3Obj,
        paxgAbi,
        config.godlToken,
        paramObjApproval,
        walletAddress
      );
      console.log("--txReceipt--", txReceiptApproval);
      setBurnLoadingText("");
      setBurnCTA("mint");
    } catch (error) {
      console.log("burn - ", error);
      if (error.code === 4001) {
        setBurnErrorText(true);
        setBurnLoadingText(
          "You have rejected the transaction. Kindly try again."
        );
      } else {
        setBurnErrorText(true);
        setBurnLoadingText("Error - Transaction Reverted. Please Try Again.");
      }
      return false;
    }
  };
  const closeMintPopup = async () => {
    setModal1Open(false);
    setLoadingText("");
    setBuyPreviewScreen(false);
    setBurnCTA("");
    setMintCTA("");
    setPaxgDeposit("");
    setGodlMintedBoolen(false);
    setPaxgBalance(null);
    SetEnterPaxgBalance(false);
    setFreezeMintInput(false);
  };
  const closeBurnPopup = async () => {
    setModal2Open(false);
    setBurnLoadingText("");
    setPreviewScreen(false);
    setBurnCTA("");
    setGodlToSell("");
    setMintCTA("");
    setGodlBurnedBoolen(false);
    setGodlBalance(null);
    SetEnterGodlBalance(false);
    setFreezeBurnInput(false);
  };

  const burnGodl = async () => {
    try {
      setBurnErrorText(false);
      setBurnLoadingText("Burn under progress...");
      let godlToSellInEth = [enterGodlBalance ? godlBalance : godlToSell];
      let godlToSellInWei = await convertEthToWei(godlToSellInEth);
      const paramObj = {
        approvalAmount: godlToSellInWei[0],
      };
      setShowBurnEstimatedGas(true);
      let burnRes = await burnHTokenEstimatedGas(
        web3Obj,
        paramObj,
        walletAddress
      );
      let burnResFeeInArray = [burnRes.toString()];
      let burnResFeeInEth = await convertWeiToEth(burnResFeeInArray);
      setBurnEstimatedGas(burnResFeeInEth[0]);
      let res = await burnHToken(web3Obj, paramObj, walletAddress);
      console.log("burnRes", res);
      if (res.status) {
        setBurnLoadingText("");
        setBurnCTA("minted");
        setGodlToSell("");
        console.log(res.events.AuriumTokenBurned.returnValues.value);
        let receivedPaxgInWei = [
          res.events.AuriumTokenBurned.returnValues.value,
        ];

        let receivedPaxgInEth = await convertWeiToEth(receivedPaxgInWei);
        setPaxgReceived(receivedPaxgInEth);

        setGodlBurnedBoolen(true);
        setBurnTxHash(getEllipsisTxt(res.transactionHash, 8));
        setEtherscanLink(
          config.etherscan.concat(res.transactionHash)
          // `https://etherscan.io/tx/${res.transactionHash}`
        );
        setPreviewScreen(false);
        checkGodlBalance();
        checkPaxgBalance();
      }
    } catch (error) {
      console.log(" onBurn- ", error);
      if (error.code === 4001) {
        setBurnErrorText(true);
        setBurnLoadingText(
          "You have rejected the transaction. Kindly try again."
        );
      } else {
        setBurnErrorText(true);
        setBurnLoadingText("Error - Transaction Reverted. Please Try Again.");
      }
      return false;
    }
  };

  const handleBuyWithUsdcButtonClick = async () => {
    window.open(
      "https://app.uniswap.org/#/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0x39D3dB3591E31f12AA395e935fC46b152242e137",
      "_blank"
    );
  };

  const handleSellForUsdcButtonClick = async () => {
    window.open(
      "https://app.uniswap.org/#/swap?inputCurrency=0x39D3dB3591E31f12AA395e935fC46b152242e137&outputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "_blank"
    );
  };

  return (
    <div>
      <div className="trade-sell">
        <div className="bs-cont">
          <IconContext.Provider
            value={{
              size: "5em",
              color: "#fff",
              className: "global-class-name",
            }}
          >
            <div style={{ marginRight: 8 }}>
              <GiGoldBar />
            </div>
          </IconContext.Provider>
          <div className="head">{t("tradeGodlPage.section1.heading")}</div>
          <div className="sub-head">
            {t("tradeGodlPage.section1.subHeading")}
          </div>
          <div className="desc">{t("tradeGodlPage.section1.para1")}</div>
          <div className="desc2">{t("tradeGodlPage.section1.para2")}</div>
          <div className="desc3">{t("tradeGodlPage.section1.para3")}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button className="btn-shade" onClick={() => setModal1Open(true)}>
              {t("tradeGodlPage.section1.button1.buttonText")}
            </button>
            <button className="btn" onClick={handleBuyWithUsdcButtonClick}>
              {" "}
              {t("tradeGodlPage.section1.button2Text")}
            </button>
          </div>
        </div>
        <div className="bs-cont">
          <IconContext.Provider
            value={{
              size: "5em",
              color: "#fff",
              className: "global-class-name",
            }}
          >
            <div style={{ marginRight: 8 }}>
              <GiGoldBar />
            </div>
          </IconContext.Provider>
          <div className="head">{t("tradeGodlPage.section2.heading")}</div>
          <div className="sub-head">
            {t("tradeGodlPage.section2.subHeading")}
          </div>
          <div className="desc">{t("tradeGodlPage.section2.para1")}</div>
          <div className="desc2">{t("tradeGodlPage.section2.para2")}</div>
          <div className="desc3">{t("tradeGodlPage.section2.para3")}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button className="btn-shade" onClick={() => setModal2Open(true)}>
              {" "}
              {t("tradeGodlPage.section2.button1.buttonText")}
            </button>
            <button className="btn" onClick={handleSellForUsdcButtonClick}>
              {t("tradeGodlPage.section2.button2Text")}
            </button>
          </div>
        </div>
      </div>

      <Modal
        className="popup-modal"
        title={t("tradeGodlPage.section1.button1.buttonCta_popup.heading")}
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={closeMintPopup}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div
          style={{
            margin: "25px auto 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center ",
            alignItems: "center",
          }}
        >
          <div className="sell-desc" style={{ marginBottom: 20 }}>
            {t(
              "tradeGodlPage.section1.button1.buttonCta_popup.popup_previewConversion.description"
            )}
          </div>
          {/* {walletAddress && 
          <div className="balance-tag" onClick={()=>SetEnterPaxgBalance(true)}>Balance: <span style={{fontWeight:500,marginLeft:3,marginRight:3}}>{" "} {Number(paxgBalance).toFixed(5)}</span>PAXG</div>} */}
          {!godlMintedBoolen && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="max-input"
            >
              <input
                placeholder={t(
                  "tradeGodlPage.section1.button1.buttonCta_popup.popup_previewConversion.inputBoxPlaceholder"
                )}
                className="modal-input2"
                style={{
                  width: "95%",
                  margin: "10px 10px 10px auto",
                  cursor: freezeMintInput ? "not-allowed" : "auto",
                }}
                onChange={(e) => setPaxgDeposit(e.target.value)}
                value={enterPaxgBalance ? paxgBalance : paxgDeposit}
                disabled={freezeMintInput ? true : false}
              />
              {freezeMintInput ? (
                <div className="balance-tag" style={{ cursor: "not-allowed" }}>
                  Max
                </div>
              ) : (
                <div
                  className="balance-tag"
                  onClick={() => SetEnterPaxgBalance(true)}
                >
                  Max
                </div>
              )}
            </div>
          )}
          {buyPreviewScreen && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div className="popup-text">Rate</div>
                <div className="popup-text2">
                  1 GODL= {Number(value).toFixed(5)} PAXG{" "}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div className="popup-text">You will Recieve</div>
                <div className="popup-text2">
                  {Number(expectedHTokenMint).toFixed(5)} {hTokenSymbol}
                </div>
              </div>
              {Number(paxgBalance) < Number(paxgDeposit) && (
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
            </div>
          )}
          {godlMintedBoolen && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div className="popup-text">You have minted</div>
                <div className="popup-text2">
                  {Number(godlMinted).toFixed(5)} GODL
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div className="popup-text">Transaction Hash: </div>
                <div className="popup-text2">
                  <a
                    href={etherscanLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      paddingTop: 15,
                      textDecoration: "underline",
                      color: "#fff",
                    }}
                  >
                    {mintTxHash}
                  </a>
                </div>
              </div>
            </div>
          )}
          {/*
                    Gas Estimation
                    {walletAddress && showMintEstimatedGas ? 
            <div>
             <div className="estimated-fee" style={{width:"95%",margin:'0 auto 15px  '}}>
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
                <div>
                  Estimated Gas Fees : {mintEstimatedGas} ETH 
                </div>
              </div>
            </div>
            :<div></div>} */}
          {walletAddress ? (
            <div>
              {mintCTA === "mint" ? (
                <button className="cta-large" onClick={() => onMint()}>
                  {" "}
                  {t(
                    "tradeGodlPage.section1.button1.buttonCta_popup.popup_mint.buttonMintText"
                  )}
                </button>
              ) : (
                <div>
                  {mintCTA === "minted" ? (
                    <div>
                      <div
                        className="cta-large"
                        style={{ marginBottom: 15, marginTop: 10 }}
                      >
                        {" "}
                        {t(
                          "tradeGodlPage.section1.button1.buttonCta_popup.popup_mint_success.buttonMintSuccessfulText"
                        )}
                      </div>
                      <div>
                        {" "}
                        <a
                          className="add-metamask"
                          style={{
                            paddingTop: 15,
                            textDecoration: "underline",
                            color: "#fff",
                          }}
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
                            "tradeGodlPage.section1.button1.buttonCta_popup.popup_mint_success.addTokenText"
                          )}
                        </a>{" "}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {buyPreviewScreen ? (
                        <div>
                          {Number(paxgBalance) < Number(paxgDeposit) ? (
                            <button
                              className="cta-large"
                              style={{ cursor: "not-allowed" }}
                            >
                              {" "}
                              {t(
                                "tradeGodlPage.section1.button1.buttonCta_popup.popup_approve.buttonApproveText"
                              )}
                            </button>
                          ) : (
                            <button
                              className="cta-large"
                              onClick={onApproveBuy}
                            >
                              {" "}
                              {t(
                                "tradeGodlPage.section1.button1.buttonCta_popup.popup_approve.buttonApproveText"
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          className="cta-large"
                          onClick={() => {
                            onPreviewLook();
                            getHTokenMintAmountLogic();
                          }}
                        >
                          {" "}
                          {t(
                            "tradeGodlPage.section1.button1.buttonCta_popup.popup_previewConversion.buttonText"
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
                    // marginBottom: 15,
                    textAlign: "center",
                  }}
                >
                  {loadingText}
                </div>
              )}
            </div>
          ) : (
            // <div className="count-desc">
            //   {" "}
            //   {t(
            //     "homePage.section1.button1CTA.popup_withoutWalletConnection.errorText"
            //   )}{" "}
            // </div>
            <ConnectWallet modalSize="compact" />
          )}
        </div>
      </Modal>
      <Modal
        className="popup-modal"
        title={t("tradeGodlPage.section2.button1.buttonCta_popup.heading")}
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={closeBurnPopup}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div
          style={{
            margin: "25px auto 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="sell-desc" style={{ marginBottom: 20 }}>
            {t(
              "tradeGodlPage.section2.button1.buttonCta_popup.popup_previewConversion.description"
            )}
          </div>
          {/* {walletAddress && 
          <div className="balance-tag" onClick={()=>SetEnterGodlBalance(true)}>Balance: <span style={{fontWeight:500,marginLeft:3,marginRight:3}}>{" "} {Number(godlBalance).toFixed(5)} </span>GODL</div>}
           */}
          {!godlBurnedBoolen && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="max-input"
            >
              <input
                placeholder={t(
                  "tradeGodlPage.section2.button1.buttonCta_popup.popup_previewConversion.inputBoxPlaceholder"
                )}
                className="modal-input2"
                style={{
                  width: "95%",
                  margin: "10px 10px 10px auto",
                  cursor: freezeBurnInput ? "not-allowed" : "auto",
                }}
                onChange={(e) => setGodlToSell(e.target.value)}
                value={enterGodlBalance ? godlBalance : godlToSell}
                disabled={freezeBurnInput ? true : false}
              />
              {freezeBurnInput ? (
                <div className="balance-tag" style={{ cursor: "not-allowed" }}>
                  Max
                </div>
              ) : (
                <div
                  className="balance-tag"
                  onClick={() => SetEnterGodlBalance(true)}
                >
                  Max
                </div>
              )}
            </div>
          )}

          {previewScreen && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div className="popup-text">Rate</div>
                <div className="popup-text2">
                  1 GODL= {Number(value).toFixed(5)} PAXG{" "}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  // marginBottom: 15,
                }}
              >
                <div className="popup-text">You will Recieve</div>
                <div className="popup-text2">
                  {Number(expectedPaxgReceived).toFixed(5)} PAXG{" "}
                </div>
              </div>
              {Number(godlBalance) < Number(godlToSell) && (
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
                    Your account has insufficient GODL balance. Kindly please
                    check your account.{" "}
                  </div>
                </div>
              )}
            </div>
          )}
          {godlBurnedBoolen && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div className="popup-text">You have Burnt</div>
                <div className="popup-text2">
                  {Number(paxgReceived).toFixed(5)} GODL
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div className="popup-text">Transaction Hash: </div>
                <div className="popup-text2">
                  <a
                    href={etherscanLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      paddingTop: 15,
                      textDecoration: "underline",
                      color: "#fff",
                    }}
                  >
                    {burnTxHash}
                  </a>
                </div>
              </div>
            </div>
          )}
          

          {walletAddress ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {burnCTA === "mint" ? (
                <button className="cta-large" onClick={() => burnGodl()}>
                  {" "}
                  Burn GODL
                </button>
              ) : (
                <div>
                  {burnCTA === "minted" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="cta-large"
                        style={{ marginBottom: 15, marginTop: 10 }}
                      >
                        {" "}
                        {t(
                          "tradeGodlPage.section2.button1.buttonCta_popup.popup_burn_success.buttonMintSuccessfulText"
                        )}
                      </div>
                      <div>
                        {" "}
                        <a
                          className="add-metamask"
                          style={{
                            paddingTop: 15,
                            textDecoration: "underline",
                            color: "#fff",
                          }}
                          onClick={() =>
                            AddCustomToken(
                              config.paxgTokenAddress,
                              "PAXG",
                              18,
                              "https://etherscan.io/token/images/paxosgold_32.png",
                              web3Obj
                            )
                          }
                        >
                          {" "}
                          {t(
                            "tradeGodlPage.section1.button1.buttonCta_popup.popup_mint_success.addTokenText"
                          )}
                        </a>{" "}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {previewScreen ? (
                        <div>
                          {Number(godlBalance) < Number(godlToSell) ? (
                            <button
                              className="cta-large"
                              style={{ cursor: "not-allowed" }}
                            >
                              {t(
                                "tradeGodlPage.section1.button1.buttonCta_popup.popup_approve.buttonApproveText"
                              )}
                            </button>
                          ) : (
                            <button
                              className="cta-large"
                              onClick={onApproveSell}
                            >
                              {t(
                                "tradeGodlPage.section1.button1.buttonCta_popup.popup_approve.buttonApproveText"
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          className="cta-large"
                          onClick={() => onSellPreviewLook()}
                        >
                          {" "}
                          {t(
                            "tradeGodlPage.section2.button1.buttonCta_popup.popup_previewConversion.buttonText"
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {burnLoadingText && (
                <div
                  className="godl-price"
                  style={{
                    color: errorText ? "#ff3333" : "#fff",
                    marginTop: 15,
                    // marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {burnLoadingText}
                </div>
              )}
            </div>
          ) : (
            // <div className="count-desc">
            //   {t(
            //     "homePage.section1.button1CTA.popup_withoutWalletConnection.errorText"
            //   )}{" "}
            // </div>
            <ConnectWallet modalSize="compact" />
          )}
        </div>
      </Modal>
    </div>
  );
};

TradeGODL.getInitialProps = async (ctx) => {
  return {};
};
export default TradeGODL;
