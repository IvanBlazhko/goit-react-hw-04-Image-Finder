import BeatLoader from 'react-spinners/BeatLoader';

import Style from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={Style.spinner__body}>
      <BeatLoader color={'#3F51B5'} size={50} />
    </div>
  );
};

export default Spinner;
