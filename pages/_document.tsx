import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default class StyleDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    // You can fetch the dynamic logo here, e.g., using an API or server-side logic
    const dynamicLogoUrl =
      "https://gateway.pinata.cloud/ipfs/QmWyRX78hzFHK3fbyVpFmWEBXSsBAcoYr9uNQ4nsuKRrSs?_gl=1*ogasyy*_ga*MTQyNTA5NTc2MC4xNjkwOTc2ODQ1*_ga_5RMPXG14TE*MTY5MDk4MDI0My4yLjEuMTY5MDk4MDQ2MS42MC4wLjA";
    return { ...initialProps, dynamicLogoUrl };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
