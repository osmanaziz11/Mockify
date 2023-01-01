import LoadingBar from 'react-top-loading-bar';
import useApplication from '../hooks/hooks';

const Topbar = () => {
  const { progress, setProgress } = useApplication();
  return (
    <LoadingBar
      color="#fff"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      height={2}
      shadow={true}
      background="transparent"
      waitingTime={400}
    />
  );
};
export default Topbar;
