import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { navContext } from '../pages/_app.js';

const Menu = () => {
  const router = useRouter();
  const navToggle = useContext(navContext);
  return (
    <div
      className={`container-fluid end-0 d-lg-none d-block main__container ${
        !navToggle.NavStatus && 'opacity-100 visible'
      } position-fixed`}
    >
      <div className="row h-100">
        <div className="col h-100">
          <ul className="list-unstyled p-0 d-flex flex-column align-items-center w-100 h-100">
            <li className="my-3">
              <Link href="/">
                <a className={router.pathname == '/' ? 'activeRoute' : ''}>
                  About
                </a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/portfolio">
                <a
                  className={
                    router.pathname == '/portfolio' ? 'activeRoute' : ''
                  }
                >
                  Find Jobs
                </a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/wedding">
                <a
                  className={router.pathname == '/wedding' ? 'activeRoute' : ''}
                >
                  Investigate
                </a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/wedding">
                <a
                  className={router.pathname == '/wedding' ? 'activeRoute' : ''}
                >
                  How it Works
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Menu;
