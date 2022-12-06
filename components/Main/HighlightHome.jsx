import React from 'react';
import Highlight from './SingleComponents/Highlight';

const HighlightHome = () => {
  const highlightCollections = [
    {
      title: 'VIP WHEEL',
      description: 'GET FREE SPIN MULTIPLETIMES!',
      badge: 'Free Spin',
      color: 'bg-accent',
      image: '/images/1.png',
    },
    {
      title: 'VIP WHEEL',
      description: 'GET FREE SPIN MULTIPLETIMES!',
      badge: 'Free Spin',
      color: 'bg-primary',
      image: '/images/2.png',
    },
  ];

  return (
    <div className="flex md:flex-row flex-col  w-full gap-6 px-4 ">
      {highlightCollections.map((highlight, index) => (
        <Highlight key={index} data={highlight} />
      ))}
    </div>
  );
};

export default HighlightHome;
