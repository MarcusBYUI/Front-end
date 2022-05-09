import React, { Fragment, useState, useEffect, useRef } from "react";
import Web3Modal from "web3modal";
import { providers } from "ethers";

import img1 from "../../Assets/Logo_1-01_rojo-01 2.png";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link as RouteLink } from "react-router-dom";
import "./style.css";
import ModelView from "../Landing-Page/Model";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [openIt, setOpenIt] = useState(false);

  const [connectedWallet, setConnectedWallet] = useState(false);
  const [messageInfo, setMessageInfo] = useState();
  const [accountsList, setAccountsList] = useState();
  const [networkID, setNetworkID] = useState();
  const [provider, setProvider] = useState();
  const web3ModalRef = useRef();

  const getProvider = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const accounts = await web3Provider.listAccounts();
    const { chainId } = await web3Provider.getNetwork();
    setProvider(provider);
    setAccountsList(accounts);
    setNetworkID(chainId);
    // if (chainId == 1) {
    // 	alert('Hello,its true');
    // }
    if (needSigner) {
      const signer = await web3Provider.getSigner();

      return signer;
    }

    return provider;
  };

  const connectWallet = async () => {
    try {
      await getProvider();
      setConnectedWallet(true);
      setMessageInfo("Connected");
    } catch (error) {
      setMessageInfo(error.message);

      throw new Error(error);
    }
  };

  const dis_connect_Wallet = async () => {
    await web3ModalRef.current.clearCachedProvider();
    setMessageInfo("wallet disconnected");
    setNetworkID("");
    setAccountsList("");
  };

  const openModel = () => {
    setOpenIt(!openIt);
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: {}, // required
    });
  }, []);

  useEffect(() => {
    if (web3ModalRef.current.cachedProvider) {
      connectWallet();
    }
  }, []);
  // useEffect(() => {
  // 	if (provider?.on) {
  // 		const handleDisconnect = () => {
  // 			console.log('disconnect');
  // 			dis_connect_Wallet();
  // 		};
  // 		provider.on('disconnect', handleDisconnect);
  // 	}
  // }, [provider]);

  return (
    <>
      <Disclosure as="nav" className="fixed z-50 w-screen bg-gray-600/90 py-4">
        {({ open }) => (
          <>
            <div className="container mx-auto max-w-7xl px-2 py-1 md:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-center md:justify-between lg:justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-between sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <a
                        href="https://twitter.com/brawloflegends?s=11"
                        className="rounded-md px-3 py-2 text-base font-medium text-[#FEDB8C] hover:bg-gray-700 hover:text-white"
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                      <a
                        href="https://discord.gg/brawloflegends"
                        className="rounded-md px-3 py-2 text-base font-medium text-[#FEDB8C] hover:bg-gray-700 hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          className="h-6 w-6"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-shrink-0 flex-col items-center justify-center self-center">
                  <RouteLink to="/">
                    <img
                      className="block h-8 w-auto md:hidden lg:hidden"
                      src={img1}
                      alt="Workflow"
                    />
                  </RouteLink>
                  <RouteLink to="/">
                    <img
                      className="hidden md:block md:h-16 md:w-64 lg:block lg:h-16 lg:w-64"
                      src={img1}
                      alt="Workflow"
                    />
                  </RouteLink>
                  <div className="hidden justify-around pt-1 sm:flex sm:w-[20rem] lg:w-[30rem]">
                    <RouteLink
                      to="/team"
                      className="mr-4 font-semibold text-[#FEDB8C] md:mr-2 lg:mr-0"
                    >
                      Team
                    </RouteLink>
                    <RouteLink
                      to="/minting"
                      className="mx-2 font-semibold text-[#FEDB8C]"
                    >
                      Minting
                    </RouteLink>
                    <RouteLink
                      to="/my_kingdom"
                      className="mx-2 font-semibold text-[#FEDB8C]"
                    >
                      Kingdom
                    </RouteLink>
                    <RouteLink
                      to="/upgrades"
                      className="mx-2 font-semibold text-[#FEDB8C]"
                    >
                      Upgrades
                    </RouteLink>
                    <a
                      href="https://brawl-of-legends.gitbook.io/brawl-of-legends-whitepaper/"
                      target="_blank"
                      className="ml-4 font-semibold text-[#FEDB8C] md:ml-2 lg:ml-0"
                    >
                      Whitepaper
                    </a>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center pt-1 sm:hidden">
                    <div className="flex items-center justify-center">
                      {" "}
                      <RouteLink
                        to="team"
                        className="mr-2 font-semibold text-[#FEDB8C]"
                      >
                        Team
                      </RouteLink>
                      <RouteLink
                        to="/minting"
                        className="ml-2 font-semibold text-[#FEDB8C]"
                      >
                        Minting
                      </RouteLink>
                    </div>
                    <div className="flex items-center justify-center">
                      {" "}
                      <RouteLink
                        to="/my_kingdom"
                        className="mr-4 font-semibold text-[#FEDB8C]"
                      >
                        Kingdom
                      </RouteLink>
                      <a
                        href="https://brawl-of-legends.gitbook.io/brawl-of-legends-whitepaper/"
                        target="_blank"
                        className="ml-4 font-semibold text-[#FEDB8C]"
                      >
                        Whitepaper
                      </a>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
									type='button'
									className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
								>
									<span className='sr-only'>View notifications</span>
									<BellIcon className='h-6 w-6' aria-hidden='true' />
								</button> */}

                  {/* Profile dropdown */}
                  <Menu
                    as="div"
                    className="relative ml-3 flex flex-col lg:flex-row"
                  >
                    <button
                      name="play-game-now"
                      className="mb-1 flex items-center justify-center rounded-md bg-[#FEDB8C] py-2 px-3  text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#cbaf70] focus:ring-offset-2 focus:ring-offset-gray-800 md:py-2 md:px-7 lg:mr-2 lg:mb-0 lg:py-2 lg:px-7"
                      onClick={openModel}
                    >
                      Play
                    </button>
                    <button
                      name="play-game-now"
                      className="mt-1 flex items-center justify-center rounded-md bg-[#FEDB8C] py-2 px-3  text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#cbaf70] focus:ring-offset-2 focus:ring-offset-gray-800 md:py-2 md:px-7 lg:ml-2 lg:mt-0 lg:py-2 lg:px-3"
                      onClick={connectWallet}
                    >
                      {messageInfo == undefined ||
                      messageInfo == "User Rejected"
                        ? "Connect"
                        : "Connected"}
                    </button>

                    {/* <Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Your Profile
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Settings
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														Sign out
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition> */}
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="flex items-center justify-around space-y-1 px-2 pt-2 pb-3">
                <Disclosure.Button
                  as="a"
                  href="https://twitter.com/brawloflegends?s=11"
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#FEDB8C] hover:bg-gray-700 hover:text-white"
                >
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="https://discord.gg/brawloflegends"
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#FEDB8C] hover:bg-gray-700 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="h-6 w-6"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
                      fill="currentColor"
                    />
                  </svg>
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <ModelView openIt={openIt} openModel={openModel} />
    </>
  );
};

export default Navbar;
