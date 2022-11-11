import React from 'react';
import { shorten } from '../../utils/shorten';
import { FiChevronDown } from 'react-icons/fi';

const Profile = ({ account, setProfileOpen, profile }) => {
  return (
    <div
      className="flex space-x-2 items-center hover:bg-gray-highlight/30 transition-all rounded-full p-1"
      onClick={() => setProfileOpen(!profile)}
    >
      <FiChevronDown size={20} className=" text-gray-highlight" />
      <p className="sm:flex hidden text-white-text font-jost text-base font-semibold">
        0x{shorten(account?.address)}
      </p>
      <div className="w-[40px] h-[40px] rounded-full bg-gray-highlight" />
    </div>
  );
};

export default Profile;
