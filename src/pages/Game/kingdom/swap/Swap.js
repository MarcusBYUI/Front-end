import { React, useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import oldbolAbi from "../../../../oldabi.json";
import bolAbi from "../../../../oldbol.json";

import "./style.css";

const Swap = (props) => {
  //variables
  //
  //
  //
  //
  //
  const oldStructContract = "0xE5BAcF109acE926f8352c8C7BaC8d7B678798583";
  const newStructContract = "0x399C143e1100Bdd35035D9A52D4c681e6427640b";
  const mintCID = "ipfs://QmRFCGar2zMMW75RpvkNXJDtYVe4s8CHUk691DFVnd8kTr/";

  //states
  //
  //
  //
  //
  //
  const [click, setClick] = useState(0);
  const [approve, setApprove] = useState(false);
  const [tokenId, settokenId] = useState([]);

  //functions
  //
  //
  //
  //
  //
  const handleIds = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(oldStructContract, bolAbi, signer);
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

        settokenId(idSet);
        //setstakedIdsList(IdList);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const swapHandler = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(newStructContract, bolAbi, signer);
      const oldContract = new ethers.Contract(
        oldStructContract,
        oldbolAbi,
        signer
      );

      try {
        //debugger;
        //const oldtokenURI = await oldContract.tokenURI(371);
        //const test = [21];
        const tokenURI = await Promise.all(
          tokenId.map(async (token) => {
            const oldtokenURI = await oldContract.tokenURI(token);
            return oldtokenURI;
          })
        );

        const response = await contract.swap(
          oldStructContract,
          tokenId,
          tokenURI
        );
        response.wait().then((data) => {
          handleIds();
          props.swapFunc();
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const approveHandler = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        oldStructContract,
        oldbolAbi,
        signer
      );

      try {
        //debugger;
        const response = await contract.setApprovalForAll(
          newStructContract,
          true
        );
        response.wait().then((data) => {
          setApprove(true);
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const checkApprove = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        oldStructContract,
        oldbolAbi,
        signer
      );
      const address = await signer.getAddress().then((response) => {
        return response;
      });
      try {
        //debugger;
        const response = await contract.isApprovedForAll(
          address,
          newStructContract
        );
        response ? setApprove(true) : setApprove(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const clickHandler = () => {
    setClick((prevState) => prevState + 1);
  };

  //useEffects
  //
  //
  //
  //
  //
  useEffect(() => {
    if (approve) {
      click !== 0 && swapHandler();
    } else {
      click !== 0 && approveHandler();
    }
  }, [click]);

  useEffect(() => {
    checkApprove();
    handleIds();
  }, []);

  // Return
  //
  //
  //
  //
  //
  return (
    <div>
      {tokenId.length > 0 ? (
        <div className="swap-container">
          <h2>Swap Structs To V2</h2>
          <button onClick={clickHandler}>
            {approve ? "V2 Swap" : "Approve"}
          </button>
        </div>
      ) : (
        <h2 className="no-swap">No Structure To Swap</h2>
      )}
    </div>
  );
};

export default Swap;
