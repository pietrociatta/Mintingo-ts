import Link from 'next/link';

import { useContext } from 'react';
import Sidebar from '../components/Header/Sidebar';
import { MintingoContext } from '../context/MintingoContext';

export default function Home() {
  const { sideOpen, setSideOpen } = useContext(MintingoContext);
  //   <Web3Button />
  return (
    <div
      className={`transition-all delay-75 ${
        sideOpen ? 'w-[calc(100%-18rem)]  ml-auto' : 'w-full'
      }`}
    >
      main
    </div>
  );
}
