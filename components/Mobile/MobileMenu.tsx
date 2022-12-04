import Image from 'next/image';
import React, { useContext } from 'react';
import Hamburger from '/public/assets/header/hamburger-icon.svg';
import {
  RiCoinsLine,
  RiLogoutCircleRLine,
  RiProfileFill,
  RiProfileLine,
  RiSearch2Line,
} from 'react-icons/ri';
import { MintingoContext } from '../../context/MintingoContext';
import LogoMintingoMobile from '/public/assets/header/logo_single.png';

const MobileMenu = () => {
  const { sideOpen, setSideOpen } = useContext(MintingoContext);

  return (
    <div className="btm-nav relative z-[999]  bg-base-200">
      <button>
        <RiProfileLine size={22} />
        <span className="btm-nav-label">Profile</span>
      </button>
      <button className=" relative ">
        <Image
          src={LogoMintingoMobile}
          alt="logo"
          className="-mt-8 z-[2] "
          width={45}
          height={375}
        />
        <div className="bg-base-200 p-7 rounded-full -top-8 absolute z-1"></div>
        <span className="btm-nav-label">Home</span>
      </button>
      <button onClick={() => setSideOpen(!sideOpen)}>
        <Image
          src={Hamburger}
          className=""
          width={20}
          height={20}
          alt="hamburger"
        />
        <span className="btm-nav-label">Menu</span>
      </button>
    </div>
  );
};

export default MobileMenu;
