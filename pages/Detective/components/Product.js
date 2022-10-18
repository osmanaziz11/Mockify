import { AiFillStar } from 'react-icons/ai';

const Product = ({ data }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center">
          <div className="product__box">
            <img src={data[0].imgSrc} alt="" />
          </div>
        </div>
        <div className="col-md-8 product__desc">
          <p>{data[0].title}</p>
          <div className="stars">
            <ul className="list-unstyled d-flex ">
              <li>
                <AiFillStar style={{ color: 'yellow' }}></AiFillStar>
              </li>
              <li>
                <AiFillStar style={{ color: 'yellow' }}></AiFillStar>
              </li>
              <li>
                <AiFillStar style={{ color: 'yellow' }}></AiFillStar>
              </li>
              <li>
                <AiFillStar style={{ color: 'yellow' }}></AiFillStar>
              </li>
              <li>
                <AiFillStar style={{ color: 'yellow' }}></AiFillStar>
              </li>
              <li className="mx-3">{data[0].rating}</li>
            </ul>
            <p>Reviews {data[0].reviews}</p>
          </div>
          <button className="px-3 py-2">Generate Report</button>
        </div>
      </div>
    </div>
  );
};
export default Product;
