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
const MobileMenu = () => {
  const { sideOpen, setSideOpen } = useContext(MintingoContext);

  return (
    <div className="w-full flex items-center  justify-between bg-gray-box py-3 px-[15px]">
      <div
        onClick={() => setSideOpen(!sideOpen)}
        className="flex space-y-1 flex-col items-center justify-center"
      >
        <Image src={Hamburger} width={20} height={20} alt="hamburger" />
        <p className="text-xs">Menu</p>
      </div>
      <div className="flex space-y-1 flex-col items-center justify-center">
        <RiCoinsLine size={22} />
        <p className="text-xs">My NFTs</p>
      </div>
      <div className="flex space-y-1 flex-col items-center justify-center">
        <RiProfileLine size={22} />
        <p className="text-xs">Profile</p>
      </div>
    </div>
  );
};

export default MobileMenu;
