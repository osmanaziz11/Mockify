/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import Toastify from '../../../components/Toastify';
import ToastMessage from '../../../components/ToastMessage';

const FeedPost = ({ data }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const apply = () => {
    if (currentUser.profileIndicator > 50) {
      toast.success('Applied Successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      toast.warning('Please Complete your profile first.', {
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
  return (
    <>
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
      <div className="row">
        <div
          className={`col-md-8  post__container  rounded shadow mb-4 p-3`}
          style={{ background: '#0e0e0e' }}
        >
          <div className="w-100">
            <h4>Post: {data.title}</h4>
            <h6>Company: {data.company}</h6>
            <p>Location: {data.location}</p>
            <p className="">Job Description: {data.shortDesc}</p>
            <ul className="list-unstyled m-0 p-0 d-flex">
              <li className="salary me-3">Salary: {data.salary}</li>
              <li className="type">Job Type: {data.type}</li>
            </ul>
            <div className="date mt-2 d-flex justify-content-between align-content-between">
              <p>Posted on {data.postedon}</p>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-end">
            <button className="px-3 py-1 rounded border-0" onClick={apply}>
              Apply Now
            </button>
          </div>
        </div>
        {/* #0e0e0e !important */}
        <div className="col-md-4 p-4 pt-0 graph__container  flex-column justify-content-center align-items-center">
          <div
            className="container-fluid shadow    rounded mb-1 h-100  flex-column justify-content-center align-items-center"
            style={{ background: '#0e0e0e' }}
          >
            <div className="row ">
              <div className="col profile d-flex justify-content-center align-items-center">
                <div
                  className="circleAvatar d-flex justify-content-center align-items-center mt-1"
                  style={{ width: '103px' }}
                >
                  <img src={`/avatar.png`} alt="" />
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col d-flex justify-content-center align-items-center">
                <a style={{ cursor: 'pointer' }}>
                  <Link href={`/recruiter-profile/`}>
                    <h5 className="text">{data.name}</h5>
                  </Link>
                </a>
              </div>
            </div>
            <div className="row my-2">
              <div className="col">
                <p className="w-100 text-center">{data.bio}</p>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6">Total Job Posts {data.totalPosts}</div>
              <div className="col-6 text-end">
                Reputation {(data.reputation / data.totalPosts) * 100}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FeedPost;
