import React, { useState, useEffect, useContext } from "react";
import i18n from "../../i18n";
import { web3GlobalContext } from "../../context/global-context";
import { getHTokenDetails } from "../../services/godlWeb3";
import { convertWeiToEth } from "../../services/web3-services";
import useWindowSize from "../../utils/windowSize";
//
import axios from "axios";
import { GiGoldBar } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdOutlineLanguage } from "react-icons/md";
import { Modal } from "antd";
import Gif from "../../assets/icons/giphy.gif"
import dynamic from "next/dynamic";

let paxgGoldValue;
let UsdcGoldValue;

 const TopStrip = () => {
  const windowSize = useWindowSize();

  const [modal2Open, setModal2Open] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [paxgValue, setPaxgValue] = useState();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [state, setState] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
  });
  const { showGif, web3Obj, setPaxgoldValue ,existingUser} =
    useContext(web3GlobalContext);

  const changeLanguage = (lng) => {
    setCurrentLanguage(lng);
    console.log("i18n link1=> ", i18n.t("navbar.link1"));
    i18n.changeLanguage(lng);
    console.log("i18n arabic  => ", i18n.t("navbar.link1"));

    setModal2Open(false);
    console.log("changing language");
  };

useEffect(()=>{
if(showGif){
  window.scrollTo(0, 0); 
  document.getElementById("paxgValue").style.color = "#f9d461";
  document.getElementById("paxgValue").style.fontWeight = 600;
  setTimeout(() => {
    document.getElementById("paxgValue").style.color = "#fff";
    document.getElementById("paxgValue").style.fontWeight = 400;
  }, 900);
  fetchPAXGPrice()
}
},[showGif])

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setState({
          ...state,
          ip: data.ip,
          countryName: data.country_name,
          countryCode: data.country_calling_code,
          city: data.city,
          timezone: data.timezone,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPAXGPriceInUSD = async () => {
    try {
      let response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=USD"
      );
      paxgGoldValue = response.data["pax-gold"].usd;
      setPaxgoldValue(response.data["pax-gold"].usd);
    } catch (e) {
      console.error("error", e);
      return false;
    }
  };

  const fetchPAXGPrice = async () => {
    try {
      const hTokenDetails = await getHTokenDetails(web3Obj);
      console.log("hTokenDetails",hTokenDetails)
      const valueInWei = [hTokenDetails.value];
      const   valueInEth = await convertWeiToEth(valueInWei);
      let paxgValueInMu =  (valueInEth[0] * 1000000)
      // console.log("paxgValueInMu" ,paxgValueInMu)
      // console.log("paxgValueInETH" ,valueInEth[0])
      // console.log("valueInWei",valueInWei);
      setPaxgValue(paxgValueInMu);
      UsdcGoldValue = paxgGoldValue * Number(valueInEth[0]);
      console.log("UsdcGoldValue", UsdcGoldValue);
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  useEffect(() => {
    getGeoInfo();
    fetchPAXGPriceInUSD();
    setInterval(fetchPAXGPriceInUSD, 60000);
  }, []);

  useEffect(() => {
    if (web3Obj) {
      fetchPAXGPrice();
    }
  }, [web3Obj,existingUser,setPaxgoldValue]);

  const translationClick = () => {
    setModal2Open(false);
  };
  return (
    <div>
      <div className={showGif ?  "top-strip-nosticky":"top-strip"}>

        <div className="strip-data">
          <div
            style={{
              display: "flex",
              alignItems: windowSize.width <= 960 ? "" : "center",
            }}
          >
            <IconContext.Provider
              value={{
                size: "1.2em",
                color: "#f9d461",
                className: "global-class-name",
              }}
            >
              <div style={{ marginRight: 8 }}>
                <GiGoldBar />
              </div>
            </IconContext.Provider>
            {/* {walletAddress ?  
            <div className="godl-price"> 1 GODL : {Number(paxgValue).toFixed(3)}PAXG | {paxgGoldValue}USDC</div>
            :
            } */}

            {windowSize.width <= 960 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  className="godl-price"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: 5,
                  }}
                  onClick={() => setShowPrice(!showPrice)}
                >
                  <div> 1 PAXG : {paxgGoldValue} USDC</div>{" "}
                  {showPrice ? (
                    <IconContext.Provider
                      value={{
                        size: "1.4em",
                        color: "#f9d461",
                        className: "global-class-name",
                      }}
                    >
                      <div
                        style={{ marginLeft: 8, cursor: "pointer" }}
                        onClick={() => setShowPrice(false)}
                      >
                        <MdKeyboardArrowUp />
                      </div>
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{
                        size: "1.4em",
                        color: "#f9d461",
                        className: "global-class-name",
                      }}
                    >
                      <div
                        style={{ marginLeft: 8, cursor: "pointer" }}
                        onClick={() => setShowPrice(true)}
                      >
                        <MdKeyboardArrowDown />
                      </div>
                    </IconContext.Provider>
                  )}
                </div>
                {showPrice && (
                  <div>
                    {paxgValue && (
                      <div className="godl-price" id="paxgValue" style={{  }} >
                        {" "}
                        1 GODL : {Number(paxgValue).toFixed(3)} μPAXG{" "}
                      </div>
                    )}
                    {UsdcGoldValue && (
                      <div className="godl-price">
                        {" "}
                        1 GODL : {Number(UsdcGoldValue).toFixed(3)} USDC
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div  style={{ display: "flex" }}>
                <div className="godl-price" style={{ marginRight: 8 }}>
                  {" "}
                  1 PAXG : {paxgGoldValue} USDC
                </div>
                {paxgValue && (
                  <div style={{ marginRight: 8 }} className="godl-price">
                    {" "}
                    |{" "}
                  </div>
                )}
                {paxgValue && (
                  <div className="godl-price" id="paxgValue" style={{ }}>
                    {" "}
                    1 GODL : 	{Number(paxgValue).toFixed(3)} μPAXG{" "}
                  </div>
                )}
                {UsdcGoldValue && (
                  <div style={{ marginRight: 8 }} className="godl-price">
                    {" "}
                    |{" "}
                  </div>
                )}
                {UsdcGoldValue && (
                  <div className="godl-price" style={{ marginRight: 8 }}>
                    {" "}
                    1 GODL : {Number(UsdcGoldValue).toFixed(3)} USDC
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={{ display: "flex" }} onClick={() => setModal2Open(true)}>
            <div
              className="godl-price"
              style={{ fontSize: 14, cursor: "pointer", color: "#f9d461" }}
            >
              {state.countryName}
            </div>
            <IconContext.Provider
              value={{
                size: "1em",
                color: "#f9d461",
                className: "global-class-name",
              }}
            >
              <div style={{ marginLeft: 8, cursor: "pointer" }}>
                <MdOutlineLanguage />
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <Modal
        className="popup-modal"
        title="Join and Earn"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="lang-cont ">
          <div
            className="language"
            onClick={() => {
              changeLanguage("ar");
            }}
            style={{ color: currentLanguage === "ar" ? "#ecc51f" : "#fff" }}
          >
            Arabic
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("bn");
            }}
            style={{ color: currentLanguage === "bn" ? "#ecc51f" : "#fff" }}
          >
            Bengali
          </div>

          <div
            className="language"
            onClick={() => changeLanguage("zh")}
            style={{ color: currentLanguage === "zh" ? "#ecc51f" : "#fff" }}
          >
            Chinese Simplified
          </div>
          {/* <div
            className="language"
            onClick={() => {
              changeLanguage("zh");
            }}
            style={{ color: currentLanguage === "zh" ? "#ecc51f" : "#fff" }}
          >
            Chinese Traditional
          </div> */}

          <div
            className="language"
            onClick={() => {
              changeLanguage("nl");
            }}
            style={{ color: currentLanguage === "nl" ? "#ecc51f" : "#fff" }}
          >
            Dutch
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("en");
            }}
            style={{ color: currentLanguage === "en" ? "#ecc51f" : "#fff" }}
          >
            English
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("fil");
            }}
            style={{ color: currentLanguage === "fil" ? "#ecc51f" : "#fff" }}
          >
            Filipino
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("fr");
            }}
            style={{ color: currentLanguage === "fr" ? "#ecc51f" : "#fff" }}
          >
          French
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("de");
            }}
            style={{ color: currentLanguage === "de" ? "#ecc51f" : "#fff" }}
          >
            German
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("ha");
            }}
            style={{ color: currentLanguage === "ha" ? "#ecc51f" : "#fff" }}
          >
            Hausa
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("hi");
            }}
            style={{ color: currentLanguage === "hi" ? "#ecc51f" : "#fff" }}
          >
            Hindi
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("hu");
            }}
            style={{ color: currentLanguage === "hu" ? "#ecc51f" : "#fff" }}
          >
            Hungarian
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("id");
            }}
            style={{ color: currentLanguage === "id" ? "#ecc51f" : "#fff" }}
          >
            Indonesian
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("it");
            }}
            style={{ color: currentLanguage === "it" ? "#ecc51f" : "#fff" }}
          >
            Italian
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("ja");
            }}
            style={{ color: currentLanguage === "ja" ? "#ecc51f" : "#fff" }}
          >
            Japanese
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("ko");
            }}
            style={{ color: currentLanguage === "ko" ? "#ecc51f" : "#fff" }}
          >
            Korean
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("pt");
            }}
            style={{ color: currentLanguage === "pt" ? "#ecc51f" : "#fff" }}
          >
            Portuguese
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("ru");
            }}
            style={{ color: currentLanguage === "ru" ? "#ecc51f" : "#fff" }}
          >
            Russian
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("es");
            }}
            style={{ color: currentLanguage === "es" ? "#ecc51f" : "#fff" }}
          >
            Spanish
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("sw");
            }}
            style={{ color: currentLanguage === "sw" ? "#ecc51f" : "#fff" }}
          >
            Swahili
          </div>

          <div
            className="language"
            onClick={() => {
              changeLanguage("th");
            }}
            style={{ color: currentLanguage === "th" ? "#ecc51f" : "#fff" }}
          >
            Thai
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("tr");
            }}
            style={{ color: currentLanguage === "tr" ? "#ecc51f" : "#fff" }}
          >
            Turkish
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("uk");
            }}
            style={{ color: currentLanguage === "uk" ? "#ecc51f" : "#fff" }}
          >
            Ukrainian
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("ur");
            }}
            style={{ color: currentLanguage === "ur" ? "#ecc51f" : "#fff" }}
          >
            Urdu
          </div>
          <div
            className="language"
            onClick={() => {
              changeLanguage("vi");
            }}
            style={{ color: currentLanguage === "vi" ? "#ecc51f" : "#fff" }}
          >
            Vietnamese
          </div>
        </div>
      </Modal>
    </div>
  );
};
 
TopStrip.getInitialProps = async (ctx) => {
  return {};
};
export default TopStrip