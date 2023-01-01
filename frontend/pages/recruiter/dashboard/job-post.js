import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../../../firebaseAuth/firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApplication from '../../../hooks/hooks';
import { useRouter } from 'next/router';
import Toastify from '../../../components/Toastify';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';

const JobPost = () => {
  const router = useRouter();
  const {
    username,
    name,
    bio,
    totalPosts,
    reputation,
    profileIndicator,
    badge,
  } = JSON.parse(localStorage.getItem('recruiter'));
  const currentUser = JSON.parse(localStorage.getItem('recruiter'));
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const { setProgress } = useApplication();

  const validateInput = (event) => {
    setValue(event.target.name, event.target.value, {
      shouldValidate: true,
    });
  };
  const onSubmit = async (data) => {
    if (profileIndicator > 30) {
      try {
        setProgress(20);
        await addDoc(collection(db, 'jobs'), {
          title: data.title,
          company: data.name,
          description: data.desc,
          type: data.type,
          salary: data.salary,
          profileID: username,
          name: name,
          bio: bio,
          totalPosts: totalPosts,
          applicants: 0,
          reputation: 0,
          postedon: `${new Date().toLocaleString('en-US', {
            day: '2-digit',
          })} ${new Date().toLocaleString('en-US', {
            month: 'long',
          })} ${new Date().getFullYear()}`,
        });
        const userDoc = doc(db, 'recruiter', username);
        currentUser.totalPosts = totalPosts + 1;
        localStorage.setItem('recruiter', JSON.stringify(currentUser));
        await updateDoc(userDoc, { totalPosts: totalPosts + 1 });
        setProgress(50);
        const req = await fetch('http://127.0.0.1:5000/api/predict', {
          method: 'POST',
          body: JSON.stringify({
            data:
              data.desc + ' ' + data.title + ' ' + data.name + ' ' + data.type,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const res = await req.json();
        setProgress(70);
        if (res.status == 1) {
          const { result } = res.response;
          console.log(result, reputation, currentUser.reputation);
          const userRe = doc(db, 'recruiter', username);
          await updateDoc(userRe, {
            reputation: parseInt(reputation) + result,
          });
          currentUser.reputation = parseInt(reputation) + result;
          localStorage.setItem('recruiter', JSON.stringify(currentUser));
        } else {
          setBtnLoader(false);
          toast.error('External Module Error', {
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
        setProgress(100);

        toast.success('Job Post Successful', {
          autoClose: 2000,
        });
        setTimeout(() => {
          router.replace('/recruiter/dashboard');
        }, 2000);
      } catch (error) {
        toast.error(error.message, {
          autoClose: 2000,
        });
      }
    } else {
      toast.error('Please complete your profile first.', {
        autoClose: 2000,
      });
    }
  };
  useEffect(() => {
    if (profileIndicator <= 30) {
      toast.error('Please complete your profile first.', {
        autoClose: 2000,
      });
    }
  }, []);

  return (
    <div className="container job-post-container px-5 py-2 rounded shadow">
      <Toastify></Toastify>
      <form action="" className="w-100 h-100" onSubmit={handleSubmit(onSubmit)}>
        <div className="row my-3">
          <div className="col p-0">
            <div class="form-group">
              <label for="exampleInputEmail1" className="my-2">
                Title
              </label>
              <input
                type="text"
                class="form-control p-3 text-white"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Job Title"
                {...register('title', {
                  onChange: validateInput,
                  minLength: 5,

                  required: true,
                })}
              />
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col p-0">
            <div class="form-group">
              <label for="exampleInputEmail1" className="my-2">
                Name
              </label>
              <input
                type="text"
                class="form-control p-3 text-white"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Company Name"
                {...register('name', {
                  onChange: validateInput,
                  minLength: 5,
                  maxLength: 20,
                  required: true,
                })}
              />
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col p-0">
            <div class="form-group">
              <label for="exampleFormControlTextarea1" className="my-2">
                Job Description
              </label>
              <textarea
                class="form-control p-3 text-white"
                id="exampleFormControlTextarea1"
                row
                my-3s="3"
                {...register('desc', {
                  onChange: validateInput,

                  required: true,
                })}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col p-0">
            <div class="form-group">
              <label for="exampleInputEmail1" className="my-2">
                Job Type
              </label>
              <input
                type="text"
                class="form-control p-3 text-white"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Job Type"
                {...register('type', {
                  onChange: validateInput,
                  minLength: 4,
                  maxLength: 15,
                  required: true,
                })}
              />
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col p-0">
            <div class="form-group">
              <label for="exampleInputEmail1" className="my-2">
                Salary
              </label>
              <input
                type="text"
                class="form-control p-3 text-white"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Job Title"
                {...register('salary', {
                  onChange: validateInput,
                  minLength: 4,
                  maxLength: 15,
                  required: true,
                })}
              />
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col d-flex justify-content-center">
            <button className="px-5 py-2 rounded shadow border-0 bg-primary text-white my-5">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobPost;
