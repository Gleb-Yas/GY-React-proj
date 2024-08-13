import css from './LoginForm.module.css';

const LoginForm = () => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const { login, password } = form.elements;

    form.reset();
  };
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor="login">Login</label>
      <input type="text" name="login" id="login" className={css.input} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className={css.input}
      />
      <button type="submit" className={css.btn}>
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
