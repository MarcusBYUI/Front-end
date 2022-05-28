import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import erc20Abi from "../../../ERC20ABI.json";
import stakingAbi from "../../../stakinABI.json";
import bolAbi from "../../../abi.json";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import oldbolAbi from "../../../oldabi.json";

import "./style.css";
import Structures from "../../Landing-Page/Structures/index";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import Swap from "./swap/Swap";
const Kingdom = (props) => {
  const [legendCount, setLegendCount] = useState(0);
  const [landStakedCount, setLandStakedCount] = useState(0);
  const [structureStakedCount, setStructureStakedCount] = useState(0);
  const [availableStructCount, setAvailableStructCount] = useState(0);

  const [availableCount, setAvailableCount] = useState(0);
  const [stakeArray, setStakeArray] = useState([]);
  const [stakedArray, setStakedArray] = useState([]);
  const [stakeStructureArray, setStakeStructureArray] = useState([]);
  const [stakedStructureArray, setStakedStructureArray] = useState([]);
  const [statsArray, setStatesArray] = useState([
    { name: "Lands Minted", value: "-" },
    { name: "Structures Minted", value: "-" },
    { name: "Lands Staked", value: "-" },
    { name: "Structures Staked", value: "-" },
    { name: "$LEGEND Claimed", value: "-" },
  ]);
  const [kingdomArray, setKingdomArray] = useState([
    { name: "Lands Staked", value: "-" },
    { name: "Structures Staked", value: "-" },
    { name: "$LEGEND Claimed", value: "-" },
    { name: "Space Available", value: "-" },
    { name: "Kingdom ATK", value: "-" },
    { name: "Kingdom DEF", value: "-" },
    { name: "Kingdom UTIL", value: "-" },
  ]);
  const [leaderboardArray, setLeaderboardArray] = useState([
    { idUser: "0xE410", value: "-", tag: "$LEGEND" },
    { idUser: "0xE411", value: "-", tag: "$LEGEND" },
    { idUser: "0xE412", value: "-", tag: "$LEGEND" },
    { idUser: "0xE413", value: "-", tag: "$LEGEND" },
    { idUser: "0xE414", value: "-", tag: "$LEGEND" },
    { idUser: "0xE415", value: "-", tag: "$LEGEND" },
    { idUser: "0xE416", value: "-", tag: "$LEGEND" },
  ]);

  const legendContract = "0x3CBef762A500968986E3410a94CbF8daA5cceC84";
  const structContract = "0x399C143e1100Bdd35035D9A52D4c681e6427640b";
  const bolstakingContract = "0xC96aAe9d56618B515e8FA074404f0647b3e16Bf8";
  const IMGBASEURL =
    "https://bol.mypinata.cloud/ipfs/QmbT92ijUi3iJXJv9zz1yJxMaRDkC9LyExUAQd8b5n3eie/";

  const [approved, setApproved] = useState(false);
  const [stakeIds, setStakeIds] = useState([]);
  const [tokenId, settokenId] = useState([]);
  const [stakeClick, setStakeClick] = useState(0);
  const [unStakeClick, setUnStakeClick] = useState(0);
  const [claimClick, setClaimClick] = useState(0);

  const [claimBal, setClaimBal] = useState(0);
  const [claimBalCheck, setClaimBalCheck] = useState(0);
  const [stakeIdTokenIdDic, setStakeIdTokenIdDic] = useState({});
  const [swapUpdated, setSwapUpdated] = useState(0);

  //mapping ID to URI
  const [walletMap, setWalletMap] = useState({});
  const [stakeMap, setStakeMap] = useState({});

  //trigger after swap
  const afterSwapHandler = () => {
    setSwapUpdated((prevState) => prevState + 1);
  };

  //images
  //
  //
  //
  //
  //
  //
  //

  const [walletStructImages, setWalletStructImages] = useState([]);
  const [walletCurImage, setWalletCurImage] = useState(0);

  const prevSlide = () => {
    const length = walletStructImages.length;

    setWalletCurImage(walletCurImage === 0 ? length - 1 : walletCurImage - 1);
  };

  const nextSlide = () => {
    const length = walletStructImages.length;
    setWalletCurImage(walletCurImage === length - 1 ? 0 : walletCurImage + 1);
  };

  //
  //
  //Images staked
  //
  //
  //
  //
  const [stakedIdsList, setstakedIdsList] = useState([]);
  const [stakedCurImage, setStakedCurImage] = useState(0);

  const prevStakedSlide = () => {
    const length = stakedIdsList.length;

    setStakedCurImage(stakedCurImage === 0 ? length - 1 : stakedCurImage - 1);
  };

  const nextStakedSlide = () => {
    const length = stakedIdsList.length;
    setStakedCurImage(stakedCurImage === length - 1 ? 0 : stakedCurImage + 1);
  };

  //
  //
  //
  //
  //
  //
  //
  //
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

        //console.log(await address);
        const balanceBig = await contract.balanceOf(address);
        const balance = ethers.utils.formatEther(balanceBig);

        setLegendCount(Math.round(balance));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const structBalanceHandler = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, erc20Abi, signer);
      const address = await signer.getAddress().then(function (response) {
        return response;
      });
      try {
        //debugger;

        //console.log(await address);
        const balance = await contract.balanceOf(address);
        //const balance = ethers.utils.formatEther(balanceBig);

        setAvailableStructCount(Math.round(await balance));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const checkStakedStruct = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        bolstakingContract,
        stakingAbi,
        signer
      );
      const address = await signer.getAddress().then(function (response) {
        return response;
      });
      try {
        //debugger;
        const stakeIds = await contract.staked(address);
        let ids = [];

        await stakeIds.forEach(function (element) {
          ids.push(element.stakeId);
        });
        setStakeIds([...ids]);

        setStructureStakedCount(ids.length);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const handleStake = async (name) => {
    if (Number(availableStructCount) < 1) {
    } else {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          bolstakingContract,
          stakingAbi,
          signer
        );
        getRandomInt(availableStructCount);
        console.log(name);

        try {
          //debugger;
          const response = await contract.stake(
            structContract,
            tokenId[walletCurImage],
            legendContract,
            name
          );
          response.wait().then((data) => {
            // update the front end bal before the blockchain data returns
            setStructureStakedCount((prevState) => prevState + 1);
            setAvailableStructCount((prevState) => prevState - 1);
            structBalanceHandler();
            checkStakedStruct();
          });
          //generateTokenIdsFromStakeIds();
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  const checkApproved = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, bolAbi, signer);
      const address = await signer.getAddress().then((response) => {
        return response;
      });
      try {
        //debugger;
        const response = await contract.isApprovedForAll(
          address,
          bolstakingContract
        );
        response ? setApproved(true) : setApproved(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleApprove = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, bolAbi, signer);

      try {
        //debugger;
        const response = await contract.setApprovalForAll(
          bolstakingContract,
          true
        );
        response.wait().then((data) => {
          setApproved(true);
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleUnstake = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        bolstakingContract,
        stakingAbi,
        signer
      );

      try {
        //debugger;
        const response = await contract.unstake(
          stakeIdTokenIdDic[stakedIdsList[stakedCurImage]]
        );
        response.wait().then((data) => {
          setStructureStakedCount((prevState) => prevState - 1);
          setAvailableStructCount((prevState) => prevState + 1);
          structBalanceHandler();
          checkStakedStruct();
          //generateTokenIdsFromStakeIds();
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleClaim = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        bolstakingContract,
        stakingAbi,
        signer
      );
      const address = await signer.getAddress().then((response) => {
        return response;
      });

      try {
        //debugger;
        const response = await contract.claimAll(address);
        response.wait().then((data) => {
          legendBalanceHandler();
          setClaimBal(0);
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const pendingClaim = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        bolstakingContract,
        stakingAbi,
        signer
      );
      const address = await signer.getAddress().then((response) => {
        return response;
      });

      try {
        //debugger;
        let allTokens = 0;
        const response = await contract.claimable(address);
        response.forEach((claim) => {
          const num = BigNumber.from(`${claim.amount._hex}`).toString();
          const tokens = Number(num) * 10 ** -18;
          allTokens += tokens;

          //console.log(Math.round((num + Number.EPSILON) * 100) / 100);
        });
        setClaimBal(allTokens);

        // setChange((prevState) => !prevState);
        // setChangeBal((prevState) => !prevState);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const startURL = "https://bol.mypinata.cloud/ipfs/";

  //get URL then fetch the json that has the images
  const getWalletImage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, oldbolAbi, signer);

      try {
        const tokenURI = await Promise.all(
          walletStructImages.map(async (token) => {
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

        const imageURI = await Promise.all(
          FetchURI.map(async (link) => {
            const response = await fetch(link);
            const data = await response.json();
            const dic = {};
            dic["name"] = data.attributes[1].value;
            dic["image"] = data.image;
            TokenList.push(dic);
          })
        );
        let idImgsDic = {};
        for (let i = 0; i < walletStructImages.length; i++) {
          idImgsDic[`${walletStructImages[i]}`] = TokenList[i];
        }

        // staking part
        setWalletMap(idImgsDic);
        //console.log(imageURI, "Na we");
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const getStakedImage = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, oldbolAbi, signer);

      try {
        const tokenURI = await Promise.all(
          stakedIdsList.map(async (token) => {
            const oldtokenURI = await contract.tokenURI(token);
            return oldtokenURI;
          })
        );
        const FetchURI = await Promise.all(
          tokenURI.map(async (ipfs) => {
            return ipfs.replace("ipfs://", `${startURL}`);
          })
        );

        const imageURI = await Promise.all(
          FetchURI.map(async (link) => {
            const response = await fetch(link);
            const data = await response.json();
            return data.image;
          })
        );

        let idImgsDic = {};
        for (let i = 0; i < stakedIdsList.length; i++) {
          idImgsDic[`${stakedIdsList[i]}`] = imageURI[i];
        }

        console.log(idImgsDic);
        setStakeMap(idImgsDic);
        //console.log(imageURI, "Na we");
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
        const stakingContract = new ethers.Contract(
          bolstakingContract,
          stakingAbi,
          signer
        );
        const stakeIds = await stakingContract.staked(address);
        let ids = [];

        await stakeIds.forEach(function (element) {
          ids.push(element.stakeId);
        });
        const lastStakeIds = [...ids];

        //debugger;
        const balanceOf = await contract.balanceOf(address);
        async function loop() {
          for (let i = 0; i < balanceOf; i++) {
            const walletTokenId = await contract.tokenOfOwnerByIndex(
              address,
              i
            );
            idSet.push(BigNumber.from(walletTokenId).toString());
          }
        }

        await loop();

        let newdic = {};
        let IdList = [];
        lastStakeIds.forEach(async (stakeid) => {
          const tokenId = await stakingContract.stakedtokenId(stakeid);
          const test = BigNumber.from(tokenId).toString();

          newdic[test] = stakeid;
          IdList.push(BigNumber.from(tokenId).toString());
        });
        setStakeIdTokenIdDic(newdic);
        setstakedIdsList(IdList);

        //end
        console.log(IdList);
        settokenId(idSet);
        setWalletStructImages(idSet);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const stakeClickHandler = (name) => {
    //make button roll

    //make change
    setStakeClick(name);
  };

  const claimClickHandler = () => {
    //make button roll

    //make change
    setClaimClick((prevState) => prevState + 1);
  };
  const unStakeClickHandler = () => {
    //make button roll

    //make change
    setUnStakeClick((prevState) => prevState + 1);
  };

  const pendingInterval = () => {
    setInterval(() => {
      setClaimBalCheck((prevState) => prevState + 1);
    }, 10000);
  };

  // const fakePendingInterval = () => {
  //   setInterval(() => {
  //     setFakeClaimBalCheck((prevState) => prevState + 1);
  //   }, 3529);
  // };

  // const fakeIntervalAddition = (nfts) => {
  //   setClaimBal((prevState) => prevState + 0.01 * nfts);
  // };
  //Use Effects
  //

  //
  // update claim
  // useEffect(() => {
  //   structureStakedCount > 0 && fakeIntervalAddition(structureStakedCount);
  // }, [fakeClaimBalCheck]);

  //to fetch images
  useEffect(() => {
    setTimeout(() => {
      Object.keys(walletStructImages).length > 0 && getWalletImage();
    }, 2000);
  }, [walletStructImages]);
  useEffect(() => {
    console.log("time");

    setTimeout(() => {
      Object.keys(stakedIdsList).length > 0 && getStakedImage();
    }, 5000);
  }, [stakedIdsList]);

  useEffect(() => {
    pendingClaim();
  }, [claimBalCheck]);
  //claim
  useEffect(() => {
    claimClick !== 0 && handleClaim();
  }, [claimClick]);
  //stake
  useEffect(() => {
    stakeClick !== 0 &&
      (approved === true ? handleStake(stakeClick) : handleApprove());
  }, [stakeClick]);

  useEffect(() => {
    unStakeClick !== 0 && handleUnstake();
  }, [unStakeClick]);

  // useEffect(() => {
  //   generateTokenIdsFromStakeIds();
  // }, [stakeIds]);

  useEffect(() => {
    handleIds();
    //generateTokenIdsFromStakeIds();
    pendingClaim();
  }, [legendCount, availableStructCount, structureStakedCount]);

  useEffect(() => {
    checkApproved();
    legendBalanceHandler();
    structBalanceHandler();
    checkStakedStruct();
    pendingClaim();
    pendingInterval();
  }, [swapUpdated]);

  return (
    <div className="kingdom min-h-[175vh] w-full md:min-h-[110vh] lg:min-h-[170vh]">
      <h1 className="px-2 pt-32 text-4xl font-semibold text-[#FEDC8C] sm:text-7xl md:mx-20 md:pt-40 lg:mx-[15rem] lg:pt-40">
        My Kingdom
      </h1>
      <h2 className="text-2xl font-bold text-white sm:text-4xl">
        $LEGEND in your wallet: {legendCount}
      </h2>

      { <Swap swapFunc={afterSwapHandler} /> }

      <div className="border-div m-auto mt-10 grid min-h-[100vh] w-[90%] grid-cols-1 place-content-center place-items-center gap-4 pb-4 sm:mt-20 sm:w-4/5  md:w-[95%] md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-10 xl:w-3/4">
        <div className='relative flex min-h-[36rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%]'>
          <div className="absolute my-4 mb-5 flex h-[87%] w-10/12 flex-col items-center bg-white">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-4xl">
              Lands
            </h2>
            <div className="h-[0.09rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 ml-4 self-start text-3xl font-bold md:text-2xl lg:text-3xl">
              Unstaked - {landStakedCount}
            </h2>
            <div className="h-[0.09rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Can Stake
            </h2>
            <div className="my-2">
              {stakeArray.length === 0 ? (
                <h2 className=" mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  No Land to Stake
                </h2>
              ) : (
                stakeArray
              )}
              <button
                className=" rounded-md bg-[#FEDC8C] px-4 py-2"
                //onClick={}
              >
                Stake Land
              </button>
            </div>
            <div className="h-[0.1rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2  ml-4 self-start text-2xl font-bold md:text-base">
              Staked
            </h2>
            <div>
              {stakedArray.length === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  No Staked Land
                </h2>
              ) : (
                stakeArray
              )}
              <button
                className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                //onClick={}
              >
                UnStake Land
              </button>
            </div>
          </div>
        </div>
        <div className='relative row-span-2 flex min-h-[40rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%] md:hidden lg:flex lg:min-h-[52rem]'>
          <div className="absolute my-4 mb-5 flex h-[87%] w-10/12 flex-col items-center bg-white">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-3xl lg:text-4xl">
              Leaderboard
            </h2>
            {leaderboardArray.map((item) => (
              <div className="stats-array flex w-10/12 items-center justify-between py-2 md:w-11/12 lg:w-10/12">
                <span>{item.idUser}</span>
                <span>{item.value}</span>
                <span>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='relative flex min-h-[56rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%]'>
          <div className="absolute my-4 mb-5 flex h-[87%] w-10/12 flex-col items-center bg-white">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-4xl">
              Structures
            </h2>
            <div className="h-[0.09rem] w-11/12 bg-slate-900"></div>
            <p className=" mt-2 text-xs">
              NOTE <br />
              Rewards begin 15 minutes after staking
            </p>
            <p className=" mt-2 text-sm">$Legends Earned</p>
            <span className=" text-xl ">
              {Math.round((claimBal + Number.EPSILON) * 100) / 100}
            </span>

            <button
              className=" mb-2 mt-2 rounded-md bg-[#FEDC8C] px-4 py-2"
              onClick={claimClickHandler}
            >
              Claim $Legend
            </button>
            <div className="h-[0.09rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Can Stake
            </h2>
            <div className="my-2">
              {availableStructCount === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  {availableStructCount || "No Structure to Stake"}
                </h2>
              ) : (
                <section className="slider-container">
                  <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={prevSlide}
                  />
                  {walletStructImages.map((item) => {
                    return (
                      <>
                        <div
                          className={
                            walletStructImages.indexOf(item) === walletCurImage
                              ? "  active"
                              : "slide"
                          }
                        >
                          {Object.keys(walletMap).length !== 0 &&
                            walletStructImages.indexOf(item) ===
                              walletCurImage && (
                              <img
                                key={walletStructImages.indexOf(item)}
                                src={walletMap[item].image}
                                alt={item}
                              />
                            )}
                          <button
                            className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                            onClick={() => {
                              stakeClickHandler(walletMap[item].name);
                            }}
                          >
                            {approved === true
                              ? "Stake Structure"
                              : "Approve Structure"}
                          </button>
                        </div>
                      </>
                    );
                  })}

                  {/* <img src={IMGBASEURL + 1 + ".png"} alt="" /> */}
                  <FaArrowAltCircleRight
                    className="right-arrow"
                    onClick={nextSlide}
                  />
                </section>
              )}
            </div>
            <div className="h-[0.1rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Staked
            </h2>
            <div>
              {structureStakedCount === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  {structureStakedCount || "No Staked Structure"}
                </h2>
              ) : (
                <section className="slider-container">
                  <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={prevStakedSlide}
                  />
                  {stakedIdsList.map((item) => {
                    return (
                      <div
                        className={
                          stakedIdsList.indexOf(item) === stakedCurImage
                            ? "  active"
                            : "slide"
                        }
                      >
                        {stakedIdsList.indexOf(item) === stakedCurImage && (
                          <img
                            key={stakedIdsList.indexOf(item)}
                            src={stakeMap[item]}
                            alt={item}
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* <img src={IMGBASEURL + 1 + ".png"} alt="" /> */}
                  <FaArrowAltCircleRight
                    className="right-arrow"
                    onClick={nextStakedSlide}
                  />
                </section>
              )}
              <button
                className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                onClick={
                  Number(structureStakedCount) > 0
                    ? unStakeClickHandler
                    : () => {}
                }
              >
                Unstake Structure
              </button>
            </div>
          </div>
        </div>
        <div className='relative col-span-2 row-span-2 hidden min-h-[40rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%] px-20 md:flex md:min-h-[52rem] lg:hidden'>
          <div className="absolute my-4 mb-5 flex h-[87%] w-10/12 flex-col items-center bg-white">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-3xl lg:text-4xl">
              Leaderboard
            </h2>
            {leaderboardArray.map((item) => (
              <div className="stats-array flex w-10/12 items-center justify-between py-2 md:w-11/12 lg:w-10/12">
                <span>{item.idUser}</span>
                <span>{item.value}</span>
                <span>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='relative flex min-h-[25rem] w-full items-center justify-center bg-[url("/src/Assets/Borders28.png")] bg-[length:100%_100%]'>
          <div className="absolute my-4 flex h-full w-[90%] flex-col items-center border-y-4 border-[#FEDC8C] bg-white">
            <h2 className="text-3xl font-bold sm:text-5xl md:text-4xl">
              Game Stats
            </h2>
            <div className="my-4 h-[0.1rem] w-11/12 bg-slate-900"></div>
            {statsArray.map((item) => (
              <div className="stats-array flex w-4/5 items-center justify-between py-4">
                <span>{item.name}:</span> {item.value}
              </div>
            ))}
          </div>
        </div>
        <div className='relative flex min-h-[25rem] w-full items-center justify-center bg-[url("/src/Assets/Borders28.png")] bg-[length:100%_100%]'>
          <div className="absolute my-4 flex h-full w-[90%] flex-col items-center border-y-4 border-[#FEDC8C] bg-white">
            <h2 className="text-3xl font-bold sm:text-5xl md:text-4xl">
              Kingdom
            </h2>
            <div className="my-4 h-[0.1rem] w-11/12 bg-slate-900"></div>
            {kingdomArray.map((item) => (
              <div className="stats-array flex w-4/5 items-center justify-between py-2">
                <span>{item.name}:</span> {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kingdom;
