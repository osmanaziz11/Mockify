import { useRouter } from 'next/router';
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import Toastify from '../../../components/Toastify';
const Profile = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('recruiter')) {
      router.replace('/recruiter/sign-in');
      return <h1>Loading</h1>;
    }
  }
  return (
    <div className="container-fluid recruiter_profile">
      <div className="row">
        <div className="col cover__container p-0">
          <label for="coverimg" className="w-100 h-100">
            <img src="/bg.jpg" alt="error" />
          </label>
          <input type="file" name="" id="coverimg" hidden="true" />
        </div>
      </div>
      <div className="row">
        <div className="col profile__container">
          <div id="image-box">
            <label for="adminImage">
              <img src="/avatar.png" alt="error" />
            </label>
            <input
              type="file"
              name="adminImage"
              id="adminImage"
              className="d-none"
              data-container="image-box"
              onchange=""
            />
          </div>
          <div className="info">
            <h3>Osman Aziz</h3>
            <p>Islamabad, Pakistan</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <h3>About</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur rerum, iste voluptatem quam itaque dolore deserunt
                  nulla facere delectus dolores pariatur iure ab illo quae quod
                  corrupti perferendis veritatis quas error. Ipsum nisi dolorem
                  aut ipsam soluta molestiae. Rem consectetur minima similique?
                  Quam eaque animi asperiores, repudiandae eos libero
                  consequuntur.
                </p>
              </div>
              <div className="col-6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col my-4 mx-3 d-flex justify-content-between">
          <h4 className="text-start">Total Jobs Post 14</h4>
          <h4>Reputation 70%</h4>
        </div>
      </div>
      <div className="row px-3">
        <div
          className={`col-md-8  post__container  rounded shadow mb-4 p-3`}
          style={{ background: '#0e0e0e' }}
        >
          <div className="w-100">
            <h4>
              {' '}
              <Skeleton height={20} width={300}></Skeleton>
            </h4>
            <h6>
              <Skeleton height={20} width={200}></Skeleton>
            </h6>
            <p>
              <Skeleton height={20} width={200}></Skeleton>
            </p>
            <p className="">
              <Skeleton height={20} width={700}></Skeleton>
              <Skeleton height={20} width={700}></Skeleton>
              <Skeleton height={20} width={700}></Skeleton>
              <Skeleton height={20} width={700}></Skeleton>
            </p>
            <ul className="list-unstyled m-0 p-0 d-flex">
              <li className="salary me-3">
                <Skeleton height={20} width={200}></Skeleton>
              </li>
              <li className="type">
                <Skeleton height={20} width={200}></Skeleton>
              </li>
            </ul>
            <div className="date mt-2 d-flex justify-content-between align-content-between">
              <p>
                <Skeleton height={20} width={200}></Skeleton>
              </p>
              <a>
                <p>
                  {' '}
                  <Skeleton height={20} width={200}></Skeleton>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-3">
        <div
          className={`col-md-8  post__container  rounded shadow mb-4 p-3`}
          style={{ background: '#0e0e0e' }}
        >
          <div className="w-100">
            <h4>
              {' '}
              <Skeleton height={20} width={300}></Skeleton>
            </h4>
            <h6>
              <Skeleton height={20} width={200}></Skeleton>
            </h6>
            <p>
              <Skeleton height={20} width={200}></Skeleton>
            </p>
            <p className="">
              <Skeleton height={20} width={700}></Skeleton>
              <Skeleton height={20} width={700}></Skeleton>
              <Skeleton height={20} width={700}></Skeleton>
              <Skeleton height={20} width={700}></Skeleton>
            </p>
            <ul className="list-unstyled m-0 p-0 d-flex">
              <li className="salary me-3">
                <Skeleton height={20} width={200}></Skeleton>
              </li>
              <li className="type">
                <Skeleton height={20} width={200}></Skeleton>
              </li>
            </ul>
            <div className="date mt-2 d-flex justify-content-between align-content-between">
              <p>
                <Skeleton height={20} width={200}></Skeleton>
              </p>
              <a>
                <p>
                  {' '}
                  <Skeleton height={20} width={200}></Skeleton>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
