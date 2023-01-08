import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../../firebaseAuth/firebase.config';
import { FiEdit } from 'react-icons/fi';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import useApplication, { ApplicationHook } from '../../../hooks/hooks';
import ToastMessage from '../../../components/ToastMessage';
import Toastify from '../../../components/Toastify';
import { toast } from 'react-toastify';

const Recruiter = () => {
  const [posts, setPosts] = useState([]);
  const [Indicator, setIndicator] = useState(0);
  const colors = ['#F2B705', '#FF3334', '#0092CD', '#DCD427'];
  const { setProgress } = useApplication();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');

  const nameTrigger = () => {
    setName('');
    document.getElementById('nameField').disabled = false;
  };
  const locationTrigger = () => {
    setLocation('');
    document.getElementById('locationField').disabled = false;
  };
  const emailTrigger = () => {
    setEmail('');
    document.getElementById('emailField').disabled = false;
  };
  const contactTrigger = () => {
    setContact('');
    document.getElementById('contactField').disabled = false;
  };

  const saveProfile = async (e) => {
    setProgress(40);
    var ind = 0;
    e.preventDefault();
    var a = e.target;
    for (var i = 0; i < 6; i++) {
      if (a[i].value != '') {
        ind = ind + 15;
      }
    }
    try {
      const userDoc = doc(
        db,
        'recruiter',
        JSON.parse(localStorage.getItem('recruiter')).username
      );
      const newFields = {
        name: name,
        email: email,

        bio: bio,
        profileIndicator: ind + 5,
        location: location,
      };
      await updateDoc(userDoc, newFields);
      setProgress(70);
      setIndicator(ind);

      const currentUser = JSON.parse(localStorage.getItem('recruiter'));
      currentUser.name = newFields.name;
      currentUser.email = newFields.email;
      currentUser.profileIndicator = newFields.profileIndicator;
      currentUser.location = newFields.location;
      currentUser.bio = newFields.bio;
      localStorage.setItem('recruiter', JSON.stringify(currentUser));
      toast.success('Job Post Successful', {
        autoClose: 2000,
      });
      setProgress(100);
    } catch (error) {
      console.log(error.message);
      toast.error('Unable to post job', {
        autoClose: 2000,
      });
    }
  };

  const profileInfo = () => {
    const { name, contact, location, bio, profileIndicator, email } =
      JSON.parse(localStorage.getItem('recruiter'));
    setEmail(email);
    setIndicator(profileIndicator);
    setName(name);
    setBio(bio);
    setContact(contact);
    setLocation(location);
  };
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
    profileInfo();
    fetchJobs();
  }, []);

  return (
    <>
      <Toastify />
      <div id="artist_profile" className="container-fluid p-5">
        {/* <!-- Main Profile  --> */}
        <div className="container">
          <div className="row p-0">
            <div className="col py-1 px-0">
              <div
                className="lineIndicator"
                style={{ background: colors[1], width: `${Indicator}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="container shadow rounded" id="profile">
          {/* <!-- Bio --> */}
          <form action="" onSubmit={saveProfile}>
            <div className="row edu_inputs">
              <div className="col-lg-3 p-2 d-flex flex-column align-items-center justify-content-center ">
                <div id="image-box">
                  <label for="adminImage">
                    <img src="/avatar.png" alt="" />
                  </label>
                  <input
                    type="file"
                    name="adminImage"
                    id="adminImage"
                    data-id="image-container"
                    className="file"
                    hidden="true"
                  />
                </div>
                <h6 className="mt-2">
                  {' '}
                  <input
                    className="text-center"
                    type="text"
                    name="admin-name"
                    id="nameField"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlurCapture={(e) => (e.target.disabled = true)}
                    disabled
                    placeholder="Your name"
                  />
                  <label for="nameField" onClick={nameTrigger}>
                    <FiEdit />
                  </label>
                </h6>
                <p>
                  {' '}
                  <input
                    type="text"
                    name=""
                    className="text-center"
                    id="locationField"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onBlurCapture={(e) => (e.target.disabled = true)}
                    disabled
                    placeholder="Your location"
                  />
                  <label for="locationField" onClick={locationTrigger}>
                    <FiEdit />
                  </label>
                </p>
              </div>
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <p>
                  <input
                    type="text"
                    name="admin-name"
                    id="contactField"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    onBlurCapture={(e) => (e.target.disabled = true)}
                    disabled
                    placeholder="Your contact no"
                  />
                  <label for="contactField" onClick={contactTrigger}>
                    <FiEdit />
                  </label>
                </p>
                <p>
                  <input
                    type="text"
                    name="admin-name"
                    id="emailField"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlurCapture={(e) => (e.target.disabled = true)}
                    disabled
                    placeholder="Your email address"
                  />
                  <label for="emailField" onClick={emailTrigger}>
                    <FiEdit />
                  </label>
                </p>
                <p>
                  <textarea
                    name=""
                    id=""
                    cols="45"
                    rows="5"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write about your company..."
                    className="p-2 text-light border-0"
                  ></textarea>
                </p>
              </div>
              <div className="col-3 p-3">
                <div
                  className="container-fluid p-2 rounded"
                  style={{ height: '121px', background: '#100e0e' }}
                >
                  <div className="row">
                    <div className="col">
                      <label for="adminImage">
                        <img src="/bg.jpg" alt="" />
                      </label>
                      <input
                        type="file"
                        name="adminImage"
                        id="adminImage"
                        data-id="image-container"
                        className="file"
                        hidden="true"
                      />
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col d-flex justify-content-center align-items-center">
                      <h5>Cover Image</h5>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col d-flex justify-content-center align-items-center">
                      <button className="border-0 bg-primary text-white px-4 py-1 rounded">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 px-5">
                <div className="style-bar"></div>
              </div>
            </div>
          </form>
          {/* <!-- Timeline --> */}
          {posts ? (
            posts.map((post, index) => {
              console.log(
                JSON.parse(localStorage.getItem('recruiter')).username
              );
              if (
                post.profileID ==
                JSON.parse(localStorage.getItem('recruiter')).username
              ) {
                return (
                  <div key={index} className="row my-4 px-5">
                    <div
                      className={`col-md-8  post__container  rounded shadow mb-4 p-3`}
                      style={{ background: 'rgb(14, 14, 14)' }}
                    >
                      <div className="w-100">
                        <h4>{post.title}</h4>
                        <h6>{post.company}</h6>
                        <p>{post.location}</p>
                        <p className="">{post.description}</p>
                        <ul className="list-unstyled m-0 p-0 d-flex">
                          <li className="salary me-3">{post.salary}</li>
                          <li className="type">{post.type}</li>
                        </ul>
                        <div className="date mt-2 d-flex justify-content-between align-content-between">
                          <p>{post.postedon}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 mb-4">
                      <div
                        className="graph__box bar shdaow  px-1 pb-4  rounded h-100"
                        style={{ background: 'rgb(14, 14, 14)' }}
                      >
                        <div
                          className="bar__chart w-100  px-4 py-2 d-flex align-items-end justify-content-center"
                          style={{ height: '240px' }}
                        >
                          <div
                            className="user bar mx-2 rounded shadow"
                            style={{
                              height: `${post.applicants + 1}%`,
                            }}
                          ></div>
                          <div
                            className="true bar mx-2 rounded shadow"
                            style={{
                              height: `1%`,
                            }}
                          ></div>
                          <div
                            className="false bar mx-2 rounded shadow"
                            style={{
                              height: `1%`,
                            }}
                          ></div>
                        </div>
                        <ul className="list-unstyled d-flex m-0  justify-content-center align-items-center ">
                          <li
                            className="me-2 rounded"
                            style={{
                              width: '15px',
                              height: '15px',
                              backgroundColor: '#075ad3',
                            }}
                          ></li>
                          <p className="m-0 mt-1">Applicants</p>

                          <li
                            className="mx-2 rounded"
                            style={{
                              width: '15px',
                              height: '15px',
                              backgroundColor: 'orange',
                            }}
                          ></li>
                          <p className="m-0 mt-1">Accepted</p>
                          <li
                            className="mx-2 rounded"
                            style={{
                              width: '15px',
                              height: '15px',
                              backgroundColor: '#fe0000',
                            }}
                          ></li>
                          <p className="m-0 mt-1">Rejected</p>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div className="row">
              <div className="col">
                <p className="text-center">No Post to be Shown</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Recruiter;
