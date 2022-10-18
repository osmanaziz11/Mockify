import { Pivot as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { navContext } from '../pages/_app';
import { useContext, useEffect } from 'react';

const Navbar = () => {
  const router = useRouter();
  const navToggle = useContext(navContext);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      if (navToggle.NavStatus) {
        document.getElementsByClassName('hamburger-react')[0].click();
      }
    });
  }, [router.events]);
  return (
    <div className="container-fluid header mb-5 shadow">
      <div className="row">
        <div className="col-4 Logo__container p-4 pb-3">
          <Link href="/">
            <h2 className="cursor-pointer mt-2">MOCKIFY</h2>
          </Link>
        </div>
        <div className="col-8 nav__container p-4 pb-3 d-flex justify-content-end">
          <ul className="list-unstyled d-md-flex d-none m-0 p-0 mt-3">
            <Link href="/about">
              <li
                className={`mx-4 ${
                  router.pathname == '/about' ? 'activeRoute' : ''
                }`}
              >
                About
              </li>
            </Link>
            <Link href="/Jobs">
              <li
                className={`mx-4 ${
                  router.pathname == '/Jobs' ? 'activeRoute' : ''
                }`}
              >
                Find Jobs
              </li>
            </Link>
            <Link href="/investigate">
              <li
                className={`mx-4 ${
                  router.pathname == '/investigate' ? 'activeRoute' : ''
                }`}
              >
                Investigate
              </li>
            </Link>
            <Link href="/how-it-works">
              <li
                className={`mx-4 ${
                  router.pathname == '/how-it-works' ? 'activeRoute' : ''
                }`}
              >
                How it works
              </li>
            </Link>
          </ul>
          <div className="d-md-none d-block">
            <Hamburger
              id="hamburger"
              size={30}
              distance="sm"
              onToggle={() => navToggle.setNavStatus(!navToggle.NavStatus)}
            ></Hamburger>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
