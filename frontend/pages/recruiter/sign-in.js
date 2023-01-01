/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import Link from 'next/link';

import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { TbBrandMeta } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { db } from '../../firebaseAuth/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import useApplication from '../../hooks/hooks';
import { useEffect } from 'react';

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(20);
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
  }, [router.events]);
  const withGoogle = async () => {
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;
    // auth.setUser(true);
    // router.push('/');
  };

  const withGithub = async () => {
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GithubAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);

    // auth.setUser(true);
    // router.push('/');
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const { setProgress } = useApplication();

  const validateInput = (event) => {
    setValue(event.target.name, event.target.value, {
      shouldValidate: true,
    });
  };
  const onSubmit = async (data) => {
    setProgress(40);
    try {
      const docRef = doc(db, 'recruiter', data.username);
      const docSnap = await getDoc(docRef);
      const resp = docSnap.exists() ? docSnap.data() : null;
      if (!resp) {
        toast.error('User does not exist.');
        setError('username');
        setError('password');
        setProgress(100);
      } else {
        if (data.username == resp.username && data.password == resp.password) {
          toast.success('Login successful', { autoClose: 2000 });
          localStorage.setItem('recruiter', JSON.stringify(resp));
          setProgress(100);
          setTimeout(() => {
            router.replace('/recruiter/dashboard');
          }, 2000);
        } else {
          toast.error('Invalid Credentials.');
          setError('username');
          setError('password');
          setProgress(100);
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
    // router.replace('/Login');
  };
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('recruiter')) {
      return <h1>Loading</h1>;
      // router.replace('/recruiter/dashboard');
    }
  }
  return (
    <>
      <Head>
        <title>{`Login - Recruiter Profile`}</title>
      </Head>
      <div
        className="container-fluid position-relative Layout-container"
        style={{
          maxWidth: '1500px',
          overflowX: 'hidden',
          minHeight: 'calc(100vh - 190px)',
        }}
      >
        {' '}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="container-fluid Login_board_container recruiterLogin h-100">
          {/* Search  */}
          <div className="row  h-100">
            <div className="col d-flex login__container flex-column justify-content-center h-100 align-items-center">
              <h2 className="text-center">Be a part of Mockify</h2>
              <p className="text-center my-2">Recruites what you suits</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column mt-2 justify-content-center align-items-center"
              >
                <input
                  type="text"
                  name=""
                  id=""
                  className={`mb-3 p-2 px-4 ${
                    errors.username && 'input_error'
                  }`}
                  placeholder="Username"
                  autoComplete="off"
                  {...register('username', {
                    onChange: validateInput,
                    minLength: 4,
                    maxLength: 15,
                    required: true,
                  })}
                />
                <input
                  type="password"
                  name=""
                  id=""
                  className={`mb-3 p-2 px-4 ${
                    errors.password && 'input_error'
                  }`}
                  placeholder="Password"
                  autoComplete="off"
                  {...register('password', {
                    onChange: validateInput,
                    minLength: 4,
                    maxLength: 15,
                    required: true,
                  })}
                />
                <p className="text-center mt-3">Forget Password?</p>
                <ul className="list-unstyled m-0 p-0 social d-flex my-3 justify-content-center align-items-center">
                  <li className="shadow">
                    <FcGoogle
                      style={{
                        color: 'white',
                        fontSize: '2rem',
                        marginRight: '5px',
                      }}
                    />
                  </li>
                  <li className="mx-3 shadow">
                    <TbBrandMeta
                      style={{
                        color: '#0C8CE9',
                        fontSize: '2rem',
                        marginRight: '5px',
                      }}
                    />
                  </li>
                  <li className=" shadow">
                    <AiFillGithub
                      style={{
                        color: 'white',
                        fontSize: '2rem',
                        marginRight: '5px',
                      }}
                    />
                  </li>
                </ul>
                <button
                  className="px-5 py-3 text-white mt-3"
                  style={{ backgroundColor: '#075AD3' }}
                >
                  Sign in
                </button>
                <Link href="/recruiter/sign-up">
                  <p className="text-center mt-2">Dont have any account?</p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
