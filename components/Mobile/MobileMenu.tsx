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
import Link from 'next/link';

const MobileMenu = () => {
  const { sideOpen, setSideOpen } = useContext(MintingoContext);

  return (
    <div className="btm-nav relative z-[999]  bg-base-200">
      <button>
        <RiProfileLine size={22} />
        <span className="btm-nav-label">Profile</span>
      </button>

      <button className="  relative ">
        <Link href="/" className="">
          <Image
            src={LogoMintingoMobile}
            alt="logo"
            className="-mt-8 z-[3] w-full relative "
            width={45}
            height={375}
          />
          <div className="bg-base-200 p-7 rounded-full -top-7 left-[37px]  absolute "></div>
          <span className="btm-nav-label">Home</span>
        </Link>
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
