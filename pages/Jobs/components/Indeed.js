import Layout from '../../../components/Layout';
import { navContext } from '../../_app.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import Post from './Post';

const Indeed = () => {
  const Loader = useContext(navContext);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);

  const onTopic = (event) => {
    setTopic(event.target.value);
    fetchJobs(topic, location);
  };
  const onLocation = (event) => {
    setLocation(event.target.value);
    fetchJobs(topic, location);
  };

  const fetchJobs = async (t, l) => {
    Loader.setProgress(10);
    try {
      const req = await fetch(
        `http://127.0.0.1:5000/api/jobs/${t.length == 0 ? 'internship' : t}/${
          l.length == 0 ? 'islamabad' : l
        }`
      );
      const resp = await req.json();
      Loader.setProgress(30);
      if (resp) {
        Loader.setProgress(100);
        if (resp.status == 1) {
          setPosts(resp.Jobs);
        } else {
          setError(true);
        }
      }
    } catch (error) {
      setError(true);
      Loader.setProgress(100);
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
                value={topic}
                onChange={onTopic}
                className=" py-2 px-2"
                placeholder="Hi Usman, would you tell me what you're looking for?"
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
                className=" py-2 px-2"
                placeholder="Where do you live?"
                value={location}
                onChange={onLocation}
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
            return <Post key={index} data={post} />;
          })}

        {error && <p>Something went wrong.</p>}
      </div>
    </Layout>
  );
};
export default Indeed;
