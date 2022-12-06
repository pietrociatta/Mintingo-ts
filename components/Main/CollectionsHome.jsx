import React from 'react';
import Collections from './SingleComponents/Collections';
import CollectionsDb from '../../db/CollectionsDb.json';
const CollectionsHome = () => {
  return (
    <div className="mb-20">
      {CollectionsDb.map((collection, index) => (
        <div key={index} className="flex w-full  flex-col gap-4">
          <Collections collection={collection} />
        </div>
      ))}
    </div>
  );
};

export default CollectionsHome;
