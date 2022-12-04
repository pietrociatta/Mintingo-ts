import React from 'react';
import CollectionCard from './CollectionCard';

const Collections = ({ collection }) => {
  return (
    <div className="mt-7 ">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl px-4 font-bold">{collection.title}</h1>
        <div>
          <button className="btn btn-ghost btn-sm">See All</button>
        </div>
      </div>
      <div className="flex overflow-x-scroll px-4 w-full no-scrollbar gap-6 mt-7">
        {collection.collections.map((collection) => (
          <CollectionCard collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default Collections;