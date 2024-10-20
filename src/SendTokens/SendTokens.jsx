import { useState } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { Buffer } from 'buffer';
import './send.css'
window.Buffer = Buffer;


export function SendTokens({toKey}) {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [amount , setAmount] = useState('');

    async function sendTokens() {
        try {
            console.log(amount);
    
            // Create a new transaction
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(toKey),
                lamports: amount * LAMPORTS_PER_SOL,
            }));
    
            // Send the transaction
            const signature = await wallet.sendTransaction(transaction, connection);
            
            // Confirm the transaction
            const confirmation = await connection.confirmTransaction(signature, 'processed');
    
            if (confirmation) {
                alert("Successfully sent " + amount + " SOL to " + toKey);
            } else {
                alert("Transaction not confirmed");
            }
        } catch (error) {
            console.error("Transaction failed", error);
            alert("Failed to send SOL: " + error.message);
        }
    }    

    return <div className='payment-container'>
        <h2 className="payment-title">You are paying to</h2>
        <h1 className='payment-to'>{toKey}</h1>

        <label className="payment-label" htmlFor="amount">Enter amount</label>
        <input id="amount" type="text" placeholder="Amount" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className='payment-input'
        />
        <button onClick={sendTokens} className='payment-button'>Pay</button>
    </div>
}