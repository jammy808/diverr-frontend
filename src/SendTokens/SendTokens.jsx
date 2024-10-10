import { useState } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { Buffer } from 'buffer';
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

    return <div>
        <h1>{toKey}</h1>
       
        <input id="amount" type="text" placeholder="Amount" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendTokens}>Send</button>
    </div>
}