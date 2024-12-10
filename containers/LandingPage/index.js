import React, { useEffect } from "react";
import { useContext } from "react";
import TopStrip from "../TopStrip/TopStrip";
import Navbar from "../Navbar/navbar";
import { HomeScreen } from "./HomeScreen/homeScreen";
import { AboutScreen } from "./AboutScreen/About";
import { web3GlobalContext } from "../../context/global-context";
import Footer from "../Footer/footer";
import dynamic from "next/dynamic";

export default function HomePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { showGif, setShowGif } = useContext(web3GlobalContext);
  return (
    <div>
      {showGif && (
        <div className="show-cont" onClick={() => setShowGif(false)}>
          <div className="overlayColor"></div>
        </div>
      )}

      <div className="bg-color">
        <TopStrip />
        <Navbar />
        <HomeScreen />
        <AboutScreen />
        <Footer />
      </div>
    </div>
  );
}
