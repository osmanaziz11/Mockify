import { Pivot as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { navContext } from '../pages/_app';
import { useContext, useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';
const Navbar = () => {
  const router = useRouter();
  const navToggle = useContext(navContext);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      if (navToggle.NavStatus) {
        // document.getElementsByClassName('hamburger-react')[0].click();
      }
    });
  }, [router.events]);
  return (
    <div className="container-fluid header mb-5 shadow">
      <div className="row">
        <div className="col-3 Logo__container d-flex p-4 pt-3 align-items-center">
          <div className="Logo"></div>
          <Link href="/">
            <h2 className="cursor-pointer mt-3 mx-2">Mockify</h2>
          </Link>
        </div>
        <div className="col-3 p-4 pb-3 d-flex justify-content-start align-items-center">
          <div
            className={`search__container mb-1 w-100 px-2 py-1 ${
              router.pathname == '/Feed' ? 'search__active' : ''
            }`}
          >
            <input
              type="text"
              name=""
              id=""
              className="px-2"
              placeholder="Search what you want"
            />
            <GoSearch></GoSearch>
          </div>
        </div>
        <div className="col-6 nav__container p-4 pb-3 d-flex justify-content-end">
          <ul className="list-unstyled d-md-flex d-none m-0 p-0 mt-3">
            <Link href="/Feed">
              <li
                className={`mx-4 ${
                  router.pathname == '/Feed' ? 'activeRoute' : ''
                }`}
              >
                Jobs Feed
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
            <Link href="/recruiter/dashboard">
              <li
                className={`mx-4 ${
                  router.pathname == '/recruiter' ? 'activeRoute' : ''
                }`}
              >
                Recruiter
              </li>
            </Link>
            <Link href="/">
              <li
                className={`mx-4 ${
                  router.pathname == '/how-it-works' ? 'activeRoute' : ''
                }`}
              >
                About
              </li>
            </Link>
            {/* {( localStorage.getItem('user')) ||
            (
              localStorage.getItem('recruiter')) ? (
              <Link href="/user-profile">
                <li className={`mx-3`}>
                  <div className="circleAvatar">
                    <img src="/avatar.png" alt="" />
                  </div>
                </li>
              </Link>
            ) : ( */}
            <Link href="/Login">
              <li className={`mx-4 `}>
                <AiOutlineUser
                  style={{
                    color: 'white',
                    fontSize: '2rem',
                    marginTop: '-5px',
                  }}
                ></AiOutlineUser>
              </li>
            </Link>
            {/* )} */}
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
