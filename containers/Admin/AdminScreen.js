import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { IconContext } from "react-icons";
import { CiTrash } from "react-icons/ci";
import { Modal } from "antd";
import { useContext } from "react";

import useWindowSize from "../../utils/windowSize";
import {
  addUserInTopline,
  getFeeReceiver,
  getToplineCount,
  getTotalRewardsGenerated,
  getTotalRewardsReinvested,
  getTotalUsers,
  pause,
  paused,
  setFeeReceiver,
  transferOwnership,
  unpause,
} from "../../services/godlWeb3";
import { web3GlobalContext } from "../../context/global-context";
import { convertWeiToEth } from "../../services/web3-services";
import { useRouter } from "next/router";
import { ConnectWallet, useAddress, useChain } from "@thirdweb-dev/react";

var totalReward;
var totalReInvested;


 const AdminScreen = () => {
  const walletAddress = useAddress();
  const chain = useChain();
  const chainGlobal = chain?.chainId;
  const router = useRouter()
  const [loadingText, setLoadingText] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newFeeReceiverAddress, setNewFeeReceiverAddress] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [getToplineUser, setGetToplineUser] = useState("");
  const windowSize = useWindowSize();
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [pauseBoolen, setPauseBoolen] = useState(false);
  const [pauseUnpauseText, setPauseUnPause] = useState("");
  const [pauseErrorText, setPauseErrorText] = useState(false);
  const [feeReceiverloadingText, setFeeReceiverLoadingText] = useState("");
  const [feeReceiverAddr, setFeeReceiverAddr] = useState("");

  const {  web3Obj, setPauseUnPauseState } =
    useContext(web3GlobalContext);

  const totalUser = async () => {
    let userCount = await getTotalUsers(web3Obj);
    setTotalUsers(userCount);
  };
  const getTopline = async () => {
    let toplineUsers = await getToplineCount(web3Obj);
    setGetToplineUser(toplineUsers);
  };
  const getTotalReward = async () => {
    let resReward = await getTotalRewardsGenerated(web3Obj);
    let resRewardInWei = [resReward.toString()];
    let resRewardInEth = await convertWeiToEth(resRewardInWei);
    totalReward = resRewardInEth[0];
  };
  const getTotalReinvested = async () => {
    let resReInvested = await getTotalRewardsReinvested(web3Obj);
    let resReinvestedInWei = [resReInvested.toString()];
    let resReinvestedInEth = await convertWeiToEth(resReinvestedInWei);
    totalReInvested = resReinvestedInEth[0];
  };

  useEffect(() => {
    if (walletAddress) {
      totalUser();
      getTotalReward();
      getTotalReinvested();
      getTopline();
      pauseUnpauseStatus();
      feereceiverAddress();
    } else {
      router.push("/");
    }
  }, [walletAddress]);

  const feereceiverAddress = async () => {
    try {
      let resFeeReceiver = await getFeeReceiver(web3Obj);
      console.log("****", resFeeReceiver);
      setFeeReceiverAddr(resFeeReceiver);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const pauseUnpauseStatus = async () => {
    let pauseUnpauseRes = await paused(web3Obj);
    setPauseBoolen(pauseUnpauseRes);
    setPauseUnPauseState(pauseUnpauseRes);
  };
  const pauseUnPause = async () => {
    try {
      setPauseErrorText(false);
      let pauseUnpauseRes = await paused(web3Obj);
      if (!pauseUnpauseRes) {
        setPauseUnPause("Pausing in progress..");

        let pauseRes = await pause(web3Obj,walletAddress);
        if (pauseRes.status) {
          setPauseBoolen(true);
          setPauseUnPause("Successfully Paused.");
        }
      } else {
        setPauseUnPause("Unpausing in progress..");

        let unpauseRes = await unpause(web3Obj,walletAddress);
        if (unpauseRes.status) {
          setPauseBoolen(false);
          setPauseUnPause("Successfully Unpause.");
        }
      }
    } catch (error) {
      console.log("pausing", error);
      if (error.code === 4001) {
        setPauseErrorText(true);
        setPauseUnPause("You have rejected the transaction. Kindly try again.");
      } else {
        setPauseErrorText(true);
        setPauseUnPause("Error - Transaction Reverted. Please Try Again.");
      }
      return false;
    }
  };

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.type] = event.target.value;
    setFormFields(data);
  };

  const submit = async (e) => {
    try {
      setLoadingText("Tx under progress ... ");
      e.preventDefault();
      console.log(formFields);
      let addressArray = formFields.map((a) => a.text);
      console.log("result", addressArray);
      // setModal2Open(false)

      let res = await addUserInTopline(addressArray, web3Obj,walletAddress);

      console.log("res submit", res);
      if (res.status) {
        setLoadingText("Added to whitelist succesfully ");
        await getTopline();
      }
    } catch (error) {
      console.log("Error in factory | whitelisting - ", error);
      setLoadingText("");
      return false;
    }
  };

  const addFields = () => {
    let object = {};
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };
  const transferOwner = async () => {
    try {
      setLoadingText("Tx under progress ... ");
      let ownerRes = await transferOwnership(newAddress, web3Obj,walletAddress);
      console.log("transferOwner", ownerRes);
      if (ownerRes.status) {
        setLoadingText("Transferred Successfully ");
      }
    } catch (error) {
      console.log("Error in factory | transferOwner - ", error);
      setLoadingText("");
      return false;
    }
  };

  const feeReciever = async () => {
    try {
      setFeeReceiverLoadingText("Tx under progress");
      let feeRes = await setFeeReceiver(newFeeReceiverAddress, web3Obj,walletAddress);

      console.log("feeRes", feeRes);
      if (feeRes.status) {
        setModal3Open(false);
        setLoadingText("");
        setFeeReceiverAddr(
          feeRes.events.UpdateFeeReceiver.returnValues.newFeeReciever
        );
      }
    } catch (error) {
      console.log(error, "error");
      return false;
    }
  };

  return (
    <div>
      <div className="user-data">
        <div className="gradient-bar" />
        <div className="prof-header">Statistics</div>
        <div className="a-user-stats">
          <div className="a-ring">
            <div className="ring-status" style={{ left: "43%" }}>
              <CountUp end={getToplineUser} duration={3} />
            </div>
            <div className="stats-desc">Topline Proportion</div>
          </div>

          <div className="a-ring">
            <div style={{ left: "42%" }} className="ring-status">
              <CountUp end={totalUsers ? totalUsers : "-"} duration={3} />
            </div>

            <div className="stats-desc">Total Users</div>
          </div>
          <div className="a-ring">
            <div style={{ left: "23%" }} className="ring-status">
              <CountUp
                end={totalReward ? totalReward : "-"}
                duration={3}
                decimals={3}
              />
            </div>
            <div className="stats-desc">Total Rewards (PAXG)</div>
          </div>
          <div className="a-ring">
            <div style={{ left: "23%" }} className="ring-status">
              <CountUp
                end={totalReInvested ? totalReInvested : "-"}
                duration={3}
                decimals={3}
              />
            </div>
            {/* </div>
            </div> */}
            <div className="stats-desc">Total PAXG Reinvested (PAXG)</div>
          </div>
        </div>
        <div className="gradient-bar" />
        <div className="prof-header">Deposit Tiers</div>
        <div className="reinvest-desc">
          In the GODL Gold Network, we understand the importance of flexibility
          and adaptability. That's why we've designed a system that allows for
          modifications to tier costs and rewards - but only by the
          administrative team. The Deposit Tiers feature is a powerful tool that
          lets us tweak the parameters defining each tier's entry cost and the
          rewards it yields. This function helps us maintain a balanced and
          prosperous ecosystem, aligning the network's growth potential with
          market dynamics. Rest assured, these adjustments are made thoughtfully
          and always with an aim to enhance the experience and rewards for all
          our ambassadors.
        </div>
        <div className="a-tb">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{windowSize.width <= 960 ? "L1" : "Level 1"}</th>
                <th>{windowSize.width <= 960 ? "L2" : "Level 2"}</th>
                <th>{windowSize.width <= 960 ? "L3" : "Level 3"}</th>
                <th>{windowSize.width <= 960 ? "L4" : "Level 4"}</th>
                <th>{windowSize.width <= 960 ? "L5" : "Level 5"}</th>
                <th>{windowSize.width <= 960 ? "L6" : "Level 6"}</th>
                <th>{windowSize.width <= 960 ? "L7" : "Level 7"}</th>
                <th>{windowSize.width <= 960 ? "L8" : "Level 8"}</th>
                <th>{windowSize.width <= 960 ? "L9" : "Level 9"}</th>
                <th>{windowSize.width <= 960 ? "L10" : "Level 10"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    color: "#fbdb5d",
                    fontWeight: 600,
                    fontSize: windowSize.width <= 960 ? "12px" : "16px",
                  }}
                >
                  Price(PAXG)
                </td>
                <td>0.010</td>
                <td>0.025</td>
                <td>0.050</td>
                <td>0.10</td>
                <td>0.50</td>
                <td>1.50</td>
                <td>2.00</td>
                <td>3.00</td>
                <td>4.00</td>
                <td>5.00</td>
              </tr>
              <tr>
                <td
                  style={{
                    color: "#fbdb5d",
                    fontWeight: 600,
                    fontSize: windowSize.width <= 960 ? "12px" : "16px",
                  }}
                >
                  Reward %
                </td>
                <td>10</td>
                <td>9</td>
                <td>8</td>
                <td>7</td>
                <td>6</td>
                <td>5</td>
                <td>4</td>
                <td>3</td>
                <td>2</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gradient-bar" />
        <div className="prof-header">Pause / Unpause</div>
        <div className="reinvest-desc">
          At GODL Gold, we're committed to ensuring the smooth operation of our
          network. To achieve this, we've developed a Pause / Unpause feature,
          accessible only to our administrative wallet. This feature allows us
          to temporarily halt or resume all transactions within the network.
          It's a necessary tool to enable network maintenance, troubleshoot
          issues, or safeguard the network in case of emergencies. Remember,
          this feature is used judiciously and always with the best interest of
          the network and its participants in mind. Through proactive measures
          like these, we're able to protect, maintain, and optimize the GODL
          Gold experience for everyone.
        </div>
        <div className="toggle">
          {/* <div className='toggle-desc'>You can Re-invest by turn on the re-invest button
                    </div>
                    <Switch theme="default" className="d-flex" enabled={enabled} /> */}
          <button className="cnt-wallet" onClick={pauseUnPause}>
            {pauseBoolen ? "UnPause" : "Pause"}
          </button>
          <div
            className="godl-price"
            style={{
              color: pauseErrorText ? "#ff3333" : "#ecc51f",
              marginTop: 15,
            }}
          >
            {pauseUnpauseText}
          </div>
        </div>

        <div style={{ marginTop: 50 }} />
        <div className="gradient-bar" />
        <div className="prof-header">Whitelist</div>
        <div className="reinvest-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempor incididunt ut labore et dolo re magna aliqua. Ut enim.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempor incididunt ut labore et dolo re magna aliqua. Ut enim.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempory.
        </div>
        <div style={{ marginTop: 20 }} />

        <button className="cta-large" onClick={() => setModal2Open(true)}>
          + Add To Whitelist{" "}
        </button>
        <div style={{ marginTop: 50 }} />
        <div className="gradient-bar" />
        <div className="prof-header">Fee Receiver</div>
        <div className="reinvest-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempor incididunt ut labore et dolo re magna aliqua. Ut enim.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempor incididunt ut labore et dolo re magna aliqua. Ut enim.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempory.
        </div>
        <div style={{ marginTop: 20 }} />
        <div className="reinvest-desc">
          The Current Fee Receiver address is : {feeReceiverAddr}
        </div>
        <div style={{ marginTop: 20 }} />

        <button className="cta-large" onClick={() => setModal3Open(true)}>
          {" "}
          Set Fee Receiver{" "}
        </button>
        <div style={{ marginTop: 50 }} />
        <div className="gradient-bar" />
        <div className="prof-header">Ownership</div>
        <div className="reinvest-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempor incididunt ut labore et dolo re magna aliqua. Ut enim.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempor incididunt ut labore et dolo re magna aliqua. Ut enim.Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod
          tempory.
        </div>
        <div style={{ marginTop: 20 }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="cta-large" onClick={() => setModal1Open(true)}>
            {" "}
            Transfer Ownership{" "}
          </button>
          <button className="cta-large"> Renounce Ownership</button>
        </div>
      </div>

      <Modal
        className="popup-modal"
        title="Add to Whitelist"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div>
          <form onSubmit={submit}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px 0",
              }}
            >
              <div className="w-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d
                eiusmod tempor incididunt ut labore et dolo re magna aliqua.{" "}
              </div>
            </div>
            {formFields.map((form, index) => {
              return (
                <div>
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      name=""
                      placeholder="Enter wallet address"
                      onChange={(event) => handleFormChange(event, index)}
                      // value={form.type}
                      className="modal-input"
                      disabled={walletAddress ? false : true}
                      style={{
                        cursor: walletAddress ? "auto" : "not-allowed",
                      }}
                    />

                    <IconContext.Provider
                      value={{
                        size: "1.2em",
                        color: "#fff",
                        className: "global-class-name",
                      }}
                    >
                      <div
                        onClick={() => removeFields(index)}
                        style={{ margin: "0 20px", cursor: "pointer" }}
                      >
                        <CiTrash />
                      </div>
                    </IconContext.Provider>
                  </div>
                </div>
              );
            })}
          </form>
          {walletAddress ? (
            <div>
              <div className="whitelist-cta">
                <div onClick={addFields}>
                  <button className="w-cta"> Add More..</button>
                </div>
                <div onClick={submit}>
                  <button className="w-cta">Add Whitelist</button>{" "}
                </div>
              </div>
              <div className="godl-price" style={{ marginTop: 15 }}>
                {loadingText}
              </div>
            </div>
          ) : (
            <div className="count-desc">Please Connect to your Wallet. </div>
          )}
        </div>
      </Modal>

      <Modal
        className="popup-modal"
        title="Transfer Ownership"
        centered
        open={modal1Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div>
          <div style={{ margin: "25px auto" }}>
            <div className="sell-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </div>
            <div style={{ marginBottom: 20 }} />
            <input
              placeholder={"Enter new owner address"}
              className="modal-input"
              style={{ cursor: walletAddress ? "auto" : "not-allowed" }}
              disabled={walletAddress ? false : true}
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <div style={{ marginBottom: 20 }} />

            {walletAddress ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                }}
              >
                <button className="cnt-wallet" onClick={() => transferOwner()}>
                  Transfer
                </button>
                <div className="godl-price" style={{ marginTop: 15 }}>
                  {loadingText}
                </div>
              </div>
            ) : (
              <div>
                <div className="count-desc">
                  Please Connect to your Wallet.{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        className="popup-modal"
        title="Fee Reciever"
        centered
        open={modal3Open}
        onOk={() => setModal3Open(false)}
        onCancel={() => setModal3Open(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div>
          <div style={{ margin: "25px auto" }}>
            <div className="sell-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </div>

            <div style={{ marginBottom: 20 }} />
            <input
              placeholder={"Enter wallet address"}
              className="modal-input"
              style={{ cursor: walletAddress ? "auto" : "not-allowed" }}
              disabled={walletAddress ? false : true}
              onChange={(e) => setNewFeeReceiverAddress(e.target.value)}
            />
            <div style={{ marginBottom: 20 }} />

            {walletAddress ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                }}
              >
                <button className="cta-large" onClick={() => feeReciever()}>
                  Set Fee Receiver
                </button>
                <div className="godl-price" style={{ marginTop: 15 }}>
                  {feeReceiverloadingText}
                </div>
              </div>
            ) : (
              <div>
                <div className="count-desc">
                  Please Connect to your Wallet.{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
 
AdminScreen.getInitialProps = async (ctx) => {
  return {};
};
export default AdminScreen