import Layout from '../../../components/Layout';
import { navContext } from '../../_app.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Product from './Product';
const Amazon = () => {
  const Loader = useContext(navContext);
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const fetchProduct = async (event) => {
    event.preventDefault();
    Loader.setProgress(20);
    let URL = document.getElementById('url').value;
    const req = await fetch('http://127.0.0.1:5000/api/review/amazon/', {
      method: 'POST',
      body: JSON.stringify({ url: URL }),
      headers: { 'content-type': 'application/json' },
    });
    const resp = await req.json();
    if (resp) {
      console.log(resp);
      Loader.setProgress(100);
      if (resp.status == 1) {
        setProduct([resp.result]);
      }
    }
  };
  return (
    <Layout title="Amazon">
      <div className="container amazon_board_container">
        <div className="row">
          <div className="col">
            <p>
              <Link href="/Detective">
                <a>Dectective </a>
              </Link>
              / {router.query.slug}
            </p>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col URL__container w-100 px-3">
            <form onSubmit={fetchProduct}>
              <div className="URL_box w-100 d-flex p-2 rounded justify-content-between">
                <input
                  type="text"
                  name=""
                  id="url"
                  required
                  placeholder="Copy & Paste an Amazon Product Page URL"
                />
                <button className="px-4 py-2">Fetch Product</button>
              </div>
            </form>
          </div>
        </div>
        <div className="row px-3 mb-5">
          <div className="col product__container rounded p-4">
            {product.length > 0 ? (
              <Product data={product}></Product>
            ) : (
              <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                <h2>Hurry up !</h2>
                <p className="text-center">
                  Paste product link to see the magic
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Amazon;
