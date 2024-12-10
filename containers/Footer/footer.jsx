import React, { useContext } from "react";
import { BiArrowToTop } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useTranslation } from "react-i18next";
import { AddCustomToken } from "../../services/addCustomToken";
import config from "../../config";
import { web3GlobalContext } from "../../context/global-context";
import dynamic from "next/dynamic";
import { images } from "../../assets/images";

function Footer(props) {
  const { t } = useTranslation();

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { web3Obj } = useContext(web3GlobalContext);
  return (
    <div className="footer-cont">
      <div className="top-sec">
        <div className="social-icons"></div>
        <div className="back-top" onClick={backToTop}>
          <IconContext.Provider
            value={{
              size: "1.2em",
              color: "#f8f7f3",
              className: "global-class-name",
            }}
          >
            <div className="top-icon">
              <BiArrowToTop />
            </div>
          </IconContext.Provider>
          <div className="text">Back to Top</div>
        </div>
      </div>
      <div className="b-bottom" />
      <div className="routes-section">
        <div className="left">
          <div className="power-by">
            <div className="heading">
              <div className="text">{t("footer.heading")}</div>
            </div>
            <div className="sub-text">{t("footer.para1")}</div>
            <div className="network-state">
              <div
                className="add-network"
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
                <img src={images.PaxgCoin.src} alt="" className="f-meta-icon" />
                <div className="f-add-text">{t("footer.button1")} </div>
              </div>
              <div
                className="add-network"
                onClick={() =>
                  AddCustomToken(config.godlToken, "GODL", 18, "", web3Obj)
                }
              >
                <img src={images.LogoImage.src} alt="" className="f-meta-icon" />
                <div className="f-add-text">{t("footer.button2")} </div>
              </div>
              <div
                className="add-network"
                onClick={() =>
                  AddCustomToken(
                    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "USDC",
                    6,
                    "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
                    web3Obj
                  )
                }
              >
                <img src={images.UsdcCoin.src} alt="" className="f-meta-icon" />
                <div className="f-add-text">{t("footer.button3")} </div>
              </div>
            </div>
          </div>
          {/* <img src={Map} alt="" className="map-img" /> */}
        </div>

        <div className="f-route">
          <div className="route-head">{t("footer.linkSection1.heading")} </div>
          <ul>
            <li>
              <a href="https://discord.gg/bYj4aDAM" target="_blank">
                {t("footer.linkSection1.link2")}
              </a>
            </li>
            <li>
              <a href="https://twitter.com/GODLToken" target="_blank">
                {t("footer.linkSection1.link3")}
              </a>
            </li>

            <li>
              {" "}
              <a
                href="https://www.linkedin.com/company/godltoken/"
                target="_blank"
              >
                {" "}
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://t.me/godl_en" target="_blank">
                {t("footer.linkSection1.link1")}
              </a>
            </li>
            <li>
              {" "}
              <a href="https://medium.com/@godltoken" target="_blank">
                Medium
              </a>
            </li>
            <li>
              {" "}
              <a href="https://www.youtube.com/@GODLGold" target="_blank">
                {" "}
                {t("footer.linkSection1.link4")}
              </a>
            </li>
          </ul>
        </div>
        <div className="f-route">
          <div className="route-head"> {t("footer.linkSection2.heading")}</div>
          <ul>
            <li>
              <a href="https://metamask.io/ " target="_blank">
                {t("footer.linkSection2.link1")}
              </a>
            </li>
            <li>
              {" "}
              <a href="https://trustwallet.com/" target="_blank">
                {t("footer.linkSection2.link2")}
              </a>
            </li>
            <li>
              <a href="https://walletconnect.com/" target="_blank">
                {t("footer.linkSection2.link3")}
              </a>
            </li>
          </ul>
        </div>
        <div className="f-route">
          <div className="route-head"> {t("footer.linkSection3.heading")}</div>
          <ul>
            <li>
              <a
                href="https://app.uniswap.org/#/swap?inputCurrency=0x45804880de22913dafe09f4980848ece6ecbaf78&outputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                target="_blank"
              >
                {t("footer.linkSection3.link1")}
              </a>
            </li>
            <li>
              {" "}
              <a
                href="https://app.uniswap.org/#/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=ETH"
                target="_blank"
              >
                {t("footer.linkSection3.link2")}
              </a>
            </li>
            <li>
              <a
                href="https://etherscan.io/token/0x45804880De22913dAFE09f4980848ECE6EcbAf78/"
                target="_blank"
              >
                {t("footer.linkSection3.link3")}
              </a>
            </li>
            <li>
              <a
                href="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                target="_blank"
              >
                {t("footer.linkSection3.link4")}
              </a>
            </li>
            <li>
              <a
                href="https://etherscan.io/address/0x39D3dB3591E31f12AA395e935fC46b152242e137"
                target="_blank"
              >
                {t("footer.linkSection3.link5")}
              </a>
            </li>
          </ul>
        </div>

        <div className="f-route">
          <div className="route-head">{t("footer.linkSection4.heading")}</div>
          <ul>
            <li>
              <a
                href="https://www.dextools.io/app/en/ether/pair-explorer/0x25f8Ef1a9B928a33a0B87F05B91795119B38Db79"
                target="_blank"
              >
                {t("footer.linkSection4.link1")}
              </a>
            </li>

            <li>
              {" "}
              <a href=" https://paxos.com/" target="_blank">
                {t("footer.linkSection4.link2")}
              </a>
            </li>
            <a
              href="https://ipfs.io/ipfs/bafybeibyrczt2lylus3cuvypwi2i2zbxnhgcrm6s4rx632jfaapesienny/GODL%20Gold%20-%20White%20Paper%20v1.1.pdf"
              target="_blank"
            >
              <li>{t("footer.linkSection4.link3")}</li>
            </a>
            {/* <li>Coin Market Cap</li> */}
            {/* <li>Coin Gecko </li> */}
          </ul>
        </div>
      </div>
      <div style={{ marginTop: 15 }} />
      <div className="b-bottom" />
      <div style={{ marginBottom: 10 }} />

      <div className="copyRights">
        <div className="sub-text">{t("footer.copyrightText")}</div>
        {/* <div className="sub-text">support@godl.com</div> */}
      </div>
      <div style={{ marginBottom: 10 }} />
    </div>
  );
}

Footer.getInitialProps = async (ctx) => {
  return {};
};
export default Footer

