import { useRouter } from 'next/router';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { TbBrandMeta } from 'react-icons/tb';
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

// Firebase modules
// import {
//   getAuth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   GithubAuthProvider,
// } from 'firebase/auth';
// import { firebaseApp } from '../firebaseAuth/firebase.config';
import Menu from './sideMenu';
import Head from 'next/head';
import useApplication from '../hooks/hooks';
import ToastMessage from './ToastMessage';

const Login = () => {
  const { userAuth } = useApplication();
  const router = useRouter();

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
      const docRef = doc(db, 'users', data.username);
      const docSnap = await getDoc(docRef);
      const resp = docSnap.exists() ? docSnap.data() : null;
      if (!resp) {
        <ToastMessage type="warning" message="User does not exist" />;
        setError('username');
        setError('password');
        setProgress(100);
      } else {
        if (data.username == resp.username && data.password == resp.password) {
          localStorage.setItem('user', JSON.stringify(resp));
          <ToastMessage type="success" message="Login Success." />;
          setProgress(100);
          setTimeout(() => {
            router.replace('/user-profile');
          }, 2000);
        } else {
          <ToastMessage type="warning" message="Invalid Credentials" />;
          setError('username');
          setError('password');
          setProgress(100);
        }
      }
    } catch (error) {
      <ToastMessage type="error" message={error.message} />;
    }
    router.replace('/Login');
  };
  if (1) {
    router.replace('/user-profile');
    return <h1>Loading...</h1>;
  }
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
              <h4 className="text-center mt-3">Please Login</h4>
              <div className="options mt-3 d-flex flex-column justify-content-center align-items-center">
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
                  <button
                    className="p-2 mb-3 border-0"
                    style={{ width: '169px', background: '#075ad3' }}
                  >
                    Sign in
                  </button>
                </form>
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
                <button className="p-2 px-4 mb-1">
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
              <Link href="/Register">
                <p className="text-center mt-2" style={{ fontSize: '13px' }}>
                  Dont have any account?
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
