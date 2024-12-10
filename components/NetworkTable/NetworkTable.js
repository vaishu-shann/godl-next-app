import React, { useState } from "react";
import useWindowSize from "../../utils/windowSize"
import { getEllipsisTxt } from "../../utils/formatter";
import { MdContentCopy } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { CgLoadbarDoc } from "react-icons/cg";
import { IconContext } from "react-icons";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import config from "../../config";
import { useRouter } from "next/router";


export const NetworkGraph = (referralStats) => {
  const { t } = useTranslation();
  console.log("referralStats", referralStats);
  const windowSize = useWindowSize();
  const router = useRouter()
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");

  const copyToClipboard = (address) => {
    setTooltipText("Copied");
    copy(address);
    setTimeout(() => {
      setTooltipText("Copy to clipboard");
    }, 1000);
  };

  const lookupSearch = (address) => {
    window.open(
      config.etherscanAddress.concat(address),
      "_blank"
    );
  };

  let maxValue = Math.max(
    referralStats?.referralStats?.level1Referrals?.length,
    referralStats?.referralStats?.level2Referrals?.length,
    referralStats?.referralStats?.level3Referrals?.length,
    referralStats?.referralStats?.level4Referrals?.length,
    referralStats?.referralStats?.level5Referrals?.length
  );
  return (
    <div>
      <div className="network-table">
        <div className="table-flex">
          {referralStats?.referralStats?.level1Referrals.length != 0 && (
            <table>
              <thead>
                <tr>
                  {" "}
                  <th>{windowSize.width <= 960 ? "L1" : "Level 1"}</th>
                </tr>
              </thead>
              <tbody>
                {referralStats?.referralStats?.level1Referrals?.map(
                  (address, index) => {
                    return (
                      <div>
                        <tr>
                          <td>
                            <div className="table-address">
                              <div id="l1-address">
                                {" "}
                                {getEllipsisTxt(address, 6)}{" "}
                              </div>
                              <div className="icons-cont">
                                <IconContext.Provider
                                  value={{
                                    size: "1.2em",
                                    color: "gray",
                                    className: "global-class-name",
                                  
                                  }}
                                >
                                  <div
                                    style={{
                                      marginLeft: 5,
                                     
                                      cursor: "pointer",
                                    }}
                                    onClick={() => lookupSearch(address)}
                                  >
                                    <CgLoadbarDoc />
                                  </div>
                                </IconContext.Provider>

                                <IconContext.Provider
                                  value={{
                                    size: "1.1em",
                                    color: "gray",
                                    className: "global-class-name",
                                  }}
                                >
                                  <Tooltip title={tooltipText} placement="top">
                                    <div
                                      style={{
                                        marginLeft: 5,
                                        cursor: "pointer",
                                      }}
                                      onClick={() => copyToClipboard(address)}
                                    >
                                      <MdContentCopy />
                                    </div>
                                  </Tooltip>
                                </IconContext.Provider>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </div>
                    );
                  }
                )}
                {Array(
                  maxValue -
                    referralStats?.referralStats?.level1Referrals?.length
                )
                  .fill("")
                  .map(() => {
                    return (
                      <div>
                        <tr>
                          <td></td>
                        </tr>
                      </div>
                    );
                  })}
              </tbody>
            </table>
          )}
          {referralStats?.referralStats?.level2Referrals.length != 0 && (
            <table>
              <thead>
                <tr>
                  {" "}
                  <th>{windowSize.width <= 960 ? "L2" : "Level 2"}</th>
                </tr>
              </thead>
              <tbody>
                {referralStats?.referralStats?.level2Referrals?.map(
                  (address, index) => {
                    return (
                      <div>
                        <tr>
                          <td>
                            <div className="table-address">
                              <div id="l2-address">
                                {" "}
                                {getEllipsisTxt(address, 6)}{" "}
                              </div>
                              <div className="icons-cont">
                                <IconContext.Provider
                                  value={{
                                    size: "1.2em",
                                    color: "gray",
                                    className: "global-class-name",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginLeft: 5,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => lookupSearch(address)}
                                  >
                                    <CgLoadbarDoc />
                                  </div>
                                </IconContext.Provider>

                                <IconContext.Provider
                                  value={{
                                    size: "1.1em",
                                    color: "gray",
                                    className: "global-class-name",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginLeft: 5,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => copyToClipboard(address)}
                                  >
                                    <MdContentCopy />
                                  </div>
                                </IconContext.Provider>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </div>
                    );
                  }
                )}
                {Array(
                  maxValue -
                    referralStats?.referralStats?.level2Referrals?.length
                )
                  .fill("")
                  .map(() => {
                    return (
                      <div>
                        <tr>
                          <td></td>
                        </tr>
                      </div>
                    );
                  })}
              </tbody>
            </table>
          )}
          {referralStats?.referralStats?.level3Referrals.length != 0 && (
            <table>
              <thead>
                <tr>
                  {" "}
                  <th>{windowSize.width <= 960 ? "L3" : "Level 3"}</th>
                </tr>
              </thead>
              <tbody>
                {referralStats.referralStats.level3Referrals?.map(
                  (address, index) => {
                    return (
                      <div>
                        <tr>
                          <td>
                            <div className="table-address">
                              <div id="l3-address">
                                {" "}
                                {getEllipsisTxt(address, 6)}{" "}
                              </div>
                              <div className="icons-cont">
                                <IconContext.Provider
                                  value={{
                                    size: "1.2em",
                                    color: "gray",
                                    className: "global-class-name",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginLeft: 5,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => lookupSearch(address)}
                                  >
                                    <CgLoadbarDoc />
                                  </div>
                                </IconContext.Provider>

                                <IconContext.Provider
                                  value={{
                                    size: "1.1em",
                                    color: "gray",
                                    className: "global-class-name",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginLeft: 5,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => copyToClipboard(address)}
                                  >
                                    <MdContentCopy />
                                  </div>
                                </IconContext.Provider>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </div>
                    );
                  }
                )}
                {Array(
                  maxValue -
                    referralStats?.referralStats?.level3Referrals?.length
                )
                  .fill("")
                  .map(() => {
                    return (
                      <div>
                        <tr>
                          <td></td>
                        </tr>
                      </div>
                    );
                  })}
              </tbody>
            </table>
          )}
          {referralStats?.referralStats?.level4Referrals.length != 0 && (
            <table>
              <thead>
                <tr>
                  {" "}
                  <th>{windowSize.width <= 960 ? "L4" : "Level 4"}</th>
                </tr>
              </thead>
              <tbody>
                {referralStats.referralStats.level4Referrals?.map(
                  (address, index) => {
                    return (
                      <tr>
                        <td>
                          <div className="table-address">
                            <div id="l4-address">
                              {" "}
                              {getEllipsisTxt(address, 6)}{" "}
                            </div>
                            <div className="icons-cont">
                              <IconContext.Provider
                                value={{
                                  size: "1.2em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => lookupSearch(address)}
                                >
                                  <CgLoadbarDoc />
                                </div>
                              </IconContext.Provider>

                              <IconContext.Provider
                                value={{
                                  size: "1.1em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => copyToClipboard(address)}
                                >
                                  <MdContentCopy />
                                </div>
                              </IconContext.Provider>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
                {Array(
                  maxValue -
                    referralStats?.referralStats?.level4Referrals?.length
                )
                  .fill("")
                  .map(() => {
                    return (
                      <div>
                        <tr>
                          <td></td>
                        </tr>
                      </div>
                    );
                  })}
              </tbody>
            </table>
          )}
          {referralStats?.referralStats?.level5Referrals.length != 0 && (
            <table>
              <thead>
                <tr>
                  {" "}
                  <th>{windowSize.width <= 960 ? "L5" : "Level 5"}</th>
                </tr>
              </thead>
              <tbody>
                {referralStats.referralStats.level5Referrals?.map(
                  (address, index) => {
                    return (
                      <tr>
                        <td>
                          <div className="table-address">
                            <div id="l5-address">
                              {" "}
                              {getEllipsisTxt(address, 6)}{" "}
                            </div>
                            <div className="icons-cont">
                              <IconContext.Provider
                                value={{
                                  size: "1.2em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => lookupSearch(address)}
                                >
                                  <CgLoadbarDoc />
                                </div>
                              </IconContext.Provider>

                              <IconContext.Provider
                                value={{
                                  size: "1.1em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => copyToClipboard(address)}
                                >
                                  <MdContentCopy />
                                </div>
                              </IconContext.Provider>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
                {Array(
                  maxValue -
                    referralStats?.referralStats?.level5Referrals?.length
                )
                  .fill("")
                  .map(() => {
                    return (
                      <div>
                        <tr>
                          <td></td>
                        </tr>
                      </div>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
        <div className="table-flex">
        {referralStats?.referralStats?.level6Referrals.length != 0 && (
          <table>
            <thead>
              <tr>
                {" "}
                <th>{windowSize.width <= 960 ? "L6" : "Level 6"}</th>
              </tr>
            </thead>
            <tbody>
              {referralStats?.referralStats?.level6Referrals?.map(
                (address, index) => {
                  return (
                    <div>
                      <tr>
                        <td>
                          <div className="table-address">
                            <div id="l1-address">
                              {" "}
                              {getEllipsisTxt(address, 6)}{" "}
                            </div>
                            <div className="icons-cont">
                              <IconContext.Provider
                                value={{
                                  size: "1.2em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => lookupSearch(address)}
                                >
                                  <CgLoadbarDoc />
                                </div>
                              </IconContext.Provider>

                              <IconContext.Provider
                                value={{
                                  size: "1.1em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <Tooltip title={tooltipText} placement="top">
                                  <div
                                    style={{
                                      marginLeft: 5,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => copyToClipboard(address)}
                                  >
                                    <MdContentCopy />
                                  </div>
                                </Tooltip>
                              </IconContext.Provider>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </div>
                  );
                }
              )}
              {Array(
                maxValue - referralStats?.referralStats?.level6Referrals?.length
              )
                .fill("")
                .map(() => {
                  return (
                    <div>
                      <tr>
                        <td></td>
                      </tr>
                    </div>
                  );
                })}
            </tbody>
          </table>
        )}
           {referralStats?.referralStats?.level7Referrals.length != 0 && (
          <table>
            <thead>
              <tr>
                {" "}
                <th>{windowSize.width <= 960 ? "L7" : "Level 7"}</th>
              </tr>
            </thead>
            <tbody>
              {referralStats?.referralStats?.level7Referrals?.map(
                (address, index) => {
                  return (
                    <div>
                      <tr>
                        <td>
                          <div className="table-address">
                            <div id="l2-address">
                              {" "}
                              {getEllipsisTxt(address, 6)}{" "}
                            </div>
                            <div className="icons-cont">
                              <IconContext.Provider
                                value={{
                                  size: "1.2em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => lookupSearch(address)}
                                >
                                  <CgLoadbarDoc />
                                </div>
                              </IconContext.Provider>

                              <IconContext.Provider
                                value={{
                                  size: "1.1em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => copyToClipboard(address)}
                                >
                                  <MdContentCopy />
                                </div>
                              </IconContext.Provider>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </div>
                  );
                }
              )}
              {Array(
                maxValue - referralStats?.referralStats?.level7Referrals?.length
              )
                .fill("")
                .map(() => {
                  return (
                    <div>
                      <tr>
                        <td></td>
                      </tr>
                    </div>
                  );
                })}
            </tbody>
          </table>)}
          {referralStats?.referralStats?.level8Referrals.length != 0 && (
          <table>
            <thead>
              <tr>
                {" "}
                <th>{windowSize.width <= 960 ? "L8" : "Level 8"}</th>
              </tr>
            </thead>
            <tbody>
              {referralStats.referralStats.level8Referrals?.map(
                (address, index) => {
                  return (
                    <tr>
                      <td>
                        <div className="table-address">
                          <div id="l4-address">
                            {" "}
                            {getEllipsisTxt(address, 6)}{" "}
                          </div>
                          <div className="icons-cont">
                            <IconContext.Provider
                              value={{
                                size: "1.2em",
                                color: "gray",
                                className: "global-class-name",
                              }}
                            >
                              <div
                                style={{
                                  marginLeft: 5,
                                  cursor: "pointer",
                                }}
                                onClick={() => lookupSearch(address)}
                              >
                                <CgLoadbarDoc />
                              </div>
                            </IconContext.Provider>

                            <IconContext.Provider
                              value={{
                                size: "1.1em",
                                color: "gray",
                                className: "global-class-name",
                              }}
                            >
                              <div
                                style={{
                                  marginLeft: 5,
                                  cursor: "pointer",
                                }}
                                onClick={() => copyToClipboard(address)}
                              >
                                <MdContentCopy />
                              </div>
                            </IconContext.Provider>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
              {Array(
                maxValue - referralStats?.referralStats?.level8Referrals?.length
              )
                .fill("")
                .map(() => {
                  return (
                    <div>
                      <tr>
                        <td></td>
                      </tr>
                    </div>
                  );
                })}
            </tbody>
          </table>)}
          {referralStats?.referralStats?.level9Referrals.length != 0 && (
          <table>
            <thead>
              <tr>
                {" "}
                <th>{windowSize.width <= 960 ? "L9" : "Level 9"}</th>
              </tr>
            </thead>
            <tbody>
              {referralStats.referralStats.level9Referrals?.map(
                (address, index) => {
                  return (
                    <tr>
                      <td>
                        <div className="table-address">
                          <div id="l5-address">
                            {" "}
                            {getEllipsisTxt(address, 6)}{" "}
                          </div>
                          <div className="icons-cont">
                            <IconContext.Provider
                              value={{
                                size: "1.2em",
                                color: "gray",
                                className: "global-class-name",
                              }}
                            >
                              <div
                                style={{
                                  marginLeft: 5,
                                  cursor: "pointer",
                                }}
                                onClick={() => lookupSearch(address)}
                              >
                                <CgLoadbarDoc />
                              </div>
                            </IconContext.Provider>

                            <IconContext.Provider
                              value={{
                                size: "1.1em",
                                color: "gray",
                                className: "global-class-name",
                              }}
                            >
                              <div
                                style={{
                                  marginLeft: 5,
                                  cursor: "pointer",
                                }}
                                onClick={() => copyToClipboard(address)}
                              >
                                <MdContentCopy />
                              </div>
                            </IconContext.Provider>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
              {Array(
                maxValue - referralStats?.referralStats?.level9Referrals?.length
              )
                .fill("")
                .map(() => {
                  return (
                    <div>
                      <tr>
                        <td></td>
                      </tr>
                    </div>
                  );
                })}
            </tbody>
          </table>)}
          {referralStats?.referralStats?.level10Referrals.length != 0 && (
          <table>
            <thead>
              <tr>
                {" "}
                <th>{windowSize.width <= 960 ? "L10" : "Level 10"}</th>
              </tr>
            </thead>
            <tbody>
              {referralStats.referralStats.level10Referrals?.map(
                (address, index) => {
                  return (
                    <div>
                      <tr>
                        <td>
                          <div className="table-address">
                            <div id="l3-address">
                              {" "}
                              {getEllipsisTxt(address, 6)}{" "}
                            </div>
                            <div className="icons-cont">
                              <IconContext.Provider
                                value={{
                                  size: "1.2em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => lookupSearch(address)}
                                >
                                  <CgLoadbarDoc />
                                </div>
                              </IconContext.Provider>

                              <IconContext.Provider
                                value={{
                                  size: "1.1em",
                                  color: "gray",
                                  className: "global-class-name",
                                }}
                              >
                                <div
                                  style={{
                                    marginLeft: 5,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => copyToClipboard(address)}
                                >
                                  <MdContentCopy />
                                </div>
                              </IconContext.Provider>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </div>
                  );
                }
              )}
              {Array(
                maxValue - referralStats?.referralStats?.level10Referrals?.length
              )
                .fill("")
                .map(() => {
                  return (
                    <div>
                      <tr>
                        <td></td>
                      </tr>
                    </div>
                  );
                })}
            </tbody>
          </table>)}
        </div>
        {referralStats?.referralStats?.level1Referrals.length === 0 &&
        referralStats?.referralStats?.level2Referrals.length === 0 &&
        referralStats?.referralStats?.level3Referrals.length === 0 &&
        referralStats?.referralStats?.level4Referrals.length === 0 &&
        referralStats?.referralStats?.level5Referrals.length === 0 ? <div style={{fontSize:18,fontWeight:400,textAlign:'center',color:"#fff",margin:'20px auto'}}> No Referral found !</div>:<div></div>}
      </div>
    </div>
  );
};


// NetworkGraph.getInitialProps = async (ctx) => {
//   return {};
// };
// export default NetworkGraph