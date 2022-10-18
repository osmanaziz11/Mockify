import Head from 'next/head';
import Menu from './sideMenu';
const Layout = ({ title, children }) => {
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
