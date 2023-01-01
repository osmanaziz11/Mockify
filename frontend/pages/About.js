import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Authentication } from './_app';

const About = () => {
  const router = useRouter();
  const auth = useContext(Authentication);
  useEffect(() => {
    if (!auth.user) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout title="About">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Hello World</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default About;
