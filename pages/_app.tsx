import '../styles/globals.css';
import { MintingoContext, MintingoProvider } from '../context/MintingoContext';
import Header from '../components/Header/Header';
import Sidebar from '../components/Header/Sidebar';
import MobileMenu from '../components/Mobile/MobileMenu';

function MyApp({ Component, pageProps }) {
  return (
    <MintingoProvider>
      <div className="debug-screens  h-full  flex flex-col text-white-text">
        <Header />
        <div className="mt-[70px] flex h-full">
          <div className="flex">
            <Sidebar />
          </div>

          <Component {...pageProps} />

          <div className="md:hidden z-[90] fixed bottom-0 w-full">
            <MobileMenu />
          </div>
        </div>
      </div>
    </MintingoProvider>
  );
}

export default MyApp;
