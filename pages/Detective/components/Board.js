import { AiOutlineAmazon } from 'react-icons/ai';
import { SiAliexpress } from 'react-icons/si';
import { AiOutlineAlibaba } from 'react-icons/ai';
import Link from 'next/link';

const Board = ({ icon, text }) => {
  return (
    <div className="container my-5">
      <div className="row mb-5">
        <div className="col-md-4 col-sm-6 d-flex justify-content-sm-end justify-content-center mb-4">
          <Link href="/Detective/Amazon">
            <a>
              <div className="singleBoard shadow rounded d-flex flex-column justify-content-center align-items-center">
                <AiOutlineAmazon
                  style={{ color: 'white', fontSize: '6rem' }}
                ></AiOutlineAmazon>
                <p className="m-0 p-0 text-center mt-3">Amazon</p>
              </div>
            </a>
          </Link>
        </div>

        <div className="col-md-4 col-sm-6 d-flex justify-content-center mb-4">
          <Link href="/Detective/AliExoress">
            <a>
              <div className="singleBoard shadow rounded d-flex flex-column justify-content-center align-items-center">
                <SiAliexpress
                  style={{ color: 'white', fontSize: '6rem' }}
                ></SiAliexpress>
                <p className="m-0 p-0 text-center mt-3">Ali Express</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="col-md-4 col-sm-6 d-flex justify-content-sm-start justify-content-center mb-4">
          <Link href="/Detective/AliBaba">
            <a>
              <div className="singleBoard shadow rounded d-flex flex-column justify-content-center align-items-center">
                <AiOutlineAlibaba
                  style={{ color: 'white', fontSize: '6rem' }}
                ></AiOutlineAlibaba>
                <p className="m-0 p-0 text-center mt-3">Ali Baba</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Board;
