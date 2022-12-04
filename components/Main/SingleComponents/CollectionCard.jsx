import React from 'react';

const CollectionCard = ({ collection }) => {
  return (
    <div className="bg-accent flex flex-col pb-4  px-3 rounded-xl text-white">
      <div className="w-[200px] sm:w-full h-[250px] flex items-start flex-col justify-end ">
        <h1 className="text-xl font-bold">{collection.title}</h1>
        <p className="text-white text-sm">{collection.description}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
