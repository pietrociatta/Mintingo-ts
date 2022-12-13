import Link from 'next/link';
import React, { cloneElement } from 'react';

const CollectionCard = ({ collection }) => {
  const collectionJson = collection.id;

  return (
    <Link key={collection.title} href={`/collections/${collectionJson}`}>
      <div className="bg-neutral btn btn-ghost  hover:bg-accent/70 md:w-full w-[200px] md:h-[350px] h-[300px] flex flex-col pb-4  px-3 rounded-xl text-white">
        <div className="  h-[350px] flex items-start flex-col justify-end ">
          <img
            className="w-full h-[3500px] object-cover object-center rounded-xl"
            src={collection.image}
          ></img>
          <h1 className="text-xl font-bold">{collection.title}</h1>
          <p className="text-white font-normal normal-case text-left text-sm">
            {collection.description.slice(0, 40)}...
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
