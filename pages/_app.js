import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

import { useRouter } from 'next/router';
import { useState, useEffect, createContext } from 'react';
import LoadingBar from 'react-top-loading-bar';

const navContext = createContext();
const Authentication = createContext();

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const [NavStatus, setNavStatus] = useState('False');
  const [user, setUser] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(20);
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
  }, [router.events]);
  return (
    <>
      <navContext.Provider
        value={{ NavStatus, setNavStatus, progress, setProgress }}
      >
        <LoadingBar
          color="#ffff"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height={2}
          shadow={true}
          background="transparent"
          waitingTime={400}
        />
        <Navbar />
        <Authentication.Provider value={{ user, setUser }}>
          <Component {...pageProps} />
        </Authentication.Provider>
        <Footer />
      </navContext.Provider>
    </>
  );
}

export default MyApp;
export { navContext, Authentication };
