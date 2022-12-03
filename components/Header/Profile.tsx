import React from 'react';
import { shorten } from '../../utils/shorten';
import { FiChevronDown } from 'react-icons/fi';

const Profile = ({ account, setProfileOpen, profile }) => {
  return (
    <div
      className="flex btn btn-ghost  space-x-2 items-center hover:bg-base-100 transition-all rounded-full px-2 p-1"
      onClick={() => setProfileOpen(!profile)}
    >
      <FiChevronDown size={20} className=" text-base-100" />
      <p className="sm:flex hidden text-white-text  font-jost text-base font-semibold">
        <span className="lowercase">0x</span>
        {shorten(account?.address)}
      </p>
      <div className="w-[35px] h-[35px] border-base-100 border-[4px]  rounded-full ">
        <img
          src={
            'https://avatars.dicebear.com/api/pixel-art-neutral/' +
            account?.address +
            '.svg'
          }
          alt="profile"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Profile;
