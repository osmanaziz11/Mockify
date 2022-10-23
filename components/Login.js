import Layout from './Layout';
import { Authentication, navContext } from '../pages/_app';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { TbBrandMeta } from 'react-icons/tb';

// Firebase modules
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { firebaseApp } from '../firebaseAuth/firebase.config';
import Menu from './sideMenu';
import Head from 'next/head';

const Login = () => {
  const Loader = useContext(navContext);
  const router = useRouter();
  const auth = useContext(Authentication);

  const withGoogle = async () => {
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;
    auth.setUser(true);
    router.push('/');
  };

  const withGithub = async () => {
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GithubAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    console.log(user);
    // auth.setUser(true);
    // router.push('/');
  };

  useEffect(() => {
    if (auth.user) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>{`Login -  Mockify`}</title>
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
        <div className="container-fluid Login_board_container">
          {/* Search  */}
          <div className="row my-5">
            <div className="col-md-8">
              <p className="m-0 px-5 text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
                quia numquam ut magni ipsum nemo voluptatibus, unde rem vel,
                repellendus dolor sequi fuga quisquam, dolores error quas nam
                non inventore. Minima ullam facere reprehenderit blanditiis
                libero rerum animi esse minus! Mollitia, inventore voluptatibus
                excepturi nemo molestias ut illo nobis, maiores sit ipsum
                laborum quidem commodi possimus sequi necessitatibus suscipit
                ducimus placeat, omnis ad quis eveniet accusantium ab
                repellendus dolorum. Quod ducimus quo iste maiores excepturi
                dolor natus vel molestiae, odio voluptatibus architecto cum,
                vero ut sequi autem molestias ipsum obcaecati dignissimos sit
                minus magni. Unde, dolor incidunt. Quas vero maxime
                necessitatibus, temporibus placeat modi pariatur praesentium rem
                nemo ipsa iusto unde eaque aspernatur tenetur at. Nihil
                accusantium ab soluta dicta voluptates aut maxime, porro enim
                quas fugit fugiat obcaecati inventore consequatur, autem sequi
                itaque! Incidunt, quam ipsa perferendis adipisci numquam quas
                blanditiis eius saepe doloribus non, beatae, dignissimos
                delectus asperiores dolores quae quos iusto minima sapiente
                labore debitis! Voluptates, ea nam? Blanditiis doloremque illum
                corrupti?
              </p>
            </div>
            <div className="col-md-3 rounded shadow login__container d-flex flex-column  align-items-center justify-content-between py-5">
              <h4 className="text-center">Please Login</h4>
              <div className="options mt-4 d-flex flex-column">
                <button className="p-2 px-4 mb-3" onClick={withGoogle}>
                  <FcGoogle
                    style={{
                      color: 'white',
                      fontSize: '2rem',
                      marginRight: '5px',
                    }}
                  />
                  Continue with Google
                </button>
                <button className="p-2 px-4 mb-3" onClick={withGithub}>
                  <AiFillGithub
                    style={{
                      color: 'white',
                      fontSize: '2rem',
                      marginRight: '5px',
                    }}
                  />{' '}
                  Continue with Github
                </button>
                <button className="p-2 px-4 mb-3">
                  <TbBrandMeta
                    style={{
                      color: '#0C8CE9',
                      fontSize: '2rem',
                      marginRight: '5px',
                    }}
                  />{' '}
                  Continue with Meta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
