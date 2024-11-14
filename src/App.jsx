
import { RecoilRoot } from 'recoil'
import './App.css'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import Solana from './pages/solana'
import '@solana/wallet-adapter-react-ui/styles.css';
import Polygon from './pages/polygon'

function App() {


  return (
    <>
    <BrowserRouter>
      <RecoilRoot>
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/solana" element={<Solana />} />
                  <Route path="/polygon" element={<Polygon />} />
                  <Route path="/" element={<HomePage />} />

                </Routes>

              


            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </RecoilRoot>
      </BrowserRouter>
    </>
  )
}

export default App
