import React from 'react';

const Highlight = ({ data }) => {
  return (
    <div className="btn md:flex-1   md:w-1/2 px-0 h-full btn-ghost">
      <div
        className={`p-4 flex text-left flex-col gap-4 rounded-xl w-full ${data.color} `}
      >
        <div className=" p-5">
          <h1 className="font-bold text-3xl">{data.title}</h1>
          <p className="font-semibold mt-2 text-lg text-white/70">
            {data.description}
          </p>
          <p className="bg-white/40 mt-4 max-w-max px-4 py-2 rounded-xl text-lg font-semibold">
            {data.badge}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Highlight;
