import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import useApplication from '../hooks/hooks';
import Menu from './sideMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './Toastify';

const Layout = ({ title, children }) => {
  const router = useRouter();
  const { setProgress, progress } = useApplication();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(20);
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
  }, [router.events]);

  // useEffect(() => {
  //   if (!auth.user) {
  //     // router.push('/login');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <Head>
        <title>{`${title} -  Mockify`}</title>
      </Head>
      <div
        className="container-fluid position-relative Layout-container"
        style={{
          maxWidth: '1500px',
          overflowY: 'scroll',
          minHeight: 'calc(100vh - 190px)',
        }}
      >
        <Toastify />
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <Menu />
        {children}
      </div>
    </>
  );
};
export default Layout;
