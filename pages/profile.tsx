import React, { useContext, useEffect, useRef, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { MintingoContext } from '../context/MintingoContext';
import SearchBarProfile from '../components/Main/SearchBarProfile';
import ProfileCollectionCard from '../components/Main/SingleComponents/ProfileCollectionCard';
import Lottie from 'lottie-react';
import treasure from '../lotties/treasure.json';

const profile = () => {
  const { sideOpen, account, profileCollection, increasefakeBalance } =
    useContext(MintingoContext);
  const [claimAnimation, setClaimAnimation] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isClaimed, setIsClaimed] = useState(Array(3).fill(false));
  const [isSelected, setIsSelected] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  const lottieRef = useRef(null);

  const checkAndClaim = (index) => {
    if (isClaimed[index]) {
      return;
    }
    setIsPlaying(true);
    setClaimAnimation(true);
    setTimeout(() => {
      setIsPlaying(false);
      setIsClaimed((prev) => {
        const newClaimed = [...prev];
        newClaimed[index] = true;
        return newClaimed;
      });
    }, 3000);
  };

  useEffect(() => {
    if (isPlaying && !claimAnimation) {
      lottieRef.current.goToAndStop(2, true);
    } else if (isPlaying && claimAnimation) {
      lottieRef.current.play();
    }
  }, [isPlaying, claimAnimation]);

  return (
    <div
      className={`transition-all mb-20 relative  delay-75 h-full  bg-base-300 ${
        sideOpen
          ? 'md:w-[calc(100%-18rem)] max-w-7xl w-full xxl:ml-0  ml-auto '
          : 'w-full max-w-7xl mx-auto'
      }`}
    >
      <div className="flex flex-col mt-10 items-center justify-center h-full">
        <div className="w-[130px] h-[130px] border-base-100 border-[4px]  rounded-full ">
          <img
            src={
              'https://avatars.dicebear.com/api/pixel-art-neutral/' +
              account?.address +
              '.svg'
            }
            alt="profile"
            className="rounded-full"
          />
        </div>
        <div className="flex gap-3 mt-5">
          <p className="">{`${account?.address.slice(
            0,
            10
          )}...${account?.address.slice(-10)}`}</p>

          <FiCopy size={20} className="cursor-pointer" />
        </div>
      </div>
      <div className="mt-10">
        <SearchBarProfile />
      </div>
      <div className="w-full">
        <div className="mt-7 w-full ">
          <div className=" flex flex-col sm:grid md:grid-cols-4 sm:grid-cols-3  w-full  px-4  gap-6 mt-7">
            <div
              onClick={() => {
                if (!isClaimed[0]) setIsPlaying(true);
                setIsSelected(0);
              }}
            >
              <label
                onClick={() => !isClaimed[0] && setPopupOpen(true)}
                className="relative"
              >
                <ProfileCollectionCard />
                {isClaimed[0] && (
                  <p className="absolute top-3 bg-accent rounded-lg px-3 py-1 right-2">
                    CLAIMED
                  </p>
                )}
              </label>
            </div>
            <div
              onClick={() => {
                if (!isClaimed[1]) {
                  setIsPlaying(true);
                } else {
                  setPopupOpen(false);
                }

                setIsSelected(1);
              }}
            >
              <label
                onClick={() => !isClaimed[1] && setPopupOpen(true)}
                className="relative"
              >
                <ProfileCollectionCard />
                {isClaimed[1] && (
                  <p className="absolute top-3 bg-accent rounded-lg px-3 py-1 right-2">
                    CLAIMED
                  </p>
                )}
              </label>
            </div>
            <div
              onClick={() => {
                if (!isClaimed[2]) setIsPlaying(true);
                setIsSelected(2);
              }}
            >
              <label
                onClick={() => !isClaimed[2] && setPopupOpen(true)}
                className="relative"
              >
                <ProfileCollectionCard />
                {isClaimed[2] && (
                  <p className="absolute top-3 bg-accent rounded-lg px-3 py-1 right-2">
                    CLAIMED
                  </p>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[20]">
        <input
          type="checkbox"
          id="my-modal-3"
          className="modal-toggle"
          checked={popupOpen}
          onChange={(e) => setPopupOpen(e.target.checked)}
        />
        <div className="modal   md:bottom-0 bottom-[64px] modal-bottom  sm:modal-middle">
          <div className="modal-box   bg-base-100">
            <label
              htmlFor="my-modal-3"
              className="btn text-xl btn-ghost absolute right-2 top-3"
            >
              ✕
            </label>
            <h3 className="text-2xl font-bold">Claim</h3>
            {isPlaying && (
              <div className="my-5 mx-auto w-[90%]">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={treasure}
                  loop={false}
                  onComplete={() => {
                    lottieRef.current.destroy();
                    setIsPlaying(false);
                    setClaimAnimation(false);
                    increasefakeBalance();
                    setPopupOpen(false);
                  }}
                />
              </div>
            )}
            {!isPlaying && <p className="my-5">Ticke already claimed</p>}
            <button
              className="btn btn-primary w-full"
              onClick={() => checkAndClaim(isSelected)}
            >
              CLAIM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
