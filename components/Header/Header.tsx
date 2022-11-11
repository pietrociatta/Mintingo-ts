import React, { useContext, useEffect, useRef, useState } from 'react';
import Hamburger from '/public/assets/header/hamburger-icon.svg';
import LogoMintingo from '/public/assets/header/logo_mintingo.png';
import LogoMintingoMobile from '/public/assets/header/logo_single.png';

import Image from 'next/image';
import { motion } from 'framer-motion';

import {
  RiCoinsLine,
  RiLogoutCircleRLine,
  RiProfileFill,
  RiProfileLine,
  RiSearch2Line,
} from 'react-icons/ri';
import { Web3Button, useBalance, useDisconnect } from '@web3modal/react';
import { MintingoContext } from '../../context/MintingoContext';
import Balance from './Balance';
import Profile from './Profile';
import { FiChevronLeft } from 'react-icons/fi';

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { account, sideOpen, setSideOpen } = useContext(MintingoContext);
  const { data, error, isLoading, refetch } = useBalance({
    addressOrName: account.address,
    token: '0x55d398326f99059fF775485246999027B3197955',
  });
  const disconnect = useDisconnect();
  const [searchShowed, setSearchShowed] = useState(true);
  const searchInput = useRef();
  const onChange = (e) => {
    if (e.target.value) {
      setSearchShowed(false);
    } else {
      setSearchShowed(true);
    }
  };

  return (
    <div className="fixed  justify-between items-cxenter w-full bg-gradient-to-t px-[15px] from-gray-box to-gray-box flex h-[70px] shadow-xl ">
      <div className="flex items-center ">
        {sideOpen ? (
          <button
            className="md:flex hidden "
            onClick={() => setSideOpen(!sideOpen)}
          >
            <FiChevronLeft
              size={33}
              className="bg-gray-box p-1  border-gray-highlight border-[2px]  rounded-lg"
            />
          </button>
        ) : (
          <button
            className="md:flex hidden "
            onClick={() => setSideOpen(!sideOpen)}
          >
            <Image
              src={Hamburger}
              alt="hamburger"
              width={33}
              height={33}
              className="bg-gray-box  p-1 border-gray-highlight border-[2px]  rounded-lg"
            />
          </button>
        )}
        <div className="md:flex ml-4 hidden w-[200px]">
          <Image src={LogoMintingo} alt="logo" width={1445} height={375} />
        </div>{' '}
        <div className="md:hidden flex w-[45px] ">
          <Image
            src={LogoMintingoMobile}
            alt="logo"
            width={1445}
            height={375}
          />
        </div>
      </div>
      <div className="relative font-jost text-white-text lg:flex hidden items-center">
        <input
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          className="bg-gray-side py-3 px-5 w-[300px] shadow-[inset_0px_1px_4px_rgba(0,0,0,0.2)] rounded-full outline-none"
          placeholder="Cerca una Collezione..."
          ref={searchInput}
          onChange={onChange}
        />
        {searchShowed && (
          <RiSearch2Line
            size={20}
            className="absolute my-auto right-3   text-white-text"
          />
        )}
      </div>

      <div className="flex items-center  ">
        {account.isConnected && (
          <div className="flex items-center space-x-4 cursor-pointer ">
            <Balance data={data} />
            <Profile
              account={account}
              setProfileOpen={setProfileOpen}
              profile={profileOpen}
            />
          </div>
        )}
        {!account.isConnected && <Web3Button />}
      </div>

      <div
        className={`${
          profileOpen
            ? 'absolute flex  justify-center bg-gray-box h-[300px] right-[15px] top-[80px] rounded-2xl w-[180px]'
            : 'hidden'
        }`}
      >
        <ul className="font-semibold text-white-text items-center w-full pt-[1px] flex flex-col ">
          <li className="flex gap-2 hover:bg-gray-highlight/30 w-full justify-center py-4 rounded-t-2xl cursor-pointer">
            <span>
              <RiCoinsLine size={22} />
            </span>
            My NFTs
          </li>
          <li
            onClick={() => {
              disconnect();
              setProfileOpen(false);
            }}
            className="flex gap-2 hover:bg-gray-highlight/30 w-full justify-center py-4 cursor-pointer  "
          >
            <span>
              <RiLogoutCircleRLine size={22} />
            </span>
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
