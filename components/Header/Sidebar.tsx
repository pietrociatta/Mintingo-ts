import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { RiGameFill, RiHome2Fill, RiProfileFill } from 'react-icons/ri';
import { MintingoContext } from '../../context/MintingoContext';
import useCheckMobileScreen from '../../utils/MobileCheck.js';
const Sidebar = () => {
  const { sideOpen, setSideOpen, refreshData } = useContext(MintingoContext);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className={`transition-all z-[50] fixed md:w-[18rem] w-full h-full bg-gray-side ${
        sideOpen ? `translate-x-[0]` : 'translate-x-[-100%]'
      }`}
    >
      <div className="p-5 flex justify-center items-center flex-col gap-4">
        <Link href="/" className="w-full">
          <button
            onClick={() => setSideOpen(false)}
            className="btn normal-case text-lg  w-full justify-start bg-neutral btn-ghost hover:bg-primary"
          >
            <RiHome2Fill className="mr-3" />
            Home
          </button>
        </Link>
        <Link href="/profile" className="w-full">
          <button
            onClick={() => setSideOpen(false)}
            className="btn text-lg normal-case w-full justify-start bg-neutral btn-ghost hover:bg-primary"
          >
            <RiProfileFill className="mr-3" />
            Profile
          </button>
        </Link>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full btn btn-ghost hover:bg-transparent"
        >
          <div className="w-full justify-between flex items-center ">
            <div className="flex items-center text-lg normal-case">
              <RiGameFill className="mr-3 " /> Collections
            </div>
            {isOpen ? (
              <span className="ml-auto text-xl">
                <FiChevronUp size={20} />
              </span>
            ) : (
              <span className="ml-auto text-xl">
                <FiChevronDown size={20} />
              </span>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="w-full flex flex-col gap-2">
            <Link href="/collections/1" as="/collections/1" className="w-full">
              <button
                onClick={() => refreshData()}
                className="btn text-base font-normal normal-case w-full justify-start bg-neutral btn-ghost hover:bg-primary"
              >
                <RiProfileFill className="mr-3" />
                Collection 1
              </button>
            </Link>
            <Link
              onClick={() => refreshData()}
              href="/collections/2"
              className="w-full"
            >
              <button className="btn text-base font-normal normal-case w-full justify-start bg-neutral btn-ghost hover:bg-primary">
                <RiProfileFill className="mr-3" />
                Collection 2
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
