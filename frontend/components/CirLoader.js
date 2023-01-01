import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CirLoader = ({ number }) => {
  const colors = ['#F2B705', '#FF3334', '#0092CD', '#DCD427'];
  return (
    <div
      style={{ width: 150, height: 350 }}
      className={`d-flex justify-content-center`}
    >
      <CircularProgressbar
        value={number}
        text={`${number}%`}
        strokeWidth={5}
        styles={buildStyles({
          strokeLinecap: 'butt',
          pathColor: colors[Math.floor(Math.random() * 4)],
          backgroundColor: 'transparent',
          trailColor: '#fff',
        })}
      />
    </div>
  );
};
export default CirLoader;
