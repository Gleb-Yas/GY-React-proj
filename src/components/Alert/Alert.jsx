import clsx from 'clsx';
import css from './Alert.module.css';

export const Alert = ({ variant, outlined, elevated, children }) => {
  return (
    <p
      className={clsx(
        css.alert,
        css[variant],
        outlined && css.outlined,
        elevated && css.elevated
      )}
    >
      {children}
    </p>
  );
};
