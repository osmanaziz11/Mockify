import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Post = ({ data }) => {
  const [progressActive, setProgressActive] = useState(false);
  const [progressStatus, setProgressStatus] = useState(0);
  const [btnStatus, setBtnStatus] = useState('PREDICT');
  const [error, setError] = useState('');

  const compileResult = async ({ knn, svm, lr, rfc }) => {
    if (((await (knn + svm + lr + rfc)) / 4) * 100 < 50) {
      setError('danger');
    } else if (
      ((await (knn + svm + lr + rfc)) / 4) * 100 >= 50 &&
      ((await (knn + svm + lr + rfc)) / 4) * 100 <= 70
    ) {
      setError('warning');
    } else {
      setError('green');
    }
    setBtnStatus('Predict Successfully');
    setProgressStatus(100);
  };
  const predict = async () => {
    setProgressActive(true);
    setBtnStatus('Extracting Data');
    const req = await fetch('http://127.0.0.1:5000/api/job', {
      method: 'POST',
      body: JSON.stringify({ url: data.link }),
      headers: { 'Content-Type': 'application/json' },
    });
    const job = await req.json();
    if (job && job.status == 1) {
      setProgressStatus(30);
      setBtnStatus('Preprocessing ...');
      const req = await fetch('http://127.0.0.1:5000/api/preprocessing', {
        method: 'POST',
        body: JSON.stringify({ job: data, detail: job.Desc }),
        headers: { 'Content-Type': 'application/json' },
      });
      const pp = await req.json();
      if (pp && pp.status == 1) {
        setProgressStatus(50);
        setBtnStatus('Predicting ...');
        const req = await fetch('http://127.0.0.1:5000/api/model', {
          method: 'POST',
          body: JSON.stringify({ text: pp.pp }),
          headers: { 'Content-Type': 'application/json' },
        });
        const resp = await req.json();
        if (resp && resp.status == 1) {
          setProgressStatus(80);
          setBtnStatus('Compiling results ...');
          compileResult(resp.Desc);
        }
      }
    }
  };
  return (
    <div className="row my-5 px-3">
      <div
        className={`col-md-8  post__container  rounded shadow mb-4 p-3 ${
          error && error
        }`}
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
      <div className="col-md-4 p-4 graph__container d-flex flex-column justify-content-center align-items-center">
        <div className="result w-100 d-flex justify-content-center">
          <div
            style={{ width: 150, height: 200 }}
            className={`${progressActive ? 'd-block' : 'd-none'}`}
          >
            <CircularProgressbar
              value={progressStatus}
              text={`${progressStatus}%`}
            />
          </div>
          <p className={`text-center ${progressActive ? 'd-none' : 'd-block'}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sint
            quis corporis at iusto odio asperiores, mollitia quo eaque! Enim
            eligendi exercitationem repellat sapiente magni eum, quibusdam odio
            dicta explicabo!
          </p>
        </div>
        <button onClick={predict}>{btnStatus}</button>
      </div>
    </div>
  );
};
export default Post;
