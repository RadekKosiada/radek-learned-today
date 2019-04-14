import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default () => {
  return (
    <header className="c-header">
      <nav className="c-header__nav">
        <div className="c-header__title">
          <span role="img" aria-label="Today">
            🗓️
          </span>
          <span role="img" aria-label="I">
            😄
          </span>
          <span role="img" aria-label="learned">
            ✏️
          </span>{' '}
          <span aria-hidden="true">Radek learned today</span>
        </div>
        <Link to={'/about/'} className="c-header__button o-btn">
         About
        </Link>
        <a href='https://radekkosiada.github.io/' target='blank' className="c-header__button o-btn">
         More of me
        </a>
      </nav>
    </header>
  );
};
