/* eslint-disable @next/next/no-img-element */
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { CgLogOff } from 'react-icons/cg';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebaseAuth/firebase.config';
import ToastMessage from '../components/ToastMessage';

const User = () => {
  const router = useRouter();
  const colors = ['#F2B705', '#FF3334', '#0092CD', '#DCD427'];
  const [Indicator, setIndicator] = useState(0);
  const [name, setName] = useState('Osman Aziz');
  const [email, setEmail] = useState('osmanaziz012@gmail.com');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  // Educational
  const [degreeName, setDegreeName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [universityLocation, setUniversityLocation] = useState('');
  // Work
  const [position, setPosition] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [skills, setSkills] = useState('');
  // const currentUser = JSON.parse(localStorage.getItem('user'));
  const nameTrigger = () => {
    setName('');
    document.getElementById('nameField').disabled = false;
  };
  const emailTrigger = () => {
    setEmail('');
    document.getElementById('emailField').disabled = false;
  };
  const locationTrigger = () => {
    setLocation('');
    document.getElementById('locationField').disabled = false;
  };
  const contactTrigger = () => {
    setContact('');
    document.getElementById('contactField').disabled = false;
  };

  const degreeNameTrigger = () => {
    setDegreeName('');
    document.getElementById('degreeNameField').disabled = false;
  };
  const universityNameTrigger = () => {
    setUniversityName('');
    document.getElementById('universityNameField').disabled = false;
  };
  const universityLocationTrigger = () => {
    setUniversityLocation('');
    document.getElementById('universityLocationField').disabled = false;
  };

  const positionTrigger = () => {
    setPosition('');
    document.getElementById('positionField').disabled = false;
  };
  const companyNameTrigger = () => {
    setCompanyName('');
    document.getElementById('companyNameField').disabled = false;
  };
  const companyLocationTrigger = () => {
    setCompanyLocation('');
    document.getElementById('companyLocationField').disabled = false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    router.replace('/Login');
  };

  const saveProfile = async (e) => {
    var ind = 0;
    e.preventDefault();
    var a = e.target;
    for (var i = 0; i < 13; i++) {
      if (a[i].value != '') {
        ind = ind + 5;
      }
    }
    try {
      const userDoc = doc(
        db,
        'users',
        JSON.parse(localStorage.getItem('user')).username
      );
      const newFields = {
        name: name,
        email: email,
        education: {
          degree: degreeName,
          university: universityName,
          location: universityLocation,
        },
        work: {
          position: position,
          company: companyName,
          location: companyLocation,
        },
        skills: skills,
        profileIndicator: ind + 5,
        location: location,
        contact: contact,
      };
      await updateDoc(userDoc, newFields);
      <ToastMessage type="success" message="Profile Update Sucessfully" />;
      localStorage.setItem('user', JSON.stringify(newFields));
      setIndicator(ind);
    } catch (error) {
      <ToastMessage type="error" message="Profile Update failed." />;
    }
  };
  const profileInfo = () => {
    const { education, work, skills, profileIndicator, email, name, contact } =
      JSON.parse(localStorage.getItem('user'));
    setIndicator(profileIndicator);
    setEmail(email);
    setName(name);
    setContact(contact);
    setDegreeName(education.degree);
    setUniversityName(education.university);
    setUniversityLocation(education.location);
    setPosition(work.position);
    setCompanyName(work.company);
    setCompanyLocation(work.location);
    setSkills(skills);
  };
  useEffect(() => {
    profileInfo();
  }, []);

  return (
    <div class="container-fluid" id="artist_dash">
      <div className="row my-2">
        <div className="col d-flex justify-content-end px-5">
          <CgLogOff
            onClick={logout}
            style={{ color: 'white', fontSize: '2rem', cursor: 'pointer' }}
          ></CgLogOff>
        </div>
      </div>
      <form action="" onSubmit={saveProfile}>
        <div className="row">
          <div className="col">
            <div id="setting-container" className="container-fluid">
              <div className="row" style={{ height: '222px' }}>
                <div className="col-md-3 h-100">
                  <div id="image-container" className="shadow h-100">
                    <div id="image-box">
                      <label for="adminImage">
                        <img src="/avatar.png" alt="error" />
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="adminImage"
                        className="d-none"
                        data-container="image-box"
                        onchange=""
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Personal Information box --> */}
                <div className="col-md-6 ps-0">
                  <div
                    id="personal-info-box"
                    className="container-fluid shadow"
                  >
                    <div className="row">
                      <div className="col">
                        <h4>Personal Information</h4>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-4">
                        <h6>Name</h6>
                      </div>
                      <div className="col-sm-8">
                        <div className="span-input">
                          <input
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
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-4">
                        <h6>Email</h6>
                      </div>
                      <div className="col-sm-8">
                        <div className="span-input">
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
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-4">
                        <h6>Location</h6>
                      </div>
                      <div className="col-sm-8">
                        <div className="span-input">
                          <input
                            type="text"
                            name=""
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
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <h6>Contact no</h6>
                      </div>
                      <div className="col-sm-8">
                        <div className="span-input">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-3 rounded prediction_loader d-flex flex-column justify-content-center align-items-center"
                  style={{ background: '#060606' }}
                >
                  <div
                    style={{ width: 120, height: 120 }}
                    className={`d-flex justify-content-center mx-3`}
                  >
                    <CircularProgressbar
                      value={Indicator}
                      text={`${Indicator}%`}
                      strokeWidth={5}
                      className="shadow rounded-circle"
                      styles={buildStyles({
                        pathTransition: 'all',
                        textColor: '#ffff',
                        strokeLinecap: 'butt',
                        pathColor: colors[0],
                        backgroundColor: 'transparent',
                        trailColor: 'transparent',
                      })}
                    />
                  </div>
                  <p className="text-center mt-3">Complete Profile</p>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-4 ">
                  <div
                    className="container-fluid p-3 h-100 edu_inputs rounded"
                    style={{ background: '#060606' }}
                  >
                    <div className="row">
                      <div className="col">
                        <h4>Educational Background</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <input
                          type="text"
                          name="admin-name"
                          id="degreeNameField"
                          value={degreeName}
                          onChange={(e) => setDegreeName(e.target.value)}
                          onBlurCapture={(e) => (e.target.disabled = true)}
                          disabled
                          placeholder="Degree Name"
                        />
                        <label
                          for="degreeNameField"
                          onClick={degreeNameTrigger}
                        >
                          <FiEdit />
                        </label>
                      </div>

                      <div className="col-12">
                        <input
                          type="text"
                          name="admin-name"
                          id="universityNameField"
                          value={universityName}
                          onChange={(e) => setUniversityName(e.target.value)}
                          onBlurCapture={(e) => (e.target.disabled = true)}
                          disabled
                          placeholder="University Name"
                        />
                        <label
                          for="universityNameField"
                          onClick={universityNameTrigger}
                        >
                          <FiEdit />
                        </label>
                      </div>
                      <div className="col-12">
                        <input
                          type="text"
                          name=""
                          id="universityLocationField"
                          value={universityLocation}
                          onChange={(e) =>
                            setUniversityLocation(e.target.value)
                          }
                          onBlurCapture={(e) => (e.target.disabled = true)}
                          disabled
                          placeholder="Location"
                        />
                        <label
                          for="universityLocationField"
                          onClick={universityLocationTrigger}
                        >
                          <FiEdit />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 ps-0">
                  <div
                    className="container-fluid rounded edu_inputs h-100"
                    style={{ background: '#060606' }}
                  >
                    <div className="row">
                      <div className="col p-3">
                        <h4>Work Background</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <input
                          type="text"
                          name="admin-name"
                          id="positionField"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          onBlurCapture={(e) => (e.target.disabled = true)}
                          disabled
                          placeholder="Position"
                        />
                        <label for="positionField" onClick={positionTrigger}>
                          <FiEdit />
                        </label>
                      </div>

                      <div className="col-12">
                        <input
                          type="text"
                          name="admin-name"
                          id="companyNameField"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          onBlurCapture={(e) => (e.target.disabled = true)}
                          disabled
                          placeholder="Company Name"
                        />
                        <label
                          for="companyNameField"
                          onClick={companyNameTrigger}
                        >
                          <FiEdit />
                        </label>
                      </div>
                      <div className="col-12">
                        <input
                          type="text"
                          name=""
                          id="companyLocationField"
                          value={companyLocation}
                          onChange={(e) => setCompanyLocation(e.target.value)}
                          onBlurCapture={(e) => (e.target.disabled = true)}
                          disabled
                          placeholder="Location"
                        />
                        <label
                          for="universityLocationField"
                          onClick={companyLocationTrigger}
                        >
                          <FiEdit />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-4 p-3 rounded"
                  style={{ background: '#060606' }}
                >
                  <h4>Skills</h4>
                  <textarea
                    name=""
                    id=""
                    cols="45"
                    rows="5"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Mention Skills"
                    className="p-2 text-light border-0"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 p-5 d-flex justify-content-center">
            <button className="border-0 bg-primary text-light px-4 py-2 rounded">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default User;
