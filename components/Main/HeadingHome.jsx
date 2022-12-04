import { AccountButton } from '@web3modal/react';
import React from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';

const HeadingHome = () => {
  return (
    <div className="flex p-4 md:h-[500px] h-[400px] items-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl font-bold">GET UP TO $1500 BONUS</h1>
        <p className="text-2xl font-semibold text-base-content">
          REGISTER AND GET YOUR BONUS
        </p>
        <button className="btn max-w-max btn-primary gap-2">
          <RiAccountCircleLine size={23} /> Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default HeadingHome;
