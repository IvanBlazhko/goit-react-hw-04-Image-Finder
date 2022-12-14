import PropTypes from 'prop-types';
import Style from './Button.module.css';

export const Button = ({ pageIncrement }) => {
  return (
    <div className={Style.Button__body}>
      <button className={Style.Button} onClick={pageIncrement}>
        Load more
      </button>
    </div>
  );
};

export default Button;

Button.proptype = {
  pageIncrement: PropTypes.func,
};
