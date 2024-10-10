import React, { useMemo ,useEffect , useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

import { SendTokens } from '../SendTokens/SendTokens';

function Pay() {

  const location = useLocation();
  const { toKey } = location.state || {};

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>

                <SendTokens toKey={toKey}/>
                
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  )
}

export default Pay
