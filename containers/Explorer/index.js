import React, { useEffect } from "react";
// import TopStrip from "../TopStrip/TopStrip";
import Navbar from "../Navbar/navbar";
import Explorer from "./LineExplorer/Explore";
import Footer from "../Footer/footer";


 const UserLookup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* <TopStrip /> */}
      <div className="bg-color">
        <Navbar />
        <Explorer />
     
        <Footer />
      </div>
    </div>
  );
};

UserLookup.getInitialProps = async (ctx) => {
  return {};
};
export default UserLookup
