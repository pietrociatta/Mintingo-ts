import { createContext, useState } from 'react';

import { useAccount, Web3Modal } from '@web3modal/react';
import { chains, providers } from '@web3modal/ethereum';
export const MintingoContext = createContext();

export const MintingoProvider = ({ children }) => {
  const { account } = useAccount();
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

  return (
    <MintingoContext.Provider
      value={{ config, account, sideOpen, setSideOpen }}
    >
      {children}
      <Web3Modal config={config} />
    </MintingoContext.Provider>
  );
};
