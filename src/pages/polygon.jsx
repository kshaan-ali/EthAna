import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRecoilState } from 'recoil';
import { conditionAtom } from '../atoms/test';
import Token from '../components/solana/token';
import { ethers } from 'ethers';
import TokenP from '../components/polygon/tokenP';
import NFTP from '../components/polygon/nftP';

function Polygon() {

    const [cond, setCond] = useRecoilState(conditionAtom)
    const [provider, setProvider] = useState()
    const [signer, setSigner] = useState()
    const [metamask, setMetamask] = useState()


    useEffect(function () {
        if (window.ethereum) {
            setMetamask(window.ethereum);
        } else {
            alert("install metamask")
        }
    }, [])
    return (
        <div className='bg-cyan-950 h-screen'>
            <Navbar  ></Navbar>
            <div className='flex justify-center m-3 flex-col items-center '>
                <button className='bg-white px-4 p-2 rounded-lg text-xl' onClick={async function () {
                    if (metamask) {
                        const _provider = new ethers.BrowserProvider(metamask)
                        await _provider.send("eth_requestAccounts", []);

                        const _signer = await _provider.getSigner()
                        console.log(_signer)
                        setSigner(_signer)
                        setProvider(_provider)
                    } else {
                        alert("install metamask")
                    }

                }}>{signer ? "Address: " + signer.address : " Connect MetaMask"}</button>
                <p className='text-cyan-300'>*Make Sure You Have Added amoy TestNet to your Metamask*</p>
            </div>
            {cond == 0 ? (
                <div>
                    0
                </div>
            ) : (<div>

            </div>)}
            {cond == 1 ? (
                <div>
                    <TokenP signer={signer} provider={provider} metamask={metamask}></TokenP>
                </div>
            ) : (<div>

            </div>)}
            {cond == 2 ? (
                <div>
                    <NFTP signer={signer} provider={provider} metamask={metamask}></NFTP>
                </div>
            ) : (<div>

            </div>)}

        </div>
    )
}

export default Polygon