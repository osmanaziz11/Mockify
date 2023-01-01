import { SiGlassdoor, SiIndeed, SiToptal } from 'react-icons/si';
import { AiOutlineLinkedin } from 'react-icons/ai';

import Link from 'next/link';

const Board = ({ icon, text }) => {
  return (
    <div className="container my-5">
      <div className="row mb-5">
        <div className="col-md-4 col-sm-6 d-flex justify-content-sm-end justify-content-center mb-4">
          <Link href="/Jobs/Indeed">
            <a>
              <div className="singleBoard shadow rounded d-flex flex-column justify-content-center align-items-center">
                <SiIndeed
                  style={{ color: 'white', fontSize: '5.5rem' }}
                ></SiIndeed>
                <p className=" ps-2 text-center mt-3">Indeed</p>
              </div>
            </a>
          </Link>
        </div>

        <div className="col-md-4 col-sm-6 d-flex justify-content-center mb-4">
          <Link href="/Jobs/Mustaqbil">
            <a>
              <div className="singleBoard shadow rounded d-flex flex-column justify-content-center align-items-center">
                <SiToptal
                  style={{ color: 'white', fontSize: '5.5rem' }}
                ></SiToptal>
                <p className="m-0 text-center mt-3">Mustaqbil</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="col-md-4 col-sm-6 d-flex justify-content-sm-start justify-content-center mb-4">
          <Link href="/Jobs/Rozee">
            <a>
              <div className="singleBoard shadow rounded d-flex flex-column justify-content-center align-items-center">
                <SiToptal
                  style={{ color: 'white', fontSize: '5.5rem' }}
                ></SiToptal>
                <p className="m-0 p-0 text-center mt-3">Rozee</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Board;
