import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../firebaseAuth/firebase.config';
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
import Menu from '../components/sideMenu';
import Head from 'next/head';
import { navContext } from './_app';
import useApplication from '../hooks/hooks';

const Register = () => {
  const router = useRouter();
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
    setProgress(50);
    const userRef = doc(db, 'users', data.username);
    await setDoc(userRef, {
      name: data.name,
      email: data.email,
      password: data.password,
      username: data.username,
      location: '',
      contact: '',
      profileIndicator: 15,
      education: {
        degree: '',
        university: '',
        location: '',
      },
      work: {
        position: '',
        company: '',
        location: '',
      },
      skills: '',
    });
    setProgress(100);
    toast.success('Registration Successful', {
      autoClose: 2000,
    });
    setTimeout(() => {
      router.replace('/Login');
    }, 2000);
  };
  const IsUsernameExist = async (event) => {
    try {
      const docRef = doc(db, 'users', event.target.value);
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
        <title>{`Register -  Mockify`}</title>
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
          autoClose={5000}
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
            <div className="col-md-3 rounded shadow login__container d-flex flex-column  align-items-center justify-content-center py-3">
              <h4 className="text-center mt-3">Register Account</h4>
              <div className="options mt-3 d-flex flex-column justify-content-center align-items-center">
                <form
                  action=""
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column mt-2 justify-content-center align-items-center"
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
                    className="p-2 mb-3 border-0"
                    style={{ width: '169px', background: '#075ad3' }}
                  >
                    Sign up
                  </button>
                </form>
              </div>
              <Link href="/Login">
                <p className="text-center mt-2" style={{ fontSize: '13px' }}>
                  Already have an account?
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
Register;
