import Layout from '../../../components/Layout';
import { navContext } from '../../_app.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useState } from 'react';

const Toptal = () => {
  const Loader = useContext(navContext);
  const router = useRouter();

  // const fetchProduct = async (event) => {
  //   event.preventDefault();
  //   Loader.setProgress(20);
  //   let URL = document.getElementById('url').value;
  //   const req = await fetch('http://127.0.0.1:5000/api/review/amazon/', {
  //     method: 'POST',
  //     body: JSON.stringify({ url: URL }),
  //     headers: { 'content-type': 'application/json' },
  //   });
  //   const resp = await req.json();
  //   if (resp) {
  //     console.log(resp);
  //     Loader.setProgress(100);
  //     if (resp.status == 1) {
  //       setProduct([resp.result]);
  //     }
  //   }
  // };
  return (
    <Layout title="Toptal">
      <div className="container Toptal_board_container">
        <div className="row">
          <div className="col">
            <p>
              <Link href="/Jobs">
                <a>Find Jobs </a>
              </Link>
              / {router.query.slug}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Toptal;
