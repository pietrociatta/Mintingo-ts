import { createContext, useState } from 'react';

import { useAccount, Web3Modal } from '@web3modal/react';
import { chains, providers } from '@web3modal/ethereum';
export const MintingoContext = createContext();

export const MintingoProvider = ({ children }) => {
  const { account } = useAccount();
  const [counter, setCounter] = useState(0);
  const [fakeBalance, setFakeBalance] = useState(100);
  const config = {
    theme: 'dark',
    accentColor: 'default',
    ethereum: {
      appName: 'Mintingo',
      chains: [chains.binanceSmartChain],
      providers: [
        providers.walletConnectProvider({
          projectId: '3d837bb008ffd00678529208a3aa8a1e',
        }),
      ],
      autoConnect: true,
    },
    projectId: '3d837bb008ffd00678529208a3aa8a1e',
  };

  const [sideOpen, setSideOpen] = useState(false);
  const [profileCollection, setProfileCollection] = useState([]);

  const handleProfileCollection = (data) => {
    setProfileCollection([...profileCollection, data]);
  };

  const refreshData = () => {
    setCounter(counter + 1);
  };

  const increasefakeBalance = () => {
    setFakeBalance(fakeBalance + 40);
  };

  const decreasefakeBalance = (ticket) => {
    const amount = ticket * 10;
    setFakeBalance(fakeBalance - amount);
  };

  return (
    <MintingoContext.Provider
      value={{
        config,
        account,
        sideOpen,
        setSideOpen,
        setProfileCollection,
        profileCollection,
        handleProfileCollection,
        setCounter,
        counter,
        refreshData,
        increasefakeBalance,
        decreasefakeBalance,
        fakeBalance,
      }}
    >
      {children}
      <Web3Modal config={config} />
    </MintingoContext.Provider>
  );
};
