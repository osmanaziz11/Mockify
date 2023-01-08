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
              Fake job detector helps you to not fall into the trap of
              fraudulent employers that employ people to rip them of and make
              money in the process.
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
