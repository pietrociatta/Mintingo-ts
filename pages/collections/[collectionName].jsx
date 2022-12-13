import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';
import CollectionsDb from '../../db/CollectionsDb.json';
import { MintingoContext } from '../../context/MintingoContext';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { GiTicket } from 'react-icons/gi';

import Lottie from 'lottie-react';
import treasure from '../../lotties/treasure.json';
import check from '../../lotties/check.json';

const CollectionPage = () => {
  const {
    sideOpen,
    setSideOpen,
    handleProfileCollection,
    counter,
    decreasefakeBalance,
  } = useContext(MintingoContext);
  const [collectionData, setCollectionData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [fakeTransactionLoading, setFakeTransactionLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const props = router.query;

  const [isPlaying, setIsPlaying] = useState(false);
  const [claimAnimation, setClaimAnimation] = useState(false);

  const lottieRef = useRef();

  // create a function that will be called when the user clicks the button to buy a ticket and simulate a transaction with a loading animation
  const buyTicket = () => {
    setFakeTransactionLoading(true);
    setTimeout(() => {
      decreasefakeBalance(ticketQuantity);
      setFakeTransactionLoading(false);
      setSuccess(true);
      handleProfileCollection({
        collectionId: collectionData.id,
        collectionName: collectionData.name,
        quantity: ticketQuantity,
      });
    }, 3000);
  };

  // useEffect(() => {
  //   if (isPlaying && !claimAnimation) {
  //     lottieRef.current.goToAndStop(2, true);
  //   } else if (isPlaying && claimAnimation) {
  //     lottieRef.current.play();
  //   }
  // }, [isPlaying, claimAnimation]);

  // use the collectionName parameter to dynamically generate the content of the page
  const collectionId = props.collectionName;

  var countDownDate = new Date('Dec 10, 2022 21:00:00').getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    setTimer(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ');

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);

  useEffect(() => {
    function findObjectById(json, id) {
      // base case: if the json is an object and has an id property with the
      // specified value, then we've found the object we're looking for, so
      // return it
      if (json.id === id) {
        return json;
      }

      // otherwise, check if json is an object or an array
      let result = null;
      if (json instanceof Object) {
        // if json is an object, recursively search its properties
        Object.keys(json).forEach((key) => {
          // if we've already found the object, no need to keep searching
          if (!result) {
            result = findObjectById(json[key], id);
          }
        });
      } else if (Array.isArray(json)) {
        // if json is an array, recursively search its elements
        json.forEach((element) => {
          // if we've already found the object, no need to keep searching
          if (!result) {
            result = findObjectById(element, id);
          }
        });
      }
      return result;
    }

    if (collectionId) {
      const result = findObjectById(CollectionsDb, Number(collectionId));
      setCollectionData(result);
    }
  }, []);

  useEffect(() => {
    function findObjectById(json, id) {
      // base case: if the json is an object and has an id property with the
      // specified value, then we've found the object we're looking for, so
      // return it
      if (json.id === id) {
        return json;
      }

      // otherwise, check if json is an object or an array
      let result = null;
      if (json instanceof Object) {
        // if json is an object, recursively search its properties
        Object.keys(json).forEach((key) => {
          // if we've already found the object, no need to keep searching
          if (!result) {
            result = findObjectById(json[key], id);
          }
        });
      } else if (Array.isArray(json)) {
        // if json is an array, recursively search its elements
        json.forEach((element) => {
          // if we've already found the object, no need to keep searching
          if (!result) {
            result = findObjectById(element, id);
          }
        });
      }
      return result;
    }

    if (collectionId) {
      const result = findObjectById(CollectionsDb, Number(collectionId));
      setCollectionData(result);
    }
  }, [counter]);

  return (
    <div
      className={`transition-all relative  delay-75 h-full  bg-base-300 ${
        sideOpen
          ? 'md:w-[calc(100%-18rem)] max-w-7xl w-full xxl:ml-0  ml-auto '
          : 'w-full max-w-7xl mx-auto'
      }`}
    >
      <div className="p-5 md:mt-32 mt-20 flex md:flex-row flex-col  justify-center  w-full ">
        <div className="md:min-w-[400px] relative sm:w-[400px]  sm:mx-auto aspect-square	 rounded-xl bg-base-200">
          <div className=" p-3">
            <img
              className="w-full h-[350px] object-cover object-center rounded-xl"
              src={collectionData.image}
            ></img>
            {/* <video
              autoPlay
              muted
              loop
              preload="none"
              playsInline
              className="w-full rounded-xl"
            >
              <source src="/video/bitcoin.mp4" type="video/mp4" />
            </video> */}
          </div>
          <p className=" bg-base-200 py-2 mt-1  flex gap-2 items-center  px-2 ml-1 absolute top-0 left-0  rounded-xl text-white text-sm font-semibold">
            TIME LEFT:
            <span className="bg-accent text-white p-1 rounded-lg px-2">
              {timer}
            </span>
          </p>
          <p className=" bg-base-200 py-2 mb-1  flex gap-2 items-center  px-2 mr-1 absolute bottom-0 right-0  rounded-xl text-white text-sm font-semibold">
            <span className="bg-green-500 text-white p-1 rounded-lg px-2">
              OPEN
            </span>
          </p>
        </div>
        <div className="flex pt-10 md:pt-0 md:px-5 px-0 justify-center md:items-start items-center flex-col gap-3">
          <div className="flex bg-base-200 p-3 rounded-xl flex-col items-start gap-3 ">
            <div className="flex md:flex-row flex-col  w-full items-start gap-2 md:gap-0 md:items-center justify-between">
              <h1 className="text-3xl font-bold">
                {isLoading ? 'Loading...' : collectionData?.title}
              </h1>
              <p className="text-white bg-base-100 text-base justify-between gap-1 font-semibold flex items-center px-2  rounded-xl ">
                <span className=" text-white p-1 rounded-lg px-0">
                  2506/5000
                </span>
              </p>
            </div>
            <p className="text-white text-sm">
              {isLoading ? 'Loading...' : collectionData?.description}
            </p>
          </div>
          <div className="divider my-0"></div>
          <div className="font-bold w-full  flex flex-col">
            Requirements:
            <div className="flex gap-3">
              <div className="font-normal uppercase text-center py-2 px-3 bg-base-200 aspect-video rounded-xl flex flex-col items-center justify-center  text-xs mt-2 ">
                <span className="font-bold text-2xl"> 1</span>
                AMAUROT NFT
              </div>
              <div className="font-normal uppercase text-center py-2 px-3 bg-base-200 aspect-video rounded-xl flex flex-col items-center justify-center  text-xs mt-2 ">
                <span className="font-bold text-2xl"> 1</span>
                AMAUROT NFT
              </div>
            </div>
          </div>
          <div className="flex w-full md:w-max gap-2 mt-4">
            <label htmlFor="my-modal-3" className="w-full md:w-max">
              <div className="btn btn-lg btn-primary px-10 items-center w-full md:w-max flex flex-col ">
                <div className="flex gap-2 text-white text-lg items-center">
                  <GiTicket size={16} /> BUY TICKET
                </div>

                <p className="text-sm normal-case font-normal">
                  1 Ticket = 10 USDT
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="flex pb-20 w-full justify-between lg:flex-row flex-col">
        <div className="w-full">
          <p className="w-full text-center text-3xl mt-12 mb-5 font-bold">
            ALL BUYERS
          </p>
          <div className="overflow-x-auto px-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ADDRESS</th>
                  <th>QUANTITY</th>
                  <th>TXHASH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0x34...h567</td>
                  <td>23</td>
                  <td>0x2354...</td>
                </tr>

                <tr>
                  <td>0x34...h567</td>
                  <td>23</td>
                  <td>0x2354...</td>
                </tr>

                <tr>
                  <td>0x34...h567</td>
                  <td>23</td>
                  <td>0x2354...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full">
          <p className="w-full text-center text-3xl mt-12 mb-5 font-bold">
            PRIZE
          </p>
          <div className="overflow-x-auto  px-4">
            <table className="table text-center table-zebra w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>AMOUNT</th>
                  <th>WINNING %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    {' '}
                    <img
                      className="w-full h-[75px] bg-violet-600 p-2 object-cover object-center rounded-xl"
                      src={collectionData.image}
                    ></img>
                  </th>
                  <td>200</td>
                  <td>1%</td>
                </tr>

                <tr>
                  <th>
                    {' '}
                    <img
                      className="w-full h-[75px] bg-yellow-600 p-2 object-cover object-center rounded-xl"
                      src={collectionData.image}
                    ></img>
                  </th>
                  <td>500</td>
                  <td>20%</td>
                </tr>

                <tr>
                  <th>
                    {' '}
                    <img
                      className="w-full h-[75px] bg-gray-500 p-2 object-cover object-center rounded-xl"
                      src={collectionData.image}
                    ></img>
                  </th>
                  <td>2000</td>
                  <td>70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-secondary max-w-max left-0 mx-auto right-0 rounded-b-xl  absolute top-0 border-t-2 border-white">
        <p className="w-full text-center z-[0] md:text-3xl text-xl px-5  py-5 font-bold">
          CURRENT JACKPOT: 9,989 USDT
        </p>
      </div>
      <div className="relative z-[20]">
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal   md:bottom-0 bottom-[64px] modal-bottom  sm:modal-middle">
          <div className="modal-box   bg-base-100">
            <label
              htmlFor="my-modal-3"
              className="btn text-xl btn-ghost absolute right-2 top-3"
            >
              ✕
            </label>
            <h3 className="font-bold text-xl">
              {!success ? 'Buy Ticket' : 'Success'}
            </h3>
            {success && (
              <div className="flex flex-col -mt-8 items-center justify-center gap-2">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={check}
                  loop={false}
                  style={{ width: 200, height: 200 }}
                />

                <p className="text-sm normal-case -mt-10 font-bold">
                  You have successfully bought {ticketQuantity} Ticket.
                </p>
                <div className="divider my-1"></div>
                <p className="text-sm text-center normal-case px-4 mb-1 mt-0 font-normal">
                  You can buy more tickets by clicking on the button below.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                  }}
                  className="btn w-full btn-primary flex gap-2  text-white mb-5 md:mb-0 font-bold "
                >
                  <AiOutlinePlus size={16} /> BUY MORE
                </button>
              </div>
            )}
            {!success && (
              <div>
                <p className="text-sm normal-case mt-2 font-normal">
                  To join the lottery you must have at least 1 Ticket.
                </p>
                <div className="divider my-2"></div>
                <div className="bg-base-200 p-3 rounded-xl">
                  <h3 className="text-center pb-2 font-bold">
                    SELECT QUANTITY:
                  </h3>
                  <div className="flex w-full  justify-between gap-2 mt-2">
                    <button
                      onClick={() => {
                        if (ticketQuantity > 0)
                          setTicketQuantity(ticketQuantity - 1);
                      }}
                      className="btn w-1/3 btn-ghost bg-base-100 font-bold "
                    >
                      <AiOutlineMinus size={16} />
                    </button>
                    <div className="flex gap-2 w-1/3 justify-center font-bold text-white text-lg items-center">
                      <GiTicket size={22} /> {ticketQuantity}
                    </div>
                    <button
                      onClick={() => setTicketQuantity(ticketQuantity + 1)}
                      className="btn w-1/3 btn-ghost bg-base-100 font-bold "
                    >
                      <AiOutlinePlus size={16} />
                    </button>
                  </div>
                </div>
                {!fakeTransactionLoading ? (
                  <button
                    disabled={ticketQuantity < 1}
                    onClick={buyTicket}
                    className={`btn btn-lg mt-5 mb-5 md:mb-0 btn-primary px-10 items-center w-full  flex flex-col  `}
                  >
                    <div className="flex gap-2 text-white text-lg items-center">
                      <GiTicket size={16} /> BUY {ticketQuantity}{' '}
                      {ticketQuantity > 1 ? 'TICKETS' : 'TICKET'}
                    </div>

                    <p className="text-sm normal-case font-normal">
                      {ticketQuantity}{' '}
                      {ticketQuantity > 1 ? 'Tickets' : 'Ticket'} ={' '}
                      {ticketQuantity * 10} USDT
                    </p>
                  </button>
                ) : (
                  <button
                    onclick={() => buyTicket()}
                    className={`btn loading btn-lg mt-5 mb-5 md:mb-0 btn-primary px-10 items-center w-full  flex   `}
                  >
                    <p>LOADING...</p>
                  </button>
                )}
              </div>
            )}
            {/* {isPlaying && (
              <Lottie
                lottieRef={lottieRef}
                animationData={treasure}
                loop={false}
                onComplete={() => {
                  lottieRef.current.destroy();
                  setIsPlaying(false);
                  setClaimAnimation(false);
                }}
              />
            )}
            {!isPlaying && <p>SCEMO CHI LEGGE</p>} */}

            {/* <button onClick={() => setClaimAnimation(true)}>CLAIM</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
