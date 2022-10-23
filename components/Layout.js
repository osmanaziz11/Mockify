import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Authentication } from '../pages/_app';
import Menu from './sideMenu';

const Layout = ({ title, children }) => {
  const router = useRouter();
  const auth = useContext(Authentication);

  useEffect(() => {
    if (!auth.user) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>{`${title} -  Mockify`}</title>
      </Head>
      <div
        className="container-fluid position-relative Layout-container"
        style={{
          maxWidth: '1500px',
          overflowX: 'hidden',
          minHeight: 'calc(100vh - 190px)',
        }}
      >
        <Menu />
        {children}
      </div>
    </>
  );
};
export default Layout;
