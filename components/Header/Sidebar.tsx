import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { MintingoContext } from '../../context/MintingoContext';
import useCheckMobileScreen from '../../utils/MobileCheck.js';
const Sidebar = () => {
  const { sideOpen, setSideOpen } = useContext(MintingoContext);

  return (
    <div
      className={`transition-all fixed md:w-[18rem] w-full h-full bg-gray-side ${
        sideOpen ? `translate-x-[0]` : 'translate-x-[-100%]'
      }`}
    >
      ciaone
    </div>
  );
};

export default Sidebar;
