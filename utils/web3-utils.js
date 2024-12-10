import Web3 from 'web3'; 


export const switchBlockchain = async function (chainId) {
    try { 
        if (typeof window.ethereum === "undefined") return;
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
    } catch (error) {
        console.log('Error in wallet-utils | switchBlockchain - ', error);
        return;
    }
}