
import React, { useState } from 'react'

import { uploadJSON } from '../../scripts';
import { Contract, ethers } from 'ethers';
import { Cabi, contract } from '../../contracts/data';



function NFTP({ signer, provider, metamask }) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [symbol, setSymbol] = useState("");

    const [uri, setUri] = useState();
    const [image, setImage] = useState();
    const [hash, setHash] = useState('');
    const [rec, setRec] = useState();
    const [tknAddr, setTknAddr] = useState('');





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
                    setDesc(i.target.value);
                }}

                type="text"
                placeholder="Description"
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
                    setImage(i.target.value);
                }}

                type="text"
                placeholder="Image URL"
            ></input>{" "}

            <br />
            <button onClick={async function () {
                setHash()
                setTknAddr()
                const md = {
                    name: name,
                    description: desc,
                    image: image,
                    attributes:[]

                }
                const upload = await uploadJSON(md)
                setUri(`https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${upload}`)
                console.log(uri)
                const con = new Contract(contract, Cabi, signer)
                const tx=await con.createERC721(name,symbol,uri)
                console.log(tx.hash)
                setHash(tx.hash)
                const r=await tx.wait()
                const x=await con.getUserERC721Tokens()
                const _addr=await con.userERC721Tokens(Number(x)-1)
                setTknAddr(_addr)



            }}
                className="p-3 hover:bg-white hover:text-cyan-900 bg-cyan-700 font-bold text-white rounded-sm text-2xl m-3"  >
                Create a Erc721-Token /NFT
            </button>
            <div className='text-white m-4 font-mono flex flex-col justify-center items-center'>
                <div className='bg-cyan-800 '>{hash ? `Transaction Hash:${hash}` : ``}</div>
                <div className='bg-cyan-800 text-blue-400   '>{hash  ? (tknAddr ?<u> <a target="_blank" href={`https://amoy.polygonscan.com/token/${tknAddr}`}>Token Address:{tknAddr}</a> </u>: 'Token Address:Loading...') : ``}</div>
            </div>
        </div></center>
    )
}

export default NFTP