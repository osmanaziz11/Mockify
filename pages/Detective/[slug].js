import { useRouter } from 'next/router';
import Amazon from './components/Amazon';
import AliExpress from './components/AliExpress';
import AliBaba from './components/AliBaba';
const Slug = () => {
  const router = useRouter();
  const slug = router.query.slug;
  console.log(slug);
  if (slug == 'Amazon') {
    return <Amazon />;
  } else if (slug == 'AliExpress') {
    return <AliExpress />;
  } else if (slug == 'AliBaba') {
    return <AliBaba />;
  }
};
export default Slug;
