export const AddCustomToken = async (
  token_address,
  token_symbol,
  token_decimals,
  token_image,
  web3Obj
) => {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    if (window.ethereum === undefined) {
      return;
    }
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: token_address, // The address that the token is at.
          symbol: token_symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: token_decimals, // The number of decimals in the token
          image: token_image, // A string url of the token logo
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
