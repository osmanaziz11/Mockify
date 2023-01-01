import Layout from '../../../components/Layout';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import SkeletonPosts from '../../../components/SkimmingEffect/SkeletonPosts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IndeedPost from './IndeedPost';

const Indeed = () => {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(true);

  const changeLocation = (event) => {
    setLocation(event.target.value);
  };
  const changeTopic = (event) => {
    setTopic(event.target.value);
  };
  const onTopic = (event) => {
    setTopic(event.target.value);
    fetchJobs(topic, location);
  };
  const onLocation = (event) => {
    setLocation(event.target.value);
    fetchJobs(topic, location);
  };

  const fetchJobs = async (t, l) => {
    try {
      setLoading(true);
      setPosts([]);
      const req = await fetch(
        `http://127.0.0.1:5000/api/indeed/jobs/${
          t.length == 0 ? 'internship' : t
        }/${l.length == 0 ? 'islamabad' : l}`
      );
      const resp = await req.json();

      if (resp) {
        if (resp.status == 1) {
          setPosts(resp.Jobs);
          setLoading(false);
        } else {
          toast.warning('Network connection failure.', {
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
  };

  useEffect(() => {
    fetchJobs(topic, location);
  }, []);

  return (
    <Layout title="Indeed">
      <div className="container-fluid indeed_board_container">
        <div className="row">
          <div className="col">
            <p>
              <Link href="/Jobs">
                <a>Find Jobs </a>
              </Link>
              / {router.query.slug}
            </p>
          </div>
        </div>
        {/* Search  */}
        <div className="row my-4">
          <div className="col-md-8 topic">
            <div className="search px-3 p-3 d-flex  justify-content-center align-items-center w-100  position-relative">
              <button className=" px-3 py-1">What</button>
              <input
                type="text"
                name=""
                id=""
                onChange={changeTopic}
                value={topic}
                onBlurCapture={onTopic}
                className=" py-2 px-2"
                placeholder="Hi would you tell me what you're looking for?"
              />
              <div className="">
                <AiOutlineSearch style={{ color: 'white', fontSize: '2rem' }} />
              </div>
            </div>
          </div>
          <div className="col-md-4 location">
            <div className="search px-3 p-3 d-flex  justify-content-center align-items-center w-100  position-relative">
              <button className=" px-3 py-1">Where</button>
              <input
                type="text"
                name=""
                id=""
                onChange={changeLocation}
                className=" py-2 px-2"
                placeholder="Where do you live?"
                value={location}
                onBlurCapture={onLocation}
              />
              <div className="">
                <ImLocation2 style={{ color: 'white', fontSize: '1.5rem' }} />
              </div>
            </div>
          </div>
        </div>
        {/* Job Posting  */}
        {posts &&
          posts.map((post, index) => {
            return <IndeedPost key={index} data={post} />;
          })}
        {Loading && <SkeletonPosts></SkeletonPosts>}
      </div>
    </Layout>
  );
};
export default Indeed;
