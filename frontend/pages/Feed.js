/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import Layout from '../components/Layout';
import FeedPost from './Jobs/components/FeedPost';
import SkeletonPosts from '../components/SkimmingEffect/SkeletonPosts';
import { db } from '../firebaseAuth/firebase.config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const Feed = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  var today = new Date();
  var curHr = today.getHours();
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const fetchJobs = async () => {
    try {
      const usersCollectionRef = collection(db, 'jobs');
      const data = await getDocs(usersCollectionRef);
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Layout title="Jobs Feed">
      <div className="container-fluid indeed_board_container">
        <div className="row">
          <div className="col ">
            <div className="container-fluid">
              <div className="row p-0">
                <div
                  className={`col-md-12  post__container  rounded shadow mb-4 p-4 d-flex align-items-center justify-content-between`}
                  style={{ background: '#0e0e0e' }}
                >
                  <div className="">
                    <h4>
                      {days[new Date().getDay()]},{' '}
                      {months[new Date().getMonth()]} {new Date().getFullYear()}
                    </h4>
                    <h2>
                      {curHr < 12
                        ? 'Good Morning'
                        : curHr < 18
                        ? 'Good Afternoon'
                        : 'Good Evening'}
                      , {currentUser.name}
                    </h2>
                  </div>
                  <div>
                    <p className="text-end">
                      أَمَّنْ هَـٰذَا ٱلَّذِى يَرْزُقُكُمْ إِنْ أَمْسَكَ
                      رِزْقَهُۥ ۚ بَل لَّجُّوا۟ فِى عُتُوٍّۢ وَنُفُورٍ
                    </p>
                    <p className=" m-0 text-end" style={{ width: '545px' }}>
                      Or who is it that could provide for you if He withheld His
                      provision? But they have persisted in insolence and
                      aversion.
                    </p>
                  </div>
                </div>
                {/* #0e0e0e !important */}
              </div>
            </div>
          </div>
        </div>
        {/* Job Posting  */}
        {posts &&
          posts.map((post, index) => {
            if ((post.reputation / post.totalPosts) * 100 >= 0) {
              return <FeedPost key={index} data={post} />;
            }
          })}
        {Loading && <SkeletonPosts></SkeletonPosts>}
      </div>
    </Layout>
  );
};
export default Feed;
