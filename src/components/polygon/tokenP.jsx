
import React, { useState } from 'react'

import { uploadJSON } from '../../scripts';
import { Contract, ethers } from 'ethers';
import { Cabi, contract } from '../../contracts/data';



function TokenP({ signer, provider, metamask }) {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [supply, setSupply] = useState();
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
                    setSymbol(i.target.value);
                }}

                type="text"
                placeholder="Symbol"
            ></input>{" "}

            <br />
            <input className="m-2 p-2 bg-cyan-700 text-white rounded-sm text-2xl"
                onChange={function (i) {
                    setSupply(i.target.value);
                }}

                type="number"
                placeholder="Total Supply"
            ></input>{" "}

            <br />
            <button onClick={async function () {
                setHash()
                setTknAddr()
                const con = new Contract(contract, Cabi, signer)
                console.log(ethers.parseEther(supply.toString()))
                const tx = await con.createERC20(name, symbol, ethers.parseEther(supply.toString()))
                setHash(tx.hash)
                const receipt = await tx.wait();
                setRec(receipt)
                //console.log(tx)
                //console.log(Number(x))
                const x = await con.getUserERC20Tokens()
                const addr = await con.userERC20Tokens(Number(x) - 1)
                setTknAddr(addr)
                //console.log(addr)
            }}
                className="p-3 hover:bg-white hover:text-cyan-900 bg-cyan-700 font-bold text-white rounded-sm text-2xl m-3"  >
                Create a Erc20-Token
            </button>
            <div className='text-white m-4 font-mono flex flex-col justify-center items-center'>
                <div className='bg-cyan-800 '>{hash ? `Transaction Hash:${hash}` : ``}</div>
                <div className='bg-cyan-800 text-blue-400   '>{hash  ? (tknAddr ?<u> <a target="_blank" href={`https://amoy.polygonscan.com/token/${tknAddr}`}>Token Address:{tknAddr}</a> </u>: 'Token Address:Loading...') : ``}</div>
            </div>
        </div></center>
    )
}

export default TokenP