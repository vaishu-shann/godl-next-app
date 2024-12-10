import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Tooltip } from "antd";
import useWindowSize from "../../utils/windowSize";
import { IconContext } from "react-icons";
import { web3GlobalContext } from "../../context/global-context";
import { existingUserStatus, getAdmin, paused } from "../../services/godlWeb3";
import { switchBlockchain } from "../../utils/web3-utils";
import {
  convertToChecksum,
  createWeb3Object,
} from "../../services/web3-services";
import config from "../../config";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {useAddress, useChain } from "@thirdweb-dev/react";
import { images } from "../../assets/images";
let walletType;
let Pathname;


import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "@thirdweb-dev/react";

import { createWallet } from "@thirdweb-dev/wallets";

const client = createThirdwebClient({
  clientId: "....",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("com.trustwallet.app"),
  createWallet("com.bitget.web3"),
  createWallet("com.okex.wallet"),
  createWallet("com.binance"),
  createWallet("org.uniswap"),
];

export default function Navbar(props) {
  const walletAddress = useAddress();
  const chain = useChain();
  const chainGlobal = chain?.chainId;
  const { t } = useTranslation();
  const router = useRouter();
  const windowSize = useWindowSize();
  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);

  const [adminStatus, setAdminStatus] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const {
    trustDisclaimer,
    setChainGlobal,
    setAuthToken,
    web3Obj,
    pauseUnPauseState,
    setPauseUnPauseState,
    isCorrectNetwork,
    isAccChange,
    setIsAccChange,
    isAccDisconnect,
    existingUser,
    setExistingUser,
  } = useContext(web3GlobalContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      walletType = localStorage.getItem("wallet_type");
    } else {
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined" && walletAddress) {
      localStorage.setItem("publicAddress", walletAddress);
    } else {
    }
  }, [walletAddress]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Pathname = window.location.pathname;
    } else {
      console.log("You are on the server,Cannot execute");
    }
  }, []);

  const adminValidation = async () => {
    let adminAddress = await getAdmin(web3Obj);
    console.log("adminAddress", adminAddress);
    let AdminAddr = await convertToChecksum(adminAddress);
    if (walletAddress === AdminAddr) {
      setAdminStatus(true);
    }
  };

  const checkExistingUser = async () => {
    try {
      if (web3Obj) {
        let isExists = await existingUserStatus(walletAddress, web3Obj);
        setExistingUser(isExists);
        console.log("isExists", isExists);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    if (walletAddress) {
      if (!isAccDisconnect) {
        setShowWalletAddress(true);
      } else {
        setShowWalletAddress(false);
      }
    }
  }, [walletAddress, web3Obj]);

  useEffect(() => {
    if (walletAddress && isAccChange) {
      router.push("/");
      setIsAccChange(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (walletAddress && isCorrectNetwork) {
      adminValidation();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (walletAddress && isCorrectNetwork) {
      // checkExistingUser();
      pauseUnpauseStatus();
    }
  }, [web3Obj, walletAddress, chainGlobal]);
  useEffect(() => {
    if (walletAddress) {
      checkExistingUser();
    }
  }, [web3Obj, walletAddress, chainGlobal]);

  const pauseUnpauseStatus = async () => {
    let pauseUnpauseRes = await paused(web3Obj);
    setPauseUnPauseState(pauseUnpauseRes);
  };

  const switchBlockchainLogic = async () => {
    try {
      await switchBlockchain(config.defaultNetwork);
      setChainGlobal(config.defaultNetwork);
    } catch (error) {
      console.log("Error in switchBlockchainLogic", error);
      return false;
    }
  };

  return (
    <div className="nav-cont">
      <div className="nav-routes">
        <img
          src={images.LogoImage.src}
          alt=" "
          className="logo-img"
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        />
        <div className="routes">
          {walletAddress && adminStatus ? (
            <ul className={click ? "nav-menu active slide-in" : "nav-list"} id="slider">
              <li
                className={Pathname == "/" ? "nav-list-active" : ""}
                onClick={() => router.push("/")}
              >
                {t("navbar.link1")}
              </li>

              <li
                className={Pathname == "/user-lookup" ? "nav-list-active" : ""}
                onClick={() => router.push("/user-lookup")}
              >
                {t("navbar.link2")}
              </li>

              {walletAddress && (
                <div>
                  {existingUser ? (
                    <li
                      className={
                        Pathname == "/user-profile" ? "nav-list-active" : ""
                      }
                      onClick={() => router.push("/user-profile")}
                    >
                      {t("navbar.link3")}
                    </li>
                  ) : (
                    <Tooltip
                      title={t("navbar.link3OnHover")}
                      placement="bottom"
                    >
                      <li
                        className={
                          Pathname == "/user-profile" ? "nav-list-active" : ""
                        }
                      >
                        {t("navbar.link3")}
                      </li>
                    </Tooltip>
                  )}
                </div>
              )}
              <li
                className={Pathname == "/trade-godl" ? "nav-list-active" : ""}
                onClick={() => router.push("/trade-godl")}
              >
                {t("navbar.link4")}
              </li>
              <li
                className={Pathname == "/admin" ? "nav-list-active" : ""}
                onClick={() => router.push("/admin")}
              >
                {t("navbar.link5")}
              </li>
            </ul>
          ) : (
            <ul className={click ? "nav-menu active slide-in" : "nav-list"}  id="slider">
              <li
                className={Pathname == "/" ? "nav-list-active" : ""}
                onClick={() => router.push("/")}
              >
                {t("navbar.link1")}
              </li>

              <li
                className={Pathname == "/user-lookup" ? "nav-list-active" : ""}
                onClick={() => router.push("/user-lookup")}
              >
                {t("navbar.link2")}
              </li>
              {walletAddress && (
                <div>
                  {existingUser ? (
                    <li
                      className={
                        Pathname == "/user-profile" ? "nav-list-active" : ""
                      }
                      onClick={() => router.push("/user-profile")}
                    >
                      {t("navbar.link3")}
                    </li>
                  ) : (
                    <Tooltip
                      title={t("navbar.link3OnHover")}
                      placement="bottom"
                    >
                      <li
                        className={
                          Pathname == "/user-profile" ? "nav-list-active" : ""
                        }
                      >
                        {t("navbar.link3")}
                      </li>
                    </Tooltip>
                  )}
                </div>
              )}
              <li
                className={Pathname == "/trade-godl" ? "nav-list-active" : ""}
                onClick={() => router.push("/trade-godl")}
              >
                {t("navbar.link4")}
              </li>
            </ul>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <ConnectWallet/> */}
          {/* <ConnectWallet theme="dark" modalSize="compact" /> */}

          <ConnectButton
      client={client}
      wallets={wallets}
      connectModal={{ size: "compact" }}
    />

          {windowSize.width <= 960 && (
            <div onClick={handleClick}>
              {click ? (
                <IconContext.Provider
                  value={{
                    size: "1.2em",
                    color: "#f9d461",
                    className: "global-class-name",
                  }}
                >
                  <div style={{ marginLeft: 15, cursor: "pointer" }}>
                    <MdOutlineClose />
                  </div>
                </IconContext.Provider>
              ) : (
                <IconContext.Provider
                  value={{
                    size: "1.2em",
                    color: "#f9d461",
                    className: "global-class-name",
                  }}
                >
                  <div style={{ marginLeft: 15, cursor: "pointer" }}>
                    : <GiHamburgerMenu />
                  </div>
                </IconContext.Provider>
              )}
            </div>
          )}
        </div>
      </div>
      {walletAddress && Number(chainGlobal) != Number(config.defaultNetwork) ? (
        <div className="chain-strip">
          <div
            className="change-chain-text"
            onClick={() => switchBlockchainLogic(config.defaultNetwork)}
          >
            You're connected to a wrong network. Kindly connect to{" "}
            <span className="chainUnderline"> {config.networkname} </span>{" "}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {Number(chainGlobal) === Number(config.defaultNetwork) &&
      pauseUnPauseState &&
      walletAddress ? (
        <div className="chain-strip">
          <div className="change-chain-text">
            Smart Contract is in pause state. We will be right back.
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {trustDisclaimer && (
        <div className="chain-strip">
          <div className="change-chain-text">
          Kindly please open this app in trustwallet browser for trustwallet transactions.
          </div>
        </div>
      )}
    </div>
  );
}
