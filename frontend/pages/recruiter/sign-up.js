/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { db } from '../../firebaseAuth/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import Menu from '../../components/sideMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import useApplication from '../../hooks/hooks';
import { useEffect } from 'react';
const Register = () => {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(20);
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
  }, [router.events]);

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
    try {
      setProgress(50);
      const userRef = doc(db, 'recruiter', data.username);
      await setDoc(userRef, {
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username,
        bio: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, commodi, reiciendis dolores libero eligendi officia atque, quo nobis delectus autem velit optio? Nemo deserunt ipsam hic facilis eligendi perferendis magnam expedita labore voluptatum, quas distinctio, odit voluptates? Esse nemo qui quod dolor dolores! Atque beatae magnam aut iste possimus soluta?',
        image: '/avatar.png',
        badge: 'NEW',
        location: '',
        profileIndicator: 14,
        totalPosts: 0,
        reputation: 0,
      });
      setProgress(100);

      toast.success('Registration Successful', {
        autoClose: 2000,
      });
      setTimeout(() => {
        router.replace('/recruiter/sign-in');
      }, 2000);
    } catch (error) {
      reset();
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };
  const IsUsernameExist = async (event) => {
    try {
      const docRef = doc(db, 'recruiter', event.target.value);
      const docSnap = await getDoc(docRef);
      const data = docSnap.exists()
        ? setError('username', {
            type: 'custom',
            message: toast.error('Username already exist', {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }),
          })
        : null;
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };
  return (
    <>
      <Head>
        <title>{`Sign Up -  Review Detective`}</title>
      </Head>
      <div
        className="container-fluid position-relative Layout-container"
        style={{
          maxWidth: '1500px',
          overflowX: 'hidden',
          minHeight: 'calc(100vh - 190px)',
        }}
      >
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
        <Menu />
        <div className="container-fluid Login_board_container h-100">
          {/* Search  */}
          <div className="row  h-100">
            <div className="col d-flex  flex-column justify-content-center h-100 align-items-center">
              <h2 className="text-center">Register Your Account</h2>
              <p className="text-center my-2">
                This protects you from getting ripped off when shopping online.
              </p>
              <form
                action=""
                className="d-flex flex-column mt-2 justify-content-center align-items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  name=""
                  id=""
                  className={`mb-3 p-2 px-4 ${errors.name && 'input_error'}`}
                  placeholder="Full Name"
                  autoComplete="off"
                  {...register('name', {
                    onChange: validateInput,
                    minLength: 4,
                    maxLength: 15,
                    required: true,
                  })}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  onBlurCapture={IsUsernameExist}
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
                  type="text"
                  name=""
                  id=""
                  className={`mb-3 p-2 px-4 ${errors.email && 'input_error'}`}
                  placeholder="Email"
                  autoComplete="off"
                  {...register('email', {
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
                <button
                  className="p-2 mb-3 border-0 rounded-5 text-bg-light"
                  style={{ width: '169px', background: '#075ad3' }}
                >
                  Sign up
                </button>
              </form>
            </div>
            <Link href="/recruiter/sign-in">
              <p className="text-center mt-2" style={{ fontSize: '13px' }}>
                Already have an account?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
