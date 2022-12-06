import React from 'react';
import CollectionCard from './CollectionCard';

const Collections = ({ collection }) => {
  return (
    <div className="mt-7 ">
      <div className="w-full px-4 flex justify-between">
        <h1 className="text-2xl  font-bold">{collection.title}</h1>
        <div>
          <button className="btn btn-ghost btn-sm">See All</button>
        </div>
      </div>
      <div className="flex overflow-x-scroll overflow-y-hidden px-4 w-full no-scrollbar gap-6 mt-7">
        {collection.collections.map((collection, index) => (
          <div key={index} className="w-full ">
            <CollectionCard collection={collection} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
