import { useRouter } from 'next/router';
import Indeed from './components/Indeed';
import Rozee from './components/Rozee';
import Mustaqbil from './components/Mustaqbil';
const Slug = () => {
  const router = useRouter();
  const slug = router.query.slug;
  console.log(slug);
  if (slug == 'Indeed') {
    return <Indeed />;
  } else if (slug == 'Rozee') {
    return <Rozee />;
  } else if (slug == 'Mustaqbil') {
    return <Mustaqbil />;
  }
};
export default Slug;
