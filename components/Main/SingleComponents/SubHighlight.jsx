import React from 'react';

const SubHighlight = ({ data }) => {
  return (
    <div className="flex bg-base-200 btn btn-ghost h-full  rounded-xl px-5 py-8 text-center md:w-full w-[250px] justify-center items-center flex-col gap-5">
      <div className="w-[70px] bg-gray-500 h-[70px] rounded-full"></div>
      {/* <img src={data.image} alt="highlight" /> */}
      <h1 className="text-xl flex items-center h-max font-bold">
        {data.title}
      </h1>
      <p className="text-xs font-semibold -mt-3 text-base-content">
        {data.description}
      </p>
    </div>
  );
};

export default SubHighlight;
