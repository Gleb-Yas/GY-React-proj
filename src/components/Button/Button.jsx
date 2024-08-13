import css from './Button.module.css';

const CustomButton = ({ message, children }) => {
  return (
    <button onClick={() => alert(message)} className={css.button}>
      {children}
    </button>
  );
};

export default CustomButton;
