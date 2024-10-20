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
import './pay.css'
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
                <div className='pay-container'>
                  <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div className='connect'>
                      <p>Connect Your Wallet</p>
                      <WalletMultiButton />
                    </div>
                    <div className='connect'>
                      <p>Disconnect Your Wallet</p>
                      <WalletDisconnectButton />
                    </div>
                    
                  </div>
                  <p className='proceed-to-pay'>Proceed To Pay with Diverr</p>

                  <SendTokens toKey={toKey}/>
                </div>
                
                
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  )
}

export default Pay