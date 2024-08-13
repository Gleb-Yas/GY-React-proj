const LoginForm = () => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const { login, password } = form.elements;

    form.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" />
      <input type="password" name="password" />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
