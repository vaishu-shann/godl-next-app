import React, { useState, useEffect } from "react";
import Layout from "../app-components/layout";
import "../styles/globalStyle.css";
import "../styles/_web3modal.css";
import "../styles/about.css";
import "../styles/account.css";
import "../styles/admin.css";
import "../styles/explore.css";
import "../styles/footer.css";
import "../styles/graph.css";
import "../styles/home.css";
import "../styles/homePage.css";
import "../styles/navbar.css";
import "../styles/networkTable.css";
import "../styles/profilePage.css";
import "../styles/strip.css";
import "../styles/trade.css";
import { Web3Global } from "../context/global-context";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";



function App({ Component, pageProps }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <>
      {isClient ? (
<>
          {" "}
          <Web3Global>
            <I18nextProvider i18n={i18n}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </I18nextProvider>
          </Web3Global>
  </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
