import Image from 'next/image';
import React from 'react';
import Usdt from '/public/assets/header/USDT.svg';
import Icon2 from '/public/assets/header/wallet-icon.svg';

const Balance = ({ data }) => {
  return (
    <div className="flex items-center">
      <div className="relative font-jost text-white-text flex items-center bg-gray-side py-3 px-5 w-max shadow-[inset_0px_1px_4px_rgba(0,0,0,0.2)] rounded-l-full outline-none h-[48px]">
        <span className="absolute left-3">
          <Image src={Usdt} height={20} width={20} alt="usdt" />
        </span>
        <span className="ml-6 mr-4">{data?.formatted}</span>
      </div>

      <button className="flex w-max -ml-5 z-10  ">
        <div
          className={`flex text-base space-x-2 items-center border-gray-highlight border-[1px] hover:bg-gray-highlight transition-all font-semibold  justify-center h-[48px]
         bg-gray-box  py-3 px-5
         rounded-full text-white`}
        >
          <div className="">
            <Image src={Icon2} width={22} height={22} alt="wallet" />
          </div>
          <div className="sm:flex hidden">Wallet</div>
        </div>
      </button>
    </div>
  );
};

export default Balance;
