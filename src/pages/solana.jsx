import React from 'react'
import Navbar from '../components/navbar'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRecoilState } from 'recoil';
import { conditionAtom } from '../atoms/test';
import Token from '../components/solana/token';

function Solana() {
    const wallet = useWallet();
    const [cond, setCond] = useRecoilState(conditionAtom)
    return (
        <div className='bg-cyan-950 h-screen'>
            <Navbar  ></Navbar>
            <div className='flex justify-center m-3 '><WalletMultiButton style={{
                backgroundColor: 'white',
                color: 'black'
            }}
            /></div>
            {cond == 0 ? (
                <div>
                   0 
                </div>
            ) : (<div>

            </div>)}
            {cond == 1 ? (
                <div>
                    <Token></Token>
                </div>
            ) : (<div>

            </div>)}
            {cond == 2 ? (
                <div>
                    2
                </div>
            ) : (<div>

            </div>)}

        </div>
    )
}

export default Solana