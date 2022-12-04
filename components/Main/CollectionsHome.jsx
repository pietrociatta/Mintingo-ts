import React from 'react';
import Collections from './SingleComponents/Collections';
const CollectionsHome = () => {
  const collections = [
    {
      title: 'Hot New Collections',
      collections: [
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
      ],
    },
    {
      title: 'Best Lottery Games',
      collections: [
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
        {
          title: 'VIP WHEEL',
          description: 'GET FREE SPIN MULTIPLETIMES!',
        },
      ],
    },
  ];

  return (
    <div>
      {collections.map((collection) => (
        <div className="flex w-full  flex-col gap-4">
          <Collections collection={collection} />
        </div>
      ))}
    </div>
  );
};

export default CollectionsHome;
