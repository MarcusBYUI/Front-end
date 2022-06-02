import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import erc20Abi from "../../../ERC20ABI.json";
import stakingAbi from "../../../stakinABI.json";
import bolAbi from "../../../abi.json";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import oldbolAbi from "../../../oldabi.json";
import Levels from "./upgrades.json";

import "./upgrades.css";

const Upgrades = () => {
  const legendContract = "0x3CBef762A500968986E3410a94CbF8daA5cceC84";
  const structContract = "0x494bdd9116c7fAb77000484617D1a95B17bE740f";
  const bolstakingContract = "0xC96aAe9d56618B515e8FA074404f0647b3e16Bf8";
  const IMGBASEURL =
    "https://bol.mypinata.cloud/ipfs/QmbT92ijUi3iJXJv9zz1yJxMaRDkC9LyExUAQd8b5n3eie/";

  const [structureUpgradingCount, setStructureUpgradingCount] = useState([]);
  const [availableStructCount, setAvailableStructCount] = useState([]);
  const [approved, setApproved] = useState(false);
  const [stakeIds, setStakeIds] = useState([]);
  const [tokenId, settokenId] = useState([]);
  const [walletMap, setWalletMap] = useState({});
  const [upgradingMap, setUpgradingMap] = useState({});
  const [timerState, setTimerState] = useState({});
  const [tokenTimer, setTokenTimer] = useState({});
  const [legendCount, setLegendCount] = useState(0);

  const [walletStructImages, setWalletStructImages] = useState([]);
  const [upgradeableCurImage, setupgradeableCurImage] = useState(0);

  const checkApproved = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(legendContract, erc20Abi, signer);
      const address = await signer.getAddress().then((response) => {
        return response;
      });
      try {
        //debugger;
        const response = await contract.allowance(address, structContract);
        const balance = Math.round(ethers.utils.formatEther(response));
        balance < 2000 ? setApproved(false) : setApproved(true);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleApprove = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(legendContract, erc20Abi, signer);

      try {
        //debugger;
        const response = await contract.approve(
          structContract,
          "20000000000000000000000000000"
        );
        await response.wait();
        setApproved(true);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleIds = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, bolAbi, signer);
      const address = await signer.getAddress().then((response) => {
        return response;
      });
      const idSet = [];
      try {
        //get balance of structs in wallet
        const balanceOf = await contract.balanceOf(address);
        async function loop() {
          for (let i = 0; i < BigNumber.from(balanceOf).toString(); i++) {
            const walletTokenId = await contract.tokenOfOwnerByIndex(
              address,
              i
            );
            idSet.push(BigNumber.from(walletTokenId).toString());
          }
        }

        await loop();

        //get ongoing upgrades
        const isUpgradingBalance = await contract.upgradingBalance(address);

        const upgradingSet = [];

        async function upgradingloop() {
          for (
            let i = 0;
            i < BigNumber.from(isUpgradingBalance).toString();
            i++
          ) {
            const upgradingTokenId = await contract.isUpgrading(address, i);
            BigNumber.from(upgradingTokenId).toString() !== "0" &&
              upgradingSet.push(BigNumber.from(upgradingTokenId).toString());
          }
        }

        await upgradingloop();
        async function filterArray() {
          for (let i = 0; i < upgradingSet.length; i++) {
            if (idSet.includes(upgradingSet[i])) {
              idSet.splice(idSet.indexOf(upgradingSet[i]), 1);
            }
          }
        }

        await filterArray();

        setStructureUpgradingCount(upgradingSet);

        setAvailableStructCount(idSet);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const prevSlide = () => {
    const length = availableStructCount.length;

    setupgradeableCurImage(
      upgradeableCurImage === 0 ? length - 1 : upgradeableCurImage - 1
    );
  };

  const nextSlide = () => {
    const length = availableStructCount.length;
    setupgradeableCurImage(
      upgradeableCurImage === length - 1 ? 0 : upgradeableCurImage + 1
    );
  };

  //
  //
  //Images staked
  //
  //
  //
  //
  const [pendingIdsList, setpendingIdsList] = useState([]);
  const [pendingCurImage, setpendingCurImage] = useState(0);

  const prevPendingSlide = () => {
    const length = structureUpgradingCount.length;

    setpendingCurImage(
      pendingCurImage === 0 ? length - 1 : pendingCurImage - 1
    );
  };

  const nextPendingSlide = () => {
    const length = structureUpgradingCount.length;
    setpendingCurImage(
      pendingCurImage === length - 1 ? 0 : pendingCurImage + 1
    );
  };
  //
  //

  const startURL = "https://bol.mypinata.cloud/ipfs/";
  const decideLevel = (string) => {
    if (
      string.includes("QmXTg1LCuKJ83njDyVJeLvtFjpWDTog5n9UKLv1Gt9xPVZ") ||
      string.includes("QmXm1T3kPMjBG7PERgPsa3gY4efbkbk6ry8UhMQ1Nb6WBY")
    ) {
      return 1;
    } else if (
      string.includes("QmWjJhcQmDFSewnKz8AAdy98D8DKo7dMRPWTw991HnXB41") ||
      string.includes("QmTZSmXaruR7pWgUnLzjJp819gPyDWsofhRpWubcipNWZf")
    ) {
      return 2;
    } else if (
      string.includes("QmSFQLRVEFEK1kcQ5NVz4h1iyrBDR9zwvJJuDEKDrAb2VP") ||
      string.includes("QmSiiyTc13oRnq4DivgcEgj1P43bx4AEwsoT4ffn39LM2x")
    ) {
      return 3;
    } else if (
      string.includes("QmQk7z9eoe5RaJtEW2cqbEnCwnwUcESsgV8nYKvKJkqJqz") ||
      string.includes("QmfP8yUwkXVKeUHY5Nzjcbetj8QArunw2uBFi6ZVXNp9Au")
    ) {
      return 4;
    } else if (
      string.includes("QmTKfoKReK4VkZnirNAWHziiTjXtqgREskHmzH2EJfBkVT") ||
      string.includes("Qmd7pbdJGyECsQabwcgJFuYdLJegqQL29fRVuULeqgLNxk")
    ) {
      return 5;
    } else {
      return 0;
    }
  };
  //get URL then fetch the json that has the images
  const getWalletImage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, oldbolAbi, signer);

      try {
        const tokenURI = await Promise.all(
          availableStructCount.map(async (token) => {
            const oldtokenURI = await contract.tokenURI(token);
            return oldtokenURI;
          })
        );
        const FetchURI = await Promise.all(
          tokenURI.map(async (ipfs) => {
            return ipfs.replace("ipfs://", `${startURL}`);
          })
        );

        const TokenList = [];

        const test = await Promise.all(
          FetchURI.map(async (link) => {
            const response = await fetch(link);
            const data = await response.json();
            const dic = {};
            dic["name"] = data.attributes[1].value;
            dic["image"] = data.image;
            dic["level"] = decideLevel(link);

            TokenList.push(dic);
          })
        );

        let idImgsDic = {};
        for (let i = 0; i < availableStructCount.length; i++) {
          idImgsDic[`${availableStructCount[i]}`] = TokenList[i];
        }

        setWalletMap(idImgsDic);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const timeInterval = (when = false) => {
    if (Object.keys(timerState).length === 0) {
    } else {
      const timer = {};

      structureUpgradingCount.forEach((structure) => {
        const curTime = new Date().getTime();
        const futureTime = timerState[structure];

        const distance = futureTime - curTime;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer[structure] = [days, hours, minutes, seconds];
      });

      setTokenTimer(timer);
    }
  };
  const getUpgradingImage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, oldbolAbi, signer);
      const newContract = new ethers.Contract(structContract, bolAbi, signer);

      try {
        const tokenURI = await Promise.all(
          structureUpgradingCount.map(async (token) => {
            const oldtokenURI = await contract.tokenURI(token);
            return oldtokenURI;
          })
        );
        const FetchURI = await Promise.all(
          tokenURI.map(async (ipfs) => {
            return ipfs.replace("ipfs://", `${startURL}`);
          })
        );
        const TokenList = [];
        const timerList = [];
        const test = await Promise.all(
          FetchURI.map(async (link, index) => {
            const response = await fetch(link);
            const data = await response.json();

            const chainResponse = await newContract.upgradeTimeleft(
              structureUpgradingCount[index]
            );

            const FutureTime = BigNumber.from(chainResponse).toString();

            const FutureTimeDate = new Date(FutureTime * 1000).getTime();

            const dic = {};
            dic["name"] = data.attributes[1].value;
            dic["image"] = data.image;
            TokenList.push(dic);
            timerList.push(FutureTimeDate);
          })
        );

        let idImgsDic = {};
        let idTimerDic = {};

        for (let i = 0; i < structureUpgradingCount.length; i++) {
          idImgsDic[`${structureUpgradingCount[i]}`] = TokenList[i];
          idTimerDic[`${structureUpgradingCount[i]}`] = timerList[i];
        }

        setTimerState(idTimerDic);
        console.log(idTimerDic, idTimerDic);

        setUpgradingMap(idImgsDic);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const legendBalanceHandler = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(legendContract, erc20Abi, signer);
      const address = await signer.getAddress().then(function (response) {
        return response;
      });
      try {
        //debugger;

        const balanceBig = await contract.balanceOf(address);
        const balance = ethers.utils.formatEther(balanceBig);

        setLegendCount(Math.round(balance));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleUpgrade = async (name, tokenId) => {
    if (Number(availableStructCount) < 1) {
    } else {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(structContract, bolAbi, signer);
        try {
          //debugger;
          const response = await contract.initializeUpgrade(
            name,
            tokenId,
            legendContract
          );
          await response.wait();
          await handleIds();
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  const change = async (string) => {
    if (string.includes("QmQoU5pF2PNfRfgqd1zyBMEhX3YGWANNKqrZQ91poW8s4F")) {
      return string.replace(
        "QmQoU5pF2PNfRfgqd1zyBMEhX3YGWANNKqrZQ91poW8s4F",
        "QmcHeHERe479FjEi7echkEeRuxemyRRmSyPtmDM3JzYm2d"
      );
    } else if (
      string.includes("QmcHeHERe479FjEi7echkEeRuxemyRRmSyPtmDM3JzYm2d")
    ) {
      return string.replace(
        "QmcHeHERe479FjEi7echkEeRuxemyRRmSyPtmDM3JzYm2d",
        "QmNxT7jm72e6cTnyA5xEnwh3R32GeAgBHBk8z2avrdAgY8"
      );
    } else if (
      string.includes("QmNxT7jm72e6cTnyA5xEnwh3R32GeAgBHBk8z2avrdAgY8")
    ) {
      return string.replace(
        "QmNxT7jm72e6cTnyA5xEnwh3R32GeAgBHBk8z2avrdAgY8",
        "QmXgESRpXwsgJ51PGnRDwn9hTTeZp4JGBcAjhJAkbQg7mo"
      );
    } else if (
      string.includes("QmXgESRpXwsgJ51PGnRDwn9hTTeZp4JGBcAjhJAkbQg7mo")
    ) {
      return string.replace(
        "QmXgESRpXwsgJ51PGnRDwn9hTTeZp4JGBcAjhJAkbQg7mo",
        "QmNT6jNfrFK1QjDCQgu2WXY6uvCTWTvhhFFg8beZxCJh5s"
      );
    } else if (
      string.includes("QmNT6jNfrFK1QjDCQgu2WXY6uvCTWTvhhFFg8beZxCJh5s")
    ) {
      return string.replace(
        "QmNT6jNfrFK1QjDCQgu2WXY6uvCTWTvhhFFg8beZxCJh5s",
        "QmWomiuzkKf3w9ZAGqByKewDaPmQKMd81Td1ySs3WPG3d5"
      );
    } // testing tesu=ting
    else if (
      string.includes("QmRFCGar2zMMW75RpvkNXJDtYVe4s8CHUk691DFVnd8kTr")
    ) {
      return string.replace(
        "QmRFCGar2zMMW75RpvkNXJDtYVe4s8CHUk691DFVnd8kTr",
        "QmXm1T3kPMjBG7PERgPsa3gY4efbkbk6ry8UhMQ1Nb6WBY"
      );
    } else if (
      string.includes("QmXm1T3kPMjBG7PERgPsa3gY4efbkbk6ry8UhMQ1Nb6WBY")
    ) {
      return string.replace(
        "QmXm1T3kPMjBG7PERgPsa3gY4efbkbk6ry8UhMQ1Nb6WBY",
        "QmTZSmXaruR7pWgUnLzjJp819gPyDWsofhRpWubcipNWZf"
      );
    } else if (
      string.includes("QmTZSmXaruR7pWgUnLzjJp819gPyDWsofhRpWubcipNWZf")
    ) {
      return string.replace(
        "QmTZSmXaruR7pWgUnLzjJp819gPyDWsofhRpWubcipNWZf",
        "QmSiiyTc13oRnq4DivgcEgj1P43bx4AEwsoT4ffn39LM2x"
      );
    } else if (
      string.includes("QmSiiyTc13oRnq4DivgcEgj1P43bx4AEwsoT4ffn39LM2x")
    ) {
      return string.replace(
        "QmSiiyTc13oRnq4DivgcEgj1P43bx4AEwsoT4ffn39LM2x",
        "QmfP8yUwkXVKeUHY5Nzjcbetj8QArunw2uBFi6ZVXNp9Au"
      );
    } else if (
      string.includes("QmfP8yUwkXVKeUHY5Nzjcbetj8QArunw2uBFi6ZVXNp9Au")
    ) {
      return string.replace(
        "QmfP8yUwkXVKeUHY5Nzjcbetj8QArunw2uBFi6ZVXNp9Au",
        "Qmd7pbdJGyECsQabwcgJFuYdLJegqQL29fRVuULeqgLNxk"
      );
    }
  };
  const handleCompleteUpgrade = async (token) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, bolAbi, signer);

      try {
        console.log(token);
        const tokenURI = await contract.tokenURI(token);

        const URI = await change(tokenURI);

        const response = await contract.updateMetadata(token, URI);
        await response.wait();
        handleIds();
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  //
  //

  useEffect(() => {
    const interval = setInterval(() => {
      timeInterval();
    }, 1000);

    return () => clearInterval(interval);
  }, [timerState]);
  useEffect(() => {
    getWalletImage();
    getUpgradingImage();
    legendBalanceHandler();
  }, [availableStructCount, structureUpgradingCount]);

  useEffect(() => {
    const reload = async () => {
      await handleIds();
      await checkApproved();
      legendBalanceHandler();
    };
    reload();
  }, [approved]);
  //

  return (
    <div className="upgrades-body">
      <div className="upgrades-header">
        <h1>Upgrades</h1>
        <h2>$LEGEND in your wallet: {legendCount}</h2>
      </div>
      <div className="upgrades-grid">
        <div className='relative flex min-h-[36rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%]'>
          <div className="absolute my-8 mb-10 flex h-[87%] w-10/12 flex-col items-center bg-white">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-4xl">
              Lands
            </h2>
            <div className="h-[0.09rem] w-11/12 bg-slate-900"></div>

            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Upgradeable
            </h2>
            <div className="my-2">
              {"stakeArray.length" === 0 ? (
                <h2 className=" mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  No Land to Stake
                </h2>
              ) : (
                "stakeArray"
              )}
              <button
                className=" rounded-md bg-[#FEDC8C] px-4 py-2"
                // onClick={}
              >
                Begin Upgrade
              </button>
            </div>
            <div className="h-[0.1rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2  ml-4 self-start text-2xl font-bold md:text-base">
              Pending Upgrades
            </h2>
            <div>
              {"stakedArray.length" === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  No Staked Land
                </h2>
              ) : (
                "stakeArray"
              )}
              <button
                className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                // onClick={}
              >
                Complete Upgrade
              </button>
            </div>
          </div>
        </div>
        <div className='relative flex min-h-[70rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%]'>
          <div className="absolute my-4 mb-5 flex h-[87%] w-10/12 flex-col items-center bg-white">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-4xl">
              Structures
            </h2>
            <div className="h-[0.09rem] w-11/12 bg-slate-900"></div>

            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Upgradeable
            </h2>
            <div className="my-2">
              {availableStructCount.length === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  {"No Upgradeable Structures"}
                </h2>
              ) : (
                <section className="slider-container">
                  <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={prevSlide}
                  />
                  {availableStructCount.map((item) => {
                    return (
                      <div
                        className={
                          availableStructCount.indexOf(item) ===
                          upgradeableCurImage
                            ? "active"
                            : "slide"
                        }
                      >
                        {Object.keys(walletMap).length !== 0 &&
                          availableStructCount.indexOf(item) ===
                            upgradeableCurImage && (
                            <>
                              <img
                                key={availableStructCount.indexOf(item)}
                                src={walletMap[item].image}
                                alt={item}
                              />
                              <p>
                                Name:{""}
                                <strong>{walletMap[item].name}</strong>
                              </p>
                              <p>
                                Level: <strong>{walletMap[item].level}</strong>
                              </p>
                              <p>
                                Current Yield:{" "}
                                <strong>
                                  {
                                    Levels[walletMap[item].name][
                                      walletMap[item].level
                                    ].curYield
                                  }
                                </strong>
                              </p>
                              {walletMap[item].level === 5 ? (
                                <p>
                                  <strong>Levels Maxed!!!</strong>
                                </p>
                              ) : (
                                <>
                                  <p>
                                    Upgrade Time:{" "}
                                    <strong>
                                      {
                                        Levels[walletMap[item].name][
                                          walletMap[item].level
                                        ].duration
                                      }
                                    </strong>{" "}
                                    days
                                  </p>
                                  <p>
                                    Upgrade Cost:{" "}
                                    <strong>
                                      {
                                        Levels[walletMap[item].name][
                                          walletMap[item].level
                                        ].cost
                                      }
                                    </strong>{" "}
                                    $LGD
                                  </p>
                                  <p>
                                    Upgraded Yield:{" "}
                                    <strong>
                                      {
                                        Levels[walletMap[item].name][
                                          walletMap[item].level
                                        ].furYield
                                      }
                                    </strong>{" "}
                                    $LGD
                                  </p>
                                  <button
                                    className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                                    onClick={
                                      approved === true
                                        ? () => {
                                            handleUpgrade(
                                              walletMap[item].name,
                                              item
                                            );
                                          }
                                        : handleApprove
                                    }
                                  >
                                    {approved === true
                                      ? "Upgrade Structure"
                                      : "Approve Structure"}
                                  </button>
                                </>
                              )}
                            </>
                          )}
                      </div>
                    );
                  })}

                  <FaArrowAltCircleRight
                    className="right-arrow"
                    onClick={nextSlide}
                  />
                </section>
              )}
            </div>
            <div className="h-[0.1rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Pending Upgrades
            </h2>
            <div className="my-2">
              {structureUpgradingCount.length === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  {"No Pending Upgrades"}
                </h2>
              ) : (
                <section className="slider-container">
                  <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={prevPendingSlide}
                  />
                  {structureUpgradingCount.map((item) => {
                    return (
                      <div
                        className={
                          structureUpgradingCount.indexOf(item) ===
                          pendingCurImage
                            ? "active"
                            : "slide"
                        }
                      >
                        {Object.keys(upgradingMap).length !== 0 &&
                          Object.keys(tokenTimer).length &&
                          structureUpgradingCount.indexOf(item) ===
                            pendingCurImage && (
                            <>
                              <img
                                key={structureUpgradingCount.indexOf(item)}
                                src={upgradingMap[item].image}
                                alt={item}
                              />
                              <p>
                                Name:{""}
                                <strong>{upgradingMap[item].name}</strong>
                              </p>
                              <button
                                className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                                onClick={
                                  tokenTimer[item][3] < 0
                                    ? () => {
                                        handleCompleteUpgrade(item);
                                      }
                                    : () => {}
                                }
                              >
                                {tokenTimer[item][3] < 0
                                  ? "Complete Upgrade"
                                  : `${tokenTimer[item][0]}:${tokenTimer[item][1]}:${tokenTimer[item][2]}:${tokenTimer[item][3]}`}
                              </button>
                            </>
                          )}
                      </div>
                    );
                  })}

                  <FaArrowAltCircleRight
                    className="right-arrow"
                    onClick={nextPendingSlide}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrades;
