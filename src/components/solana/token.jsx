import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { useState } from 'react'
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccount,
    createAssociatedTokenAccountInstruction,
    // createInitializeInstruction,
    createInitializeMetadataPointerInstruction,
    createInitializeMint2Instruction,
    createInitializeMintInstruction,
    createMint,
    createMintToInstruction,
    ExtensionType,
    getAssociatedTokenAddressSync,
    getMinimumBalanceForRentExemptMint,
    getMintLen,
    getOrCreateAssociatedTokenAccount,
    LENGTH_SIZE,
    MINT_SIZE,
    mintTo,
    TOKEN_2022_PROGRAM_ID,
    TYPE_SIZE,

} from "@solana/spl-token";
import { uploadJSON } from '../../scripts';



function Token() {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");
    const [supply, setSupply] = useState();
    const [decimals, setDecimals] = useState(9);
    const wallet = useWallet()
    const { connection } = useConnection();


    const keypair = Keypair.generate()
    const programId = TOKEN_2022_PROGRAM_ID
    async function createTokenMint() {
        const md = {
            name: name,
            symbol: symbol,
            image: img,
            description: desc
        }
        const upload = await uploadJSON(md)
        console.log(`https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${upload}`)
        const metadata = {
            mint: keypair.publicKey,
            name: name,
            symbol: symbol,
            uri: `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${upload}`
        };


        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        console.log(1)
        //console.log(pack(metadata))
        console.log((Buffer.from(JSON.stringify(metadata)).length))
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + (Buffer.from(JSON.stringify(metadata)).length);
        // (await pack(metadata)).length;

        console.log(metadataLen)
        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
        console.log(lamports)
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: mintLen,
                lamports,
                programId,
            }),
            );
        const tx = new Transaction().add(
            
            createInitializeMetadataPointerInstruction(keypair.publicKey, wallet.publicKey, keypair.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeMintInstruction(keypair.publicKey, 9, wallet.publicKey, null, programId),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: keypair.publicKey,
                metadata: keypair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: wallet.publicKey,
                updateAuthority: wallet.publicKey,
            }));
        
        
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(keypair);

        const h = await wallet.sendTransaction(transaction, connection);
        const h2 = await wallet.sendTransaction(tx, connection);
        
        

        console.log(h)

        const associatedToken = getAssociatedTokenAddressSync(
            keypair.publicKey,
            wallet.publicKey,
            false,
            programId,
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );
        console.log(associatedToken.toBase58());

        const t2 = new Transaction().add(
            createAssociatedTokenAccountInstruction(wallet.publicKey, associatedToken, wallet.publicKey, keypair.publicKey, programId, ASSOCIATED_TOKEN_PROGRAM_ID),
            createMintToInstruction(keypair.publicKey, associatedToken, wallet.publicKey, supply * 10 ** 9, wallet.publicKey, programId)
        )
        await wallet.sendTransaction(t2, connection);



        // const t3 = new Transaction().add(
            
        // );
        // await wallet.sendTransaction(t3, connection);


    }


    return (
        <center><div className=" ">

            {/* <div className="flex justify-between p-4 bg-zinc-900 mb-5">
                <h1 className="font-black text-5xl mx-4 text-white">Solana Token Launchpad</h1>
                <div className="mx-4">    </div>

            </div> */}

            <input className="m-2 p-2 bg-cyan-700 text-white rounded-sm text-2xl"
                onChange={function (i) {
                    setName(i.target.value);
                }}

                type="text"
                placeholder="Name"
            ></input>{" "}
            <br />
            <input className="m-2 p-2 bg-cyan-700 text-white rounded-sm text-2xl"
                onChange={function (i) {
                    setSymbol(i.target.value);
                }}

                type="text"
                placeholder="Symbol"
            ></input>{" "}
            <br />
            <input className="m-2 p-2 bg-cyan-700 text-white rounded-sm text-2xl"
                onChange={function (i) {
                    setDesc(i.target.value);
                }}

                type="text"
                placeholder="Description"
            ></input>{" "}
            <br />
            <input className="m-2 p-2 bg-cyan-700 text-white rounded-sm text-2xl"
                onChange={function (i) {
                    setImg(i.target.value);
                }}

                type="text"
                placeholder="Image URL"
            ></input>{" "}
            <br />
            <input className="m-2 p-2 bg-cyan-700 text-white rounded-sm text-2xl"
                onChange={function (i) {
                    setSupply(i.target.value);
                }}

                type="number"
                placeholder="Initial Supply"
            ></input>{" "}
            <br />
            <input className="m-2 p-2 bg-cyan-700 text-white rounded-sm text-2xl"
                onChange={function (i) {
                    setDecimals(i.target.value);
                }}

                type="number"
                placeholder="Decimals"
            ></input>{" "}
            <br />
            <button className="p-3 hover:bg-white hover:text-cyan-900 bg-cyan-700 font-bold text-white rounded-sm text-2xl m-3" onClick={createTokenMint} >
                Create a token
            </button>
        </div></center>
    )
}

export default Token