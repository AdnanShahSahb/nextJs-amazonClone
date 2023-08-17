import BottomNavbar from '@/components/BottomNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { persistor, store } from '@/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {

  return <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <SessionProvider session={session}>
        <div className=' font-bodyFont'>
          <Navbar />
          <BottomNavbar />
          <div className='bg-gray-300'>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </SessionProvider>
    </PersistGate>
  </Provider>
}
