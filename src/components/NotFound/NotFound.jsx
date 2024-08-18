import s from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <p className={s.message}>
        Oops! The page youre looking for doesn`t exist.
      </p>
      <div className={s.homeButtonContainer}>
        <a href="/" className={s.homeButton}>
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
