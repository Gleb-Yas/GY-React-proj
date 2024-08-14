import s from './Articles.module.css';

const Articles = ({ articles }) => (
  <ul className={s.newsList}>
    {articles.map(({ objectID, url, title }) => (
      <li className={s.newsItem} key={objectID}>
        <a
          className={s.newsLink}
          href={url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {title}
        </a>
      </li>
    ))}
  </ul>
);

export default Articles;
