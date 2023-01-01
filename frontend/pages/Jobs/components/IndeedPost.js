import { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import 'react-toastify/dist/ReactToastify.css';
import Toastify from '../../../components/Toastify';
import ToastMessage from '../../../components/ToastMessage';

const IndeedPost = ({ data }) => {
  console.log(data);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [indicator, setIndicator] = useState(0);
  const [btnStatus, setBtnStatus] = useState('Predict');
  const [remarks, setRemarks] = useState(0);
  const colors = ['#F2B705', '#FF3334', '#0092CD', '#DCD427'];

  const makePrediction = async (data) => {
    try {
      const req = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'Post',
        body: JSON.stringify({ data: data }),
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await req.json();
      if (res && res.status == 1) {
        setTimeout(() => {
          changeStatus(res.response);
        }, 3000);
      } else {
        setBtnLoader(false);
        <ToastMessage type="warning" message="External module error." />;
      }
    } catch (error) {
      <ToastMessage type="error" message={error.message} />;
    }
  };
  const changeStatus = (res) => {
    const { result, percentage } = res;
    setIndicator(percentage);
    if (result == 0) {
      setRemarks(0);
    } else if (result == 1) {
      setRemarks(1);
    } else {
      setRemarks(-1);
    }

    setBtnLoader(false);
    setBtnStatus('Predicted');
    setBtnDisabled(true);
  };
  const predict = async () => {
    try {
      setBtnLoader(true);
      const req = await fetch('http://127.0.0.1:5000/api/job', {
        method: 'POST',
        body: JSON.stringify({ url: data.link }),
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await req.json();
      res && res.status == 1 && makePrediction(res.response);
    } catch (error) {
      setBtnLoader(false);
      <ToastMessage type="error" message={error} />;
    }
  };
  return (
    <div className="row my-5 px-3">
      <Toastify />
      <div
        className={`col-md-8  IndeedPost__container  rounded shadow mb-4 p-3`}
        style={{ background: 'rgb(14, 14, 14)' }}
      >
        <div className="w-100">
          <h4>{data.title}</h4>
          <h6>{data.companyName}</h6>
          <p>{data.location}</p>
          <p className="">{data.desc}</p>
          <ul className="list-unstyled m-0 p-0 d-flex">
            <li className="salary me-3">{data.salary}</li>
            <li className="type">{data.type}</li>
          </ul>
          <div className="date mt-2 d-flex justify-content-between align-content-between">
            <p>{data.date}</p>
            <a
              href={`https://pk.indeed.com${data.link}`}
              target="_blank"
              rel="noreferrer"
            >
              <p>Complete Picture</p>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4 p-4 pt-0 graph__container  flex-column justify-content-center align-items-center">
        <div
          className="container-fluid shadow    rounded mb-1 h-100  flex-column justify-content-center align-items-center pt-3"
          style={{ background: '#0e0e0e' }}
        >
          <div className="row">
            <div className="col prediction_loader d-flex justify-content-center align-items-center">
              <div
                style={{ width: 100, height: 100 }}
                className={`d-flex justify-content-center mx-3`}
              >
                <CircularProgressbar
                  value={indicator}
                  text={`${indicator}%`}
                  strokeWidth={8}
                  className="shadow rounded-circle"
                  styles={buildStyles({
                    textColor: '#ffff',
                    strokeLinecap: 'butt',
                    pathColor: colors[1],
                    backgroundColor: 'transparent',
                    trailColor: 'transparent',
                  })}
                />
              </div>
            </div>
          </div>
          <div className="row my-2">
            <div className="col d-flex justify-content-center align-items-center">
              <h5
                style={{ fontSize: '15px', letterSpacing: '2px' }}
                className={`prediction_remarks text m-0 pt-1 ${
                  btnDisabled ? 'remarks_active' : ''
                } ${
                  remarks == 1 ? 'danger' : remarks == -1 ? 'green' : 'warning'
                }`}
              >
                {remarks == 1
                  ? 'SCAM'
                  : remarks == -1
                  ? 'GOOD TO GO'
                  : 'AVERAGE'}
              </h5>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <p className="w-100 text-center m-0">
                {btnDisabled
                  ? 'The percentage is the average prediction made by our four classifiers, KNN SVM RFC LR.'
                  : 'For a job prediction, click the button. Our classifiers have been trained to conduct analyses using text.'}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col d-flex justify-content-center align-items-center">
              <button
                disabled={!btnDisabled ? '' : 'true'}
                onClick={predict}
                className={`rounded shadow mt-3 ${
                  btnDisabled ? 'disabled_btn' : ''
                }`}
              >
                {btnLoader ? <div className="loader__GIF"></div> : btnStatus}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndeedPost;
