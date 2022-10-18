import { useRouter } from 'next/router';
import Indeed from './components/Indeed';
import Glassdoor from './components/Glassdoor';
import Toptal from './components/Toptal';
const Slug = () => {
  const router = useRouter();
  const slug = router.query.slug;
  console.log(slug);
  if (slug == 'Indeed') {
    return <Indeed />;
  } else if (slug == 'Glassdoor') {
    return <Glassdoor />;
  } else if (slug == 'Toptal') {
    return <Toptal />;
  }
};
export default Slug;
