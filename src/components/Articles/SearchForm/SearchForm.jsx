import s from './SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    if (form.elements.topic.value.trim() === '') {
      alert('Please enter search term!');
      return;
    }
    onSearch(topic);
    form.reset();
  };
  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.searchInput}
          type="text"
          name="topic"
          placeholder="Type your request..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
