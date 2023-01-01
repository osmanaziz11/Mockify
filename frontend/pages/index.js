import Link from 'next/link';
import Layout from '../components/Layout';

const Index = () => {
  return (
    <Layout title="Welcome">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col home__container h-100 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center">
              AI Powered <span>Fake Job</span> Detector
            </h1>
            <p className="text-center my-4">
              This protects you from getting ripped off when shopping online.
              Join the secure shopping revolution and get the the truth about
              products, reviews, and sellers before you buy.
            </p>
            <Link href="/Jobs/">
              <button
                className="px-5 py-2"
                style={{ backgroundColor: '#075ad3' }}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
