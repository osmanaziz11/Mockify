import { AiOutlineSearch } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import Layout from './Layout';

const Detail = () => {
  return (
    <Layout title="Login">
      <div className="container-fluid">
        <div className="row my-4">
          <div className="col-md-8 topic">
            <div className="search px-3 p-3 d-flex  justify-content-center align-items-center w-100  position-relative">
              <button className=" px-3 py-1">What</button>
              <input type="text" name="" id="" className=" py-2 px-2" />
              <div className="">
                <AiOutlineSearch style={{ color: 'white', fontSize: '2rem' }} />
              </div>
            </div>
          </div>
          <div className="col-md-4 location">
            <div className="search px-3 p-3 d-flex  justify-content-center align-items-center w-100  position-relative">
              <button className=" px-3 py-1">Where</button>
              <input type="text" name="" id="" className=" py-2 px-2" />
              <div className="">
                <ImLocation2 style={{ color: 'white', fontSize: '1.5rem' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Detail;
