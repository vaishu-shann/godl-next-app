import React from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { images } from "../../../assets/images";

export   const AboutScreen = () => {
  const { t } = useTranslation();

  return (
    <div>
    <div style={{marginTop:100}} />
      <div className="about-sec1">
        <img src={images.Bull.src} alt="About" className="about-img1" />
        <div className="about-desc">
          <div className="gradient-bar" />
          <div className="home-title"> {t("homePage.section3.heading")}</div>
          <div className="About-description">
            {t("homePage.section3.para1")}{" "}
            {t("homePage.section3.para2")}
          </div>
        </div>
      </div>
      <div className="about-sec2">
        <div className="about-desc">
          <div className="gradient-bar" />
          <div className="home-title">{t("homePage.section4.heading")}</div>
          <div className="About-description">
          {t("homePage.section4.para1")}
          </div>
        </div>
        <img src={images.Coin.src} alt="About" className="about-img2" />
      </div>
      <div className="about-sec1">
        <img src={images.Rocket.src} alt="About" className="about-img3" />
        <div className="about-desc">
          <div className="gradient-bar" />
          <div className="home-title">{t("homePage.section5.heading")}</div>
          <div className="About-description">
          {t("homePage.section5.para1")}
          </div>
        </div>
      </div>
    </div>
  );
};

