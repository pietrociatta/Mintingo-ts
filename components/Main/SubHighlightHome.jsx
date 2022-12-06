import React from 'react';
import SubHighlight from './SingleComponents/SubHighlight';

const SubHighlightHome = () => {
  const subHighlightCollections = [
    {
      title: 'RAKEBACK SYSTEM',
      description: 'GET FREE SPIN MULTIPLETIMES!',
      image: '/images/1.png',
    },
    {
      title: 'WEEKLY BONUS',
      description: 'GET FREE SPIN MULTIPLETIMES!',
      image: '/images/1.png',
    },
    {
      title: 'GIVEAWAYS',
      description: 'GET FREE SPIN MULTIPLETIMES!',
      image: '/images/1.png',
    },
    {
      title: 'CHAT RAIN',
      description: 'GET FREE SPIN MULTIPLETIMES!',
      image: '/images/1.png',
    },
  ];

  return (
    <div className="flex justify-between  w-full mt-10 pb-10 sm:overflow-hidden overflow-x-scroll no-scrollbar gap-6  px-4 ">
      {subHighlightCollections.map((highlight, index) => (
        <div key={index} className="w-full">
          <SubHighlight data={highlight} />
        </div>
      ))}
    </div>
  );
};

export default SubHighlightHome;
