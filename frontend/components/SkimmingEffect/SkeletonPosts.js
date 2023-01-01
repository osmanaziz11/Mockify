/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonPosts = () => {
  return (
    <>
      <div className="row">
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
        {/* #0e0e0e !important */}
        <div className="col-md-4 p-4 pt-0 graph__container  flex-column justify-content-center align-items-center">
          <div
            className="container-fluid shadow   rounded mb-1 h-100  flex-column justify-content-center align-items-center"
            style={{ background: '#0e0e0e' }}
          >
            <div className="row ">
              <div className="col profile d-flex justify-content-center align-items-center">
                <div
                  className="circleAvatar d-flex justify-content-center align-items-center mt-1"
                  style={{ width: '103px' }}
                >
                  <Skeleton height={100} width={100} circle></Skeleton>
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col d-flex justify-content-center align-items-center">
                <Skeleton height={20} width={200}></Skeleton>
              </div>
            </div>
            <div className="row my-2">
              <div className="col">
                <p className="w-100">
                  <Skeleton height={20} containerClassName="w-100"></Skeleton>
                  <Skeleton
                    height={20}
                    containerClassName="w-100 my-2"
                  ></Skeleton>
                  <Skeleton
                    height={20}
                    containerClassName="w-100 my-2"
                  ></Skeleton>
                  <Skeleton height={20} containerClassName="w-100"></Skeleton>
                </p>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6">
                <Skeleton height={20} containerClassName="w-100"></Skeleton>
              </div>
              <div className="col-6 text-end">
                <Skeleton height={20} width={200}></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
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
        {/* #0e0e0e !important */}
        <div className="col-md-4 p-4 pt-0 graph__container  flex-column justify-content-center align-items-center">
          <div
            className="container-fluid shadow   rounded mb-1 h-100  flex-column justify-content-center align-items-center"
            style={{ background: '#0e0e0e' }}
          >
            <div className="row ">
              <div className="col profile d-flex justify-content-center align-items-center">
                <div
                  className="circleAvatar d-flex justify-content-center align-items-center mt-1"
                  style={{ width: '103px' }}
                >
                  <Skeleton height={100} width={100} circle></Skeleton>
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col d-flex justify-content-center align-items-center">
                <Skeleton height={20} width={200}></Skeleton>
              </div>
            </div>
            <div className="row my-2">
              <div className="col">
                <p className="w-100">
                  <Skeleton height={20} containerClassName="w-100"></Skeleton>
                  <Skeleton
                    height={20}
                    containerClassName="w-100 my-2"
                  ></Skeleton>
                  <Skeleton
                    height={20}
                    containerClassName="w-100 my-2"
                  ></Skeleton>
                  <Skeleton height={20} containerClassName="w-100"></Skeleton>
                </p>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-6">
                <Skeleton height={20} containerClassName="w-100"></Skeleton>
              </div>
              <div className="col-6 text-end">
                <Skeleton height={20} width={200}></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonPosts;
