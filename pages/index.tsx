import Link from 'next/link';

import { useContext } from 'react';
import Sidebar from '../components/Header/Sidebar';
import HeadingHome from '../components/Main/HeadingHome';
import HighlightHome from '../components/Main/HighlightHome';
import SubHighlightHome from '../components/Main/SubHighlightHome';
import SearchBarHome from '../components/Main/SearchBarHome';
import CollectionsHome from '../components/Main/CollectionsHome';
import { MintingoContext } from '../context/MintingoContext';

export default function Home() {
  const { sideOpen, setSideOpen } = useContext(MintingoContext);
  //   <Web3Button />
  return (
    <div
      className={`transition-all  delay-75 h-full  bg-base-300 ${
        sideOpen ? 'w-[calc(100%-18rem)]  ml-auto' : 'w-full max-w-7xl mx-auto'
      }`}
    >
      <HeadingHome />
      <HighlightHome />
      <SubHighlightHome />
      <SearchBarHome />
      <CollectionsHome />
    </div>
  );
}
