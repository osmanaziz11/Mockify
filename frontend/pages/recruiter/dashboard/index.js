import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';

const Index = () => {
  const router = useRouter();
  // const [name, setname] = useState('Jawad');
  const logoutRecruiter = () => {
    localStorage.removeItem('recruiter');
    router.replace('/');
    return <h1>Loading</h1>;
  };

  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('recruiter')) {
      router.replace('/recruiter/sign-in');
      return <h1>Loading</h1>;
    }
  }
  const { username, name } = JSON.parse(localStorage.getItem('recruiter'));
  return (
    <div class="container-fluid" id="artist_dash">
      <div class="row">
        <div class="col p-4 d-flex justify-content-center">
          <h4 class="rounded shadow text-center p-2">Welcome {name}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="dashboard_container container">
            <div class="row mb-5">
              <div class="col-3">
                <Link href="/recruiter/dashboard/profile">
                  <div class="dash_box rounded d-flex flex-column justify-content-center align-items-center shadow">
                    <span
                      class="iconify"
                      data-icon="icomoon-free:profile"
                    ></span>

                    <p class="mt-3">Profile</p>
                  </div>
                </Link>
              </div>
              <div class="col-3">
                <Link href="/recruiter/dashboard/job-post">
                  <div class="dash_box d-flex justify-content-center align-items-center flex-column rounded shadow">
                    <span class="iconify" data-icon="entypo:shop"></span>
                    <p class="mt-3">Job Post</p>
                  </div>
                </Link>
              </div>
              <div class="col-3">
                <Link href="/recruiter/dashboard/recruiter-profile">
                  <div class="dash_box d-flex justify-content-center align-items-center flex-column rounded shadow">
                    <span
                      class="iconify"
                      data-icon="fontisto:product-hunt"
                    ></span>
                    <p class="mt-3">Public Profile</p>
                  </div>
                </Link>
              </div>
              <div class="col-3">
                <div
                  onClick={logoutRecruiter}
                  class="dash_box d-flex justify-content-center align-items-center flex-column rounded shadow"
                >
                  <span class="iconify" data-icon="clarity:logout-line"></span>
                  <p class="mt-3">Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
