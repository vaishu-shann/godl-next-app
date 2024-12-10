// import React, { useState, useEffect, useContext } from "react";
// import "./wallet.css";
// import { web3GlobalContext } from "../../context/global-context";
// import { useTranslation } from "react-i18next";
// import getLinker from "../../utils/deepLink";
// import { createWeb3Object } from "../../services/web3-services";
// import Web3Modal from "web3modal";
// import Web3 from "web3";
// import { Modal, Tooltip } from "antd";
// import { getEllipsisTxt } from "../../utils/formatter";
// import Metamask from "../../assets/images/metamask.png";
// import TrustWallet from "../../assets/images/trustwallet.png";
// import mobileCheck from "../../utils/mobileCheck";
// import { IconContext } from "react-icons";
// import copy from "copy-to-clipboard";
// import { MdContentCopy } from "react-icons/md";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import config from "../../config";
// // import { useWeb3Modal } from '@web3modal/wagmi/react'

// function ConnectWallet(props) {
//   // const { open } = useWeb3Modal()
//   const { t } = useTranslation();
//   const [modal1Open, setModal1Open] = useState(false);
//   const [modal2Open, setModal2Open] = useState(false);
//   const [showWalletAddress, setShowWalletAddress] = useState(false);
//   const [web3Modal, setWeb3Modal] = useState(null);
//   const [copied, setCopied] = useState(false);

//   let walletType;
//   walletType = localStorage.getItem("wallet_type");
//   const {
//     walletAddress,
//     setWalletAddress,
//     setChainGlobal,
//     setAuthToken,
//     web3Obj,
//     setWeb3Obj,
//     setProvider,
//     isAccDisconnect,
//   } = useContext(web3GlobalContext);
//   useEffect(() => {
//     const providerOptions = {
//       walletconnect: {
//         package: WalletConnectProvider,
//         options: {
//           appName: "GODL gold",
//           rpc: {
//             1: config.rpcUrl,
//           },
//           defaultNetwork: 1,
//           chainId: 1,
//           appLogo:
//             "https://ipfs.io/ipfs/QmSwFFsDB688RVvr39PmShRQ1jPNN7daHaP6N5UHNvUG1x?filename=GODL%20Logo.png",
//         },
//       },
//     };

//     const newWeb3Modal = new Web3Modal({
//       cacheProvider: true,
//       disableInjectedProvider: true,
//       providerOptions,
//     });

//     setWeb3Modal(newWeb3Modal);
//   }, []);
//   useEffect(() => {
//     if (walletAddress) {
//       if (!isAccDisconnect) {
//         setShowWalletAddress(true);
//       } else {
//         setShowWalletAddress(false);
//       }
//     }
//   }, [walletAddress, web3Obj]);
//   const copyToClipboard = () => {
//     document.getElementById("wallet-address").style.color = "#f9d461";
//     document.getElementById("wallet-address").style.fontWeight = 600;
//     setTimeout(() => {
//       document.getElementById("wallet-address").style.color = "#fff";
//       document.getElementById("wallet-address").style.fontWeight = 400;
//     }, 250);

//     setCopied(true);
//     copy(walletAddress);
//   };
//   useEffect(() => {
//     if (isAccDisconnect) {
//       diconnectWallet();
//     }
//   }, [walletAddress, isAccDisconnect]);

//   const diconnectWallet = async () => {
//     setShowWalletAddress(false);
//     let web3Defaultobj = await createWeb3Object();
//     setWeb3Obj(web3Defaultobj);
//     localStorage.clear();
//     setModal1Open(false);
//     setWeb3Obj("");
//     setWalletAddress(null);
//   };
//   const connectWallet = async () => {
//     try {
//       const provider = await web3Modal.connect();
//       await web3Modal.toggleModal();
//       const web3 = new Web3(provider);
//       setWeb3Obj(web3);
//       setProvider(provider);
//       const network = await web3.eth.getChainId();
//       setChainGlobal(network);
//       const accounts = await web3.eth.getAccounts();
//       localStorage.setItem("wallet_type", "trustwallet");
//       if (accounts) {
//         const publicAddress = Web3.utils.toChecksumAddress(accounts[0]);
//         setWalletAddress(publicAddress);
//       }
//       setModal2Open(false);
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   };

//   const metamaskHandler = async () => {
//     const yourWebUrl = window.location.href; // Replace with your website domain
//     const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`;
//     const downloadMetamaskUrl = "https://metamask.io/download.html";

//     if (window.ethereum) {
//       await connectMetamask();
//     } else if (mobileCheck()) {
//       const linker = getLinker(downloadMetamaskUrl);
//       linker.openURL(deepLink);
//     } else {
//       alert("Please Install Metamask!!!");
//     }
//   };

//   const connectMetamask = async () => {
//     try {
//       // setWalletType("metamask")
//       setProvider(window.ethereum);
//       setWeb3Obj(new Web3(window.ethereum));
//       const networkId = await window.ethereum.request({
//         method: "net_version",
//       });
//       setChainGlobal(networkId);
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       const publicAddress = Web3.utils.toChecksumAddress(accounts[0]);
//       setWalletAddress(publicAddress);
//       localStorage.setItem("wallet_type", "metamask");
//       setModal2Open(false);
//     } catch (e) {
//       console.error(e);

//       return;
//     }
//   };
//   return (
//     <div>
//       <w3m-button />
//       {!showWalletAddress ? (
//         <button className="cnt-wallet" onClick={() => setModal2Open(true)}>
//           {t("navbar.connectWalletButton")}
//         </button>
//       ) : (
//         <button className="cnt-wallet" onClick={() => setModal1Open(true)}>
//           {getEllipsisTxt(walletAddress, 6)}
//         </button>
//       )}

//       <Modal
//         className="popup-modal"
//         title="Connect your wallet"
//         centered
//         open={modal2Open}
//         onOk={() => setModal2Open(false)}
//         onCancel={() => setModal2Open(false)}
//         okButtonProps={{ style: { display: "none" } }}
//         cancelButtonProps={{ style: { display: "none" } }}
//       >
//         <div style={{ margin: "50px auto 25px" }} className="cnt-wlt">
//           <div>
//             <img
//               src={Metamask}
//               alt=""
//               className="w-icon"
//               onClick={metamaskHandler}
//             />
//             <div style={{ color: "#fff", textAlign: "center" }}>Metamask</div>
//           </div>
//           <div>
//             <img
//               src={TrustWallet}
//               alt=""
//               className="w-icon"
//               onClick={connectWallet}
//             />
//             <div style={{ color: "#fff", textAlign: "center" }}>
//               TrustWallet
//             </div>
//           </div>
//         </div>
//       </Modal>
//       <Modal
//         className="popup-modal"
//         title=""
//         centered
//         open={modal1Open}
//         onOk={() => setModal1Open(false)}
//         onCancel={() => setModal1Open(false)}
//         okButtonProps={{ style: { display: "none" } }}
//         cancelButtonProps={{ style: { display: "none" } }}
//       >
//         <div
//           style={{
//             margin: "30px auto 25px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               color: "#f9d461",
//               textAlign: "center",
//               fontSize: 22,
//               fontWeight: 500,
//             }}
//           >
//             {walletType === "metamask" && "Connected with Metamask"}
//             {walletType === "trustwallet" && "Connected with Trustwallet"}
//           </div>
//           <div style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
//             {walletType === "metamask" && (
//               <img
//                 src={Metamask}
//                 alt=""
//                 style={{ width: 35, height: 35, marginRight: 15 }}
//               />
//             )}
//             {walletType === "trustwallet" && (
//               <img
//                 src={TrustWallet}
//                 alt=""
//                 style={{ width: 35, height: 35, marginRight: 15 }}
//               />
//             )}
//             <div
//               id="wallet-address"
//               style={{
//                 color: "#fff",
//                 textAlign: "center",
//                 fontSize: 16,
//                 marginRight: 10,
//                 letterSpacing: 1,
//               }}
//             >
//               {getEllipsisTxt(walletAddress, 8)}
//             </div>

//             <IconContext.Provider
//               value={{
//                 size: "1.4em",
//                 color: "gray",
//                 className: "global-class-name",
//               }}
//             >
//               <div
//                 style={{ marginLeft: 8, marginTop: 10, cursor: "pointer" }}
//                 className="copy-icon"
//                 onClick={() => {
//                   copyToClipboard();
//                 }}
//               >
//                 <MdContentCopy />
//               </div>
//             </IconContext.Provider>
//           </div>
//           <button className="disconnect-btn" onClick={diconnectWallet}>
//             Disconnect
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default ConnectWallet;
