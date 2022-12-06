import React, { useRef, useState } from 'react';
import { RiCloseLine, RiSearch2Line } from 'react-icons/ri';

const SearchBarHome = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchShowed, setSearchShowed] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const searchInput = useRef();
  const onChange = (e) => {
    if (e.target.value) {
      setSearchShowed(false);
    } else {
      setSearchShowed(true);
    }
  };

  const filters = [
    {
      title: 'All',
      icon: 'fas fa-search',
    },
    {
      title: 'Slot',
      icon: 'fas fa-search',
    },
    {
      title: 'Live Casino',
      icon: 'fas fa-search',
    },
    {
      title: 'Sportsbook',
      icon: 'fas fa-search',
    },
    {
      title: 'Lottery',
      icon: 'fas fa-search',
    },
    {
      title: 'Poker',
      icon: 'fas fa-search',
    },
  ];

  return (
    <div className="w-full mb-3 h-[65px]  px-4">
      <div className="bg-base-200 rounded-full items-center   flex justify-between p-2">
        <div
          className={`flex overflow-x-scroll no-scrollbar gap-1 ${
            openSearch ? 'hidden' : ''
          }`}
        >
          {filters.map((filter, index) => (
            <div key={index} className="flex w-max  items-center gap-2">
              <div
                onClick={() => {
                  setActiveFilter(filter.title);
                }}
                className={`flex cursor-pointer transition-all items-center gap-2 ${
                  activeFilter === filter.title
                    ? 'bg-base-100 px-4 py-3 rounded-full text-white  '
                    : 'bg-base-200 px-4 py-2 rounded-full text-base-content'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-base-300"></div>
                <p className="text-base w-max font-semibold ">{filter.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`${openSearch && 'w-full'} md:w-max `}>
          <div className="relative font-jost pl-2 text-white-text lg:flex hidden items-center">
            <input
              type="text"
              name="search"
              id="search"
              autoComplete="off"
              className="bg-neutral py-3 px-5 w-[300px] shadow-[inset_0px_1px_4px_rgba(0,0,0,0.2)] rounded-full outline-none"
              placeholder="Cerca una Collezione..."
              ref={searchInput}
              onChange={onChange}
            />
            {searchShowed && (
              <RiSearch2Line
                size={20}
                className="absolute my-auto right-3   text-white-text"
              />
            )}
          </div>
          <div className="relative flex w-full  font-jost text-white-text  lg:hidden items-center">
            {openSearch && (
              <input
                type="text"
                name="search"
                id="search"
                autoComplete="off"
                className="bg-neutral w-full py-3 px-5  shadow-[inset_0px_1px_4px_rgba(0,0,0,0.2)] rounded-full outline-none"
                placeholder="Cerca una Collezione..."
                ref={searchInput}
                onChange={onChange}
              />
            )}
            {!openSearch ? (
              <button
                onClick={() => setOpenSearch(true)}
                className="btn btn-circle btn-ghost"
              >
                <RiSearch2Line size={20} className="" />
              </button>
            ) : (
              <button
                onClick={() => setOpenSearch(false)}
                className="btn btn-circle btn-ghost"
              >
                <RiCloseLine size={20} className="" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarHome;
