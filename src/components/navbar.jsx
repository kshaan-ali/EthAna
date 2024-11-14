import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { conditionAtom } from '../atoms/test'

function Navbar(props) {
    const navigate=useNavigate()
    const [cond,setCond]=useRecoilState(conditionAtom)
    return (
        <div >
            <div className='flex flex-col justify-center items-center '>

                <div className='font-black text-5xl items-center text-cyan-100 bg-cyan-800
                 p-3 w-screen flex justify-between'>
                    <div>EthAna</div>
                    <div className='flex text-3xl items-center'>
                        <div><button className='hover:bg-white bg-cyan-900 hover:text-cyan-900
                         px-2 p-1 rounded-md mx-1'  onClick={function(){
                            navigate('/')
                         }}>Home</button></div>
                        <div><button className='hover:bg-white bg-cyan-900 hover:text-cyan-900
                         px-2 p-1 rounded-md mx-1' onClick={function(){
                            setCond(0)
                         }}>Swap</button></div>
                        <div><button className='hover:bg-white bg-cyan-900 hover:text-cyan-900
                         px-2 p-1 rounded-md mx-1' onClick={function(){
                            setCond(1)
                         }}>Create Token</button></div>
                        <div><button className='hover:bg-white bg-cyan-900 hover:text-cyan-900
                         px-2 p-1 rounded-md mx-1' onClick={function(){
                            setCond(2)
                         }}>Create Nft</button></div>
                    </div>


                </div>


            </div>
        </div>
    )
}

export default Navbar