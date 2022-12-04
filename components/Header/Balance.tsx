import Image from 'next/image';
import React from 'react';
import Usdt from '/public/assets/header/USDT.svg';
import Icon2 from '/public/assets/header/wallet-icon.svg';
import WalletModal from '../Main/HeadingHome';
import { FiCheck, FiCopy, FiLogOut } from 'react-icons/fi';

import { useDisconnect } from '@web3modal/react';

const Balance = ({ data, account }) => {
  const balance = Number(data?.formatted);

  return (
    <div className="">
      <div className="flex items-center">
        <div className="relative font-jost text-white-text flex items-center bg-neutral py-3 px-5 w-max shadow-[inset_0px_1px_4px_rgba(0,0,0,0.2)] rounded-l-full outline-none h-[48px]">
          <span className="absolute left-3">
            <Image src={Usdt} height={20} width={20} alt="usdt" />
          </span>
          <span className="ml-6 mr-4">{balance.toFixed(2)}</span>
        </div>

        <button className="flex w-max -ml-5 z-10  ">
          <label htmlFor="my-modal-6">
            <div
              className={`flex text-base btn btn-ghost normal-case  space-x-2 items-center border-gray-highlight border-[1px] hover:bg-gray-highlight transition-all font-semibold  justify-center h-[48px]
         bg-base-100  py-3 px-5
         rounded-full text-white`}
            >
              <div className="">
                <Image src={Icon2} width={22} height={22} alt="wallet" />
              </div>

              <div>Wallet</div>
            </div>
          </label>
        </button>

        {/* Put this part before </body> tag */}
      </div>
      <div className="relative z-[30]">
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal   md:bottom-0 bottom-[64px] modal-bottom  sm:modal-middle">
          <div className="modal-box bg-base-100">
            <label
              htmlFor="my-modal-6"
              className="btn text-xl btn-ghost absolute right-2 top-3"
            >
              ✕
            </label>
            <h3 className="font-bold text-xl">Your Wallet</h3>
            <div className="flex mt-5 relative items-center gap-3 py-2 px-3  bg-base-200 rounded-full justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    'https://avatars.dicebear.com/api/pixel-art-neutral/' +
                    account?.address +
                    '.svg'
                  }
                  alt="profile"
                  className="rounded-full w-[30px] "
                />
                <p className="">{`${account?.address.slice(
                  0,
                  10
                )}...${account?.address.slice(-10)}`}</p>
              </div>
              <FiCopy size={20} className="cursor-pointer" />
            </div>
            <div>
              <h3 className="font-bold text-xl mt-5">Your Balance</h3>
              <div className="overflow-x-hidden mt-5 w-full">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr className="">
                      <td className="bg-base-200 border-base-100 border-t-[1px]">
                        <div className="flex  items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-11 h-11">
                              <img
                                src="/assets/header/USDT.svg"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">USDT</div>
                            <div className="text-sm opacity-50">Binance</div>
                          </div>
                        </div>
                      </td>
                      <td className="bg-base-200 text-xl border-base-100 border-t-[1px]">
                        0,654
                      </td>
                    </tr>
                    <tr className="">
                      <td className="bg-base-200 border-base-100 border-t-[1px]">
                        <div className="flex  items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-11 h-11">
                              <img
                                src="/assets/header/USDT.svg"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">AMA</div>
                            <div className="text-sm opacity-50">Binance</div>
                          </div>
                        </div>
                      </td>
                      <td className="bg-base-200 text-xl border-base-100 border-t-[1px]">
                        0,0
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex mt-7 md:mb-0 mb-3 justify-between">
              <label
                onClick={useDisconnect()}
                htmlFor="my-modal-6"
                className="btn bg-red-500 border-none text-white"
              >
                LOGOUT <FiLogOut size={20} className="ml-2" />
              </label>
              <label
                htmlFor="my-modal-6"
                className="btn bg-base-200 border-none text-white"
              >
                CLOSE
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
