import React, { useEffect } from "react";
import TopStrip from "../TopStrip/TopStrip";
import Navbar from "../Navbar/navbar";
import TradeGODL from "./TradeGODL";
import Footer from "../Footer/footer";
import dynamic from "next/dynamic";

const Trade = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <TopStrip />
      <div className="bg-color">
        <Navbar />
        <TradeGODL />
        <Footer />
      </div>
    </div>
  );
};

Trade.getInitialProps = async (ctx) => {
  return {};
};
export default Trade;
