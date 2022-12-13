import Link from 'next/link';
import React, { cloneElement } from 'react';

const CollectionCard = () => {
  return (
    <div className="bg-neutral btn btn-ghost  hover:bg-accent/70 md:w-full w-[full] md:h-[350px] h-max flex flex-col pb-4  px-3 rounded-xl text-white">
      <div className="  h-[350px] flex items-start flex-col justify-end ">
        <img
          className="w-full h-[350px] object-cover object-center rounded-xl"
          src="/assets/foto1.png"
        ></img>
        <h1 className="text-xl font-bold">CIAO</h1>
        <p className="text-white font-normal normal-case text-left text-sm">
          CIASO
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
