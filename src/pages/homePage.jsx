import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {

    const navigate = useNavigate()
    return (
        <div className='bg-cyan-950 h-screen'>
            <div className='flex flex-col justify-center items-center '>

                <div className='font-black text-5xl text-cyan-100 bg-cyan-800 p-3 w-screen flex justify-center'>
                    <div>EthAna</div>
                </div>
                <center className='text-white'>
                    <p className='text-2xl p-3 m-2 text-cyan-300 mb-7 font-bold font-mono'>
                       <p> All in one MultiChain Token LaunchPad And Swaps.</p>
                       <p className='text-white'> Create Tokens And NFTs at One Click.</p>
                    </p>
                    <div>

                    </div>
                    
                    <div><button onClick={function (i) {
                        navigate('/solana')
                    }} className='bg-cyan-800 font-mono   w-9/12
                     p-3 text-xl rounded-lg font-semibold m-3  hover:text-cyan-900 hover:bg-white'>Solana(Devnet)</button></div>
                    <div><button onClick={function (i) {
                        navigate('/polygon')
                    }} className='bg-cyan-800 font-mono 
                     w-9/12 p-3 text-xl rounded-lg font-semibold m-3 hover:text-cyan-900 hover:bg-white'>Polygon(Amoy)</button></div>
                    <div><button onClick={function (i) {
                        navigate('/')
                    }} className='bg-cyan-800 font-mono  w-9/12 
                    p-3 text-xl rounded-lg font-semibold m-3 hover:text-cyan-900 hover:bg-white'>Ethereum(Sepolia)</button></div>

                </center>
            </div>
        </div>

    )
}

export default HomePage