import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { createWeb3Object } from "../services/web3-services";
import config from "../config";
import Web3 from "web3";
var web3Defaultobj;
import { useSigner, useAddress, useChain } from "@thirdweb-dev/react";

export const web3GlobalContext = createContext({});

export function Web3Global({ children }) {
  const connectedWalletAddress = useAddress();
  const chain = useChain();
  let GlobalChainId = chain?.chainId;
  const signer = useSigner();
  const [walletAddress, setWalletAddress] = useState(null);
  const [chainGlobal, setChainGlobal] = useState("");
  const [web3Obj, setWeb3Obj] = useState();
  const [pauseUnPauseState, setPauseUnPauseState] = useState();
  const [paxGodlValue, setPaxgoldValue] = useState();
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [isAccChange, setIsAccChange] = useState(false);
  const [isAccDisconnect, setIsAccDisconnect] = useState(false);
  const [walletType, setWalletType] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [trustDisclaimer, setTrustDisclaimer] = useState(false)



  useLayoutEffect(() => {
    if (connectedWalletAddress) {
      let web3 = new Web3(window.ethereum);
      setWeb3Obj(web3);
      if (signer?.provider?.connection?.url === "eip-1193:") {
        setTrustDisclaimer(true)
      }
    }

  }, [connectedWalletAddress]);

  useEffect(() => {
    if (!connectedWalletAddress) {
      setTrustDisclaimer(false)
    }
  }, [connectedWalletAddress])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (acc) => {
        setWalletAddress(acc[0]);
        setIsAccChange(true);
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      //
      window.ethereum.on("disconnect", () => {
        web3Defaultobj = createWeb3Object();
        setWeb3Obj(web3Defaultobj);
        console.log("disconnected");
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("networkChanged", function (networkId) {
        setChainGlobal(networkId);
      });
    }
  }, []);

  useEffect(() => {
    if (Number(GlobalChainId) === Number(config.defaultNetwork)) {
      setIsCorrectNetwork(true);
    } else {
      setIsCorrectNetwork(false);
      // setPauseUnPauseState(true);
    }
  }, [GlobalChainId]);

  return (
    <web3GlobalContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        chainGlobal,
        setChainGlobal,

        web3Obj,
        setWeb3Obj,
        pauseUnPauseState,
        setPauseUnPauseState,
        paxGodlValue,
        setPaxgoldValue,
        isCorrectNetwork,
        setIsCorrectNetwork,
        isAccChange,
        setIsAccChange,
        isAccDisconnect,
        setIsAccDisconnect,
        walletType,
        setWalletType,
        existingUser,
        setExistingUser,
        showGif,
        setShowGif,
        trustDisclaimer, setTrustDisclaimer
      }}
    >
      {children}
    </web3GlobalContext.Provider>
  );
}
