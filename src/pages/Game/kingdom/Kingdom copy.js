import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import erc20Abi from "../../../ERC20ABI.json";
import stakingAbi from "../../../stakinABI.json";
import bolAbi from "../../../abi.json";

import "./style.css";
import Structures from "../../Landing-Page/Structures/index";
import { isDisabled } from "@testing-library/user-event/dist/utils";
const Kingdom = () => {
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
    { name: "Lands Minted", value: 5 },
    { name: "Structures Minted", value: 6 },
    { name: "Lands Staked", value: 4 },
    { name: "Structures Staked", value: 4 },
    { name: "$LEGEND Claimed", value: 976.94 },
  ]);
  const [kingdomArray, setKingdomArray] = useState([
    { name: "Lands Staked", value: 4 },
    { name: "Structures Staked", value: 4 },
    { name: "$LEGEND Claimed", value: 976.94 },
    { name: "Space Available", value: 5 },
    { name: "Kingdom ATK", value: 50 },
    { name: "Kingdom DEF", value: 67 },
    { name: "Kingdom UTIL", value: 42 },
  ]);
  const [leaderboardArray, setLeaderboardArray] = useState([
    { idUser: "0xE410", value: 4, tag: "$LEGEND" },
    { idUser: "0xE411", value: 4, tag: "$LEGEND" },
    { idUser: "0xE412", value: 976.94, tag: "$LEGEND" },
    { idUser: "0xE413", value: 5, tag: "$LEGEND" },
    { idUser: "0xE414", value: 50, tag: "$LEGEND" },
    { idUser: "0xE415", value: 67, tag: "$LEGEND" },
    { idUser: "0xE416", value: 42, tag: "$LEGEND" },
  ]);

  const legendContract = "0xB6cEAdcd2A31F9d386111F3B3aeDcafCfCEF20e5";
  const structContract = "0x1A46Dd62c4CC8639562E907E3718b099E05AD27E";
  const bolstakingContract = "0xBC40Db08b18a59f447A79A4Bd1BABe99b254513D";
  const rewardToken = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";

  const [change, setChange] = useState(true);
  const [approved, setApproved] = useState(false);
  const [stakeIds, setStakeIds] = useState([]);
  const [tokenId, settokenId] = useState(0);

  //monitor changes
  const [structChange, setStructChange] = useState(false);
  const [structIdChange, setIdChange] = useState(false);
  const [structstake, setStructStake] = useState(false);

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
        setChange((prevState) => !prevState);
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

        setAvailableStructCount(Math.round(balance));
        setStructChange((prevState) => !prevState);
      } catch (error) {
        console.log("error", error);
        setChange((prevState) => !prevState);
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

        stakeIds.forEach(function (element) {
          ids.push(element.stakeId);
        });
        setStakeIds([...ids]);

        setStructureStakedCount(ids.length);
      } catch (error) {
        console.log("error", error);
        setChange((prevState) => !prevState);
      }
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const handleStake = async () => {
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

        try {
          //debugger;
          const response = await contract.stake(
            structContract,
            tokenId,
            rewardToken
          );
          response.wait().then((data) => {
            console.log(data);
            setChange((prevState) => !prevState);
            setStructChange((prevState) => !prevState);
            setIdChange((prevState) => !prevState);
            setStructStake((prevState) => !prevState);
          });
        } catch (error) {
          console.log("error", error);
          setChange((prevState) => !prevState);
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
        setStructChange((prevState) => !prevState);
        setIdChange((prevState) => !prevState);
        setStructStake((prevState) => !prevState);
      } catch (error) {
        console.log("error", error);
        setChange((prevState) => !prevState);
      }
    }
  };
  checkApproved();

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
          console.log(data);
          setChange((prevState) => !prevState);
        });
      } catch (error) {
        console.log("error", error);
        setChange((prevState) => !prevState);
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
        const response = await contract.unstake(stakeIds[0]);
        response.wait().then((data) => {
          setChange((prevState) => !prevState);
          setStructChange((prevState) => !prevState);
          setIdChange((prevState) => !prevState);
          setStructStake((prevState) => !prevState);
        });
      } catch (error) {
        console.log("error", error);
        setChange((prevState) => !prevState);
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
        //debugger;
        const changedIds = await contract.ownershipChangeIds(address);
        const mintIds = await contract.getIds(address);
        changedIds.forEach(function (element) {
          const num = BigNumber.from(element._hex).toNumber();
          idSet.push(num);
        });
        mintIds.forEach(function (element) {
          const num = BigNumber.from(element._hex).toNumber();
          idSet.push(num);
        });

        //filter Ids
        for (let i = 0; i <= idSet.length; i++) {
          let count = 0;
          let num = idSet[i];
          idSet.forEach((element) => {
            if (element === num) {
              count++;

              if (count === 2) {
                idSet.splice(idSet.indexOf(element), 1);
                idSet.splice(idSet.indexOf(element), 1);
                count = 0;
                i -= 2;
              }
            }
          });
        }
        //End Of Filter
        settokenId(idSet[0]);
      } catch (error) {
        console.log("error", error);
        setChange((prevState) => !prevState);
      }
    }
  };
  useEffect(() => {
    checkApproved();
    legendBalanceHandler();
  }, [change]);
  useEffect(() => {
    handleIds();
  }, [structIdChange]);
  useEffect(() => {
    checkStakedStruct();
  }, [structstake]);
  useEffect(() => {
    structBalanceHandler();
  }, [structChange]);
  return (
    <div className="kingdom min-h-[175vh] w-full md:min-h-[110vh] lg:min-h-[170vh]">
      <h1 className="px-2 pt-32 text-4xl font-semibold text-[#FEDC8C] sm:text-7xl md:mx-20 md:pt-40 lg:mx-[15rem] lg:pt-40">
        My Kingdom
      </h1>
      <h2 className="text-2xl font-bold text-white sm:text-4xl">
        $LEGEND in your wallet: {legendCount}
      </h2>

      <div className="border-div m-auto mt-10 grid min-h-[100vh] w-[90%] grid-cols-1 place-content-center place-items-center gap-4 pb-4 sm:mt-20 sm:w-4/5  md:w-[95%] md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-10 xl:w-3/4">
        <div className='relative flex min-h-[30rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%]'>
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
                stakeArray.map((item, index) => (
                  <img key={index} src={item} alt={index} />
                ))
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
                stakeArray.map((item, index) => (
                  <img key={index} src={item} alt={index} />
                ))
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
        <div className='relative flex min-h-[30rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%] sm:min-h-[25rem]'>
          <div className="absolute my-4 mb-5 flex h-[87%] w-10/12 flex-col items-center bg-white">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-4xl">
              Structures
            </h2>
            <div className="h-[0.09rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 flex w-full flex-col items-center justify-evenly self-start text-2xl font-bold sm:flex-row sm:text-2xl md:text-2xl">
              Unstaked -
              <span className=" text-sm">Available : {availableCount}</span>
            </h2>
            <div className="h-[0.09rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Can Stake
            </h2>
            <div className="my-2">
              {stakeStructureArray.length === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  {availableStructCount || "No Structure to Stake"}
                </h2>
              ) : (
                stakeArray.map((item, index) => (
                  <img key={index} src={item} alt={index} />
                ))
              )}
              <button
                className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                onClick={approved === true ? handleStake : handleApprove}
              >
                {approved === true ? "Stake Structure" : "Approve Structure"}
              </button>
            </div>
            <div className="h-[0.1rem] w-11/12 bg-slate-900"></div>
            <h2 className="my-2 ml-4 self-start text-2xl font-bold md:text-base">
              Staked
            </h2>
            <div>
              {stakedStructureArray.length === 0 ? (
                <h2 className="mb-4 bg-[#FEDC8C] text-2xl font-bold text-black md:text-base">
                  {structureStakedCount || "No Staked Structure"}
                </h2>
              ) : (
                stakeArray.map((item, index) => (
                  <img key={index} src={item} alt={index} />
                ))
              )}
              <button
                className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
                onClick={
                  Number(structureStakedCount) > 0 ? handleUnstake : () => {}
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
