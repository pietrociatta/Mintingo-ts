import { useRouter } from 'next/router';
import { useContext } from 'react';
import CollectionsDb from '../../db/CollectionsDb.json';
import { MintingoContext } from '../../context/MintingoContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';
import { GiTicket } from 'react-icons/gi';

import { type } from 'os';

const CollectionPage = () => {
  const { sideOpen, setSideOpen } = useContext(MintingoContext);
  const [collectionData, setCollectionData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState();
  const router = useRouter();
  const props = router.query;

  // use the collectionName parameter to dynamically generate the content of the page
  const collectionId = props.collectionName;
  console.log(collectionId);

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
  }, [collectionId]);

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
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-xl"
            >
              <source src="/video/bitcoin.mp4" type="video/mp4" />
            </video>
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
            <button className="btn btn-lg btn-primary px-10 items-center w-full md:w-max flex flex-col ">
              <div className="flex gap-2 text-white text-lg items-center">
                <GiTicket size={16} /> BUY TICKET
              </div>

              <p className="text-sm normal-case font-normal">
                1 Ticket = 10 USDT
              </p>
            </button>
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
                  <th></th>
                  <th>ADDRESS</th>
                  <th>QUANTITY</th>
                  <th>TXHASH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>

                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>

                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
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
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>ADDRESS</th>
                  <th>QUANTITY</th>
                  <th>TXHASH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>

                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>

                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
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
    </div>
  );
};

export default CollectionPage;
