import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

import { useRouter } from 'next/router';
import { useState, useEffect, createContext } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { ApplicationHook } from '../hooks/hooks';
import Topbar from '../components/Topbar';
const navContext = createContext();
const Authentication = createContext();

function MyApp({ Component, pageProps }) {
  const [NavStatus, setNavStatus] = useState('False');
  const [user, setUser] = useState(true);

  return (
    <>
      <ApplicationHook>
        <navContext.Provider value={{ NavStatus, setNavStatus }}>
          <Topbar />
          <Navbar />
          <Authentication.Provider value={{ user, setUser }}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Component {...pageProps} />
            </SkeletonTheme>
          </Authentication.Provider>
          <Footer />
        </navContext.Provider>
      </ApplicationHook>
    </>
  );
}

export default MyApp;
export { navContext, Authentication };
