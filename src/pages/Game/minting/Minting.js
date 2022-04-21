import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import requireContext from "require-context.macro";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import { ImageBundleImport } from "../../../components/ImageBundleImport";
import "./style.css";
import ProgressBar from "../../../components/ProgressBar";
import CarousalTailwind from "../../../components/carousel/CarousalTailwind";
import bolAbi from "../../../abi.json";
import erc20Abi from "../../../ERC20ABI.json";

const images = ImageBundleImport(
  requireContext("../../../Assets/Homebottom", false, /\.(png|jpe?g|svg)$/)
);
const imgLinks = Object.values(images);

const structContract = "0xa9dAb1D58BFDcB34615585e5c0bBE70e00C59bbC";

const legendAddress = "0x3CBef762A500968986E3410a94CbF8daA5cceC84";

const Minting = () => {
  //// check approve
  const [approved, setApproved] = useState(false);
  const [change, setChange] = useState(true);
  const [changeBal, setchangeBal] = useState(true);

  const [legendCount, setLegendCount] = useState(0);
  const mintCID = "ipfs://QmRFCGar2zMMW75RpvkNXJDtYVe4s8CHUk691DFVnd8kTr/";

  const checkApproved = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(legendAddress, erc20Abi, signer);
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
  checkApproved();

  /////count
  const [count, setCount] = useState(0);
  //const [countStructure, setCountStructure] = useState(0);

  const countAdd = () => {
    if (count >= 0) {
      setCount(count + 1);
    }
  };
  const countRemove = () => {
    if (count >= 1) {
      setCount(count - 1);
    }
  };
  // const countAddStructure = () => {
  //   if (countStructure >= 0) {
  //     setCountStructure(countStructure + 1);
  //   }
  // };
  // const countRemoveStructure = () => {
  //   if (countStructure >= 1) {
  //     setCountStructure(countStructure - 1);
  //   }
  // };

  const handleMint = async () => {
    if (window.ethereum) {
      const feeNum = count * 2;
      const valueFee = { value: ethers.utils.parseEther(`${feeNum}`) };
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, bolAbi, signer);
      try {
        //debugger;
        const response = await contract.mintToken(
          BigNumber.from(count),
          "", //place image logic in the quotes behind
          valueFee
        );
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const randMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(structContract, bolAbi, signer);
      try {
        //debugger;
        const lastId = await contract.getTokenCirculations();
        const response = await contract.randMint(
          legendAddress,
          `${mintCID}${BigNumber.from(lastId._hex).toNumber() + 1}.json`
        );
        response.wait().then((data) => {
          setChange((prevState) => !prevState);
          setchangeBal((prevState) => !prevState);
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const approveMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(legendAddress, erc20Abi, signer);

      try {
        //debugger;
        const response = await contract.approve(
          structContract,
          "20000000000000000000000000000"
        );
        response.wait().then((data) => {
          setChange((prevState) => !prevState);
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const balanceHandler = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(legendAddress, erc20Abi, signer);
      const address = await signer.getAddress().then(function (response) {
        return response;
      });
      try {
        //debugger;

        //\console.log(await address);
        const balanceBig = await contract.balanceOf(address);
        const balance = ethers.utils.formatEther(balanceBig);

        setLegendCount(Math.round(balance));
      } catch (error) {
        console.log("error", error);
        setchangeBal((prevState) => !prevState);
      }
    }
  };

  useEffect(() => {
    checkApproved();
  }, [change]);

  useEffect(() => {
    balanceHandler();
  }, [changeBal]);
  return (
    <div className="minting min-h-[175vh] w-full md:min-h-[110vh] lg:min-h-[130vh]">
      <h1 className="px-2 pt-40 text-6xl font-semibold text-[#FEDC8C] sm:text-7xl md:mx-20 md:pt-40 lg:mx-[15rem] lg:pt-40">
        MINTING
      </h1>
      <h2 className="text-4xl font-bold text-white">Season 1</h2>
      <div className="border-div m-auto mt-8 grid h-[70vh] w-[90%] grid-cols-1 gap-4  sm:w-3/5 md:w-[95%] md:grid-cols-2 lg:gap-48 xl:w-3/4">
        <div className='flex h-[37rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%]'>
          <div className="my-4 flex h-[87%] w-10/12 flex-col items-center justify-between bg-white">
            <h2 className="text-3xl font-bold sm:text-5xl md:text-4xl lg:text-5xl">
              Genesis Land
            </h2>
            <img src={imgLinks[0]} alt="Genesis Land" className="my-2" />
            <div className="flex">
              <ProgressBar progressPercentage="10" />
              <span className="ml-2">Minted</span>
            </div>
            <div className="pt-4">
              <p className="">You have 300 Avax</p>
              <p>Price: 2 Avax</p>
            </div>

            <div className="my-2 flex items-center justify-center">
              <MinusIcon
                className="block h-6 w-6 cursor-pointer"
                onClick={countRemove}
              />
              <span className="border-2 border-slate-900 px-2 py-1">
                {count}
              </span>
              <PlusIcon
                className="block h-6 w-6 cursor-pointer"
                onClick={countAdd}
              />
            </div>
            <button
              className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
              onClick={handleMint}
            >
              Mint Now
            </button>
          </div>
        </div>

        <div className='flex h-[37rem] w-full items-center justify-center bg-[url("/src/Assets/Borders-lg.png")] bg-[length:100%_100%]'>
          <div className="my-4 flex h-[87%] w-10/12 flex-col items-center justify-between bg-white">
            <h2 className="text-3xl font-bold sm:text-5xl md:text-4xl lg:text-5xl">
              Build a New Structure
            </h2>
            <CarousalTailwind />

            <div className="pt-2">
              <p className="">You have {legendCount} $Legends</p>
              <p>Price: 2,000 $Legends</p>
            </div>
            <div className="my-4 flex items-center justify-center"></div>
            <button
              className="mb-4 rounded-md bg-[#FEDC8C] px-4 py-2"
              onClick={approved === true ? randMint : approveMint}
            >
              {approved === true ? "Build Structure" : "Approve Legend"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minting;
