import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Post from './Post';
import SkeletonPosts from '../../../components/SkimmingEffect/SkeletonPosts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rozee = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const req = await fetch(`http://127.0.0.1:5000/api/rozee/jobs`);
      const resp = await req.json();

      if (resp) {
        if (resp.status == 1) {
          setPosts(resp.Jobs);
          setLoading(false);
        } else {
          toast.warning('Network connection failed.', {
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
      toast.error('External module connection failed.', {
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
    fetchJobs();
  }, []);

  return (
    <Layout title="Rozee">
      <div className="container-fluid indeed_board_container">
        <div className="row">
          <div className="col mx-3">
            <p>
              <Link href="/Jobs">
                <a>Find Jobs </a>
              </Link>
              / {router.query.slug}
            </p>
          </div>
        </div>
        {/* Job Posting  */}
        {posts &&
          posts.map((post, index) => {
            return <Post key={index} data={post} />;
          })}
        {Loading && <SkeletonPosts></SkeletonPosts>}
        {/* {error && <p>Something went wrong.</p>} */}
      </div>
    </Layout>
  );
};
export default Rozee;
