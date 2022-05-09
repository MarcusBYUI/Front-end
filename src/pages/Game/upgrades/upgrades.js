import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import erc20Abi from "../../../ERC20ABI.json";
import stakingAbi from "../../../stakinABI.json";
import bolAbi from "../../../abi.json";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import oldbolAbi from "../../../oldabi.json";

import "./upgrades.css";

const Upgrades = () => {
  const legendContract = "0xB6cEAdcd2A31F9d386111F3B3aeDcafCfCEF20e5";
  const structContract = "0xEa7e0f9D35dB45ec28447eB99CCb966CFB7E7d8E";
  const bolstakingContract = "0x4B5326A77E3F22b5760d0318cb2D08c1083039A1";
  const IMGBASEURL =
    "https://bol.mypinata.cloud/ipfs/QmbT92ijUi3iJXJv9zz1yJxMaRDkC9LyExUAQd8b5n3eie/";

  const [structureStakedCount, setStructureStakedCount] = useState(0);
  const [availableStructCount, setAvailableStructCount] = useState(0);
  const [approved, setApproved] = useState(false);
  const [stakeIds, setStakeIds] = useState([]);
  const [tokenId, settokenId] = useState([]);
  const [stakeClick, setStakeClick] = useState(0);
  const [unStakeClick, setUnStakeClick] = useState(0);
  const [walletMap, setWalletMap] = useState({});
  const [stakeMap, setStakeMap] = useState({});

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
          for (let i = 0; i < balanceOf; i++) {
            const walletTokenId = await contract.tokenOfOwnerByIndex(
              address,
              i
            );
            idSet.push(BigNumber.from(walletTokenId).toString());
          }
        }

        await loop();

        //get ongoing upgrades
        console.log("wallet Bal");
        //const isUpgradingBalance = await contract.upgradingBalance(address);
        const isUpgradingBalance = 1;

        const upgradingSet = [];

        async function upgradingloop() {
          for (let i = 0; i < isUpgradingBalance; i++) {
            const upgradingTokenId = await contract.isUpgrading(address, i);
            upgradingSet.push(BigNumber.from(upgradingTokenId).toString());
          }
        }

        await loop();

        console.log("wallet Bal", idSet);
        console.log("upgrading Bal", upgradingSet);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const prevSlide = () => {
    const length = walletStructImages.length;

    setupgradeableCurImage(
      upgradeableCurImage === 0 ? length - 1 : upgradeableCurImage - 1
    );
  };

  const nextSlide = () => {
    const length = walletStructImages.length;
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

  const prevStakedSlide = () => {
    const length = pendingIdsList.length;

    setpendingCurImage(
      pendingCurImage === 0 ? length - 1 : pendingCurImage - 1
    );
  };

  const nextStakedSlide = () => {
    const length = pendingIdsList.length;
    setpendingCurImage(
      pendingCurImage === length - 1 ? 0 : pendingCurImage + 1
    );
  };
  //
  //

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

        const imageURI = await Promise.all(
          FetchURI.map(async (link) => {
            const response = await fetch(link);
            const data = await response.json();
            return data.image;
          })
        );
        let idImgsDic = {};
        for (let i = 0; i < walletStructImages.length; i++) {
          idImgsDic[`${walletStructImages[i]}`] = imageURI[i];
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
        // const tokenURI = await Promise.all(
        //   stakedIdsList.map(async (token) => {
        //     const oldtokenURI = await contract.tokenURI(token);
        //     return oldtokenURI;
        //   })
        // );
        // const FetchURI = await Promise.all(
        //   tokenURI.map(async (ipfs) => {
        //     return ipfs.replace("ipfs://", `${startURL}`);
        //   })
        // );
        // const imageURI = await Promise.all(
        //   FetchURI.map(async (link) => {
        //     const response = await fetch(link);
        //     const data = await response.json();
        //     return data.image;
        //   })
        // );
        // let idImgsDic = {};
        // for (let i = 0; i < stakedIdsList.length; i++) {
        //   idImgsDic[`${stakedIdsList[i]}`] = imageURI[i];
        // }
        // console.log(idImgsDic);
        // setStakeMap(idImgsDic);
        //console.log(imageURI, "Na we");
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

        //console.log(await address);
        const balanceBig = await contract.balanceOf(address);
        const balance = ethers.utils.formatEther(balanceBig);

        // setLegendCount(Math.round(balance));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const checkUpgradeableStruct = async () => {
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

  const checkUpgradingStruct = async () => {
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

  const handleUpgradeFee = async () => {
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
        //getRandomInt(availableStructCount);

        try {
          //debugger;
          const response = await contract.stake(
            structContract,
            //tokenId[walletCurImage],
            legendContract
          );
          response.wait().then((data) => {
            // update the front end bal before the blockchain data returns
            setStructureStakedCount((prevState) => prevState + 1);
            setAvailableStructCount((prevState) => prevState - 1);
            // structBalanceHandler();
            // checkStakedStruct();
            //generateTokenIdsFromStakeIds();
          });
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  const handleCompleteUpgrade = async () => {
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
        // const response = await contract.unstake(
        //   stakeIdTokenIdDic[stakedIdsList[stakedCurImage]]
        // );
        // response.wait().then((data) => {
        //   setStructureStakedCount((prevState) => prevState - 1);
        //   setAvailableStructCount((prevState) => prevState + 1);
        //   structBalanceHandler();
        //   checkStakedStruct();
        //generateTokenIdsFromStakeIds();
        //});
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  //
  //

  useEffect(() => {
    handleIds();
    checkApproved();
  }, []);
  //

  return (
    <div className="upgrades-body">
      <div className="upgrades-header">
        <h1>Upgrades</h1>
        <h2>$LEGEND in your wallet: 10000</h2>
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
              {"availableStructCount" === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  {"availableStructCount" || "No Structure to Stake"}
                </h2>
              ) : (
                <section className="slider-container">
                  <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={"prevSlide"}
                  />
                  {walletStructImages.map((item) => {
                    return (
                      <div
                        className={
                          walletStructImages.indexOf(item) ===
                          upgradeableCurImage
                            ? "  active"
                            : "slide"
                        }
                      >
                        {walletStructImages.indexOf(item) ===
                          upgradeableCurImage && (
                          <img
                            key={walletStructImages.indexOf(item)}
                            src={walletMap[item]}
                            alt={item}
                          />
                        )}
                      </div>
                    );
                  })}

                  <img src={IMGBASEURL + 1 + ".png"} alt="" />
                  <FaArrowAltCircleRight
                    className="right-arrow"
                    onClick={"nextSlide"}
                  />
                </section>
              )}
              <button
                className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                onClick={"stakeClickHandler"}
              >
                {"approved" === true ? "Stake Structure" : "Approve Structure"}
              </button>
            </div>
            <div className="h-[0.1rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Pending Upgrades
            </h2>
            <div>
              {"structureStakedCount" === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  {"structureStakedCount" || "No Staked Structure"}
                </h2>
              ) : (
                <section className="slider-container">
                  <FaArrowAltCircleLeft
                    className="left-arrow"
                    onClick={prevStakedSlide}
                  />
                  {pendingIdsList.map((item) => {
                    return (
                      <div
                        className={
                          pendingIdsList.indexOf(item) === pendingCurImage
                            ? "  active"
                            : "slide"
                        }
                      >
                        {pendingIdsList.indexOf(item) === pendingCurImage && (
                          <img
                            key={pendingIdsList.indexOf(item)}
                            src={stakeMap[item]}
                            alt={item}
                          />
                        )}
                      </div>
                    );
                  })}

                  <img src={IMGBASEURL + 1 + ".png"} alt="" />
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
                    ? "unStakeClickHandler"
                    : () => {}
                }
              >
                Unstake Structure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrades;
