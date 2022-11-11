import '../styles/globals.css';
import { MintingoContext, MintingoProvider } from '../context/MintingoContext';
import Header from '../components/Header/Header';
import Sidebar from '../components/Header/Sidebar';
import MobileMenu from '../components/Mobile/MobileMenu';

function MyApp({ Component, pageProps }) {
  return (
    <MintingoProvider>
      <div className="debug-screens flex flex-col text-white-text">
        <Header />
        <div className="mt-[70px] flex h-[100vh]">
          <div className="flex">
            <Sidebar />
          </div>
          <div className="flex-grow flex  ">
            <Component {...pageProps} />
          </div>
          <div className="md:hidden fixed bottom-0 w-full">
            <MobileMenu />
          </div>
        </div>
      </div>
    </MintingoProvider>
  );
}

export default MyApp;
