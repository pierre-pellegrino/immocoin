import React from 'react';
import { footer, externalLinks } from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={footer}>
      <h3>
        ImmoCoin
      </h3>
      <div className={externalLinks}>
        <a href="https://github.com/talmidiel" target="_blank" rel="noreferrer">Anthony</a>
        <a href="https://github.com/TimotheeGimbert" target="_blank" rel="noreferrer">Timothée</a>
        <a href="https://github.com/Beygs" target="_blank" rel="noreferrer">Boris</a>
        <a href="https://github.com/pierre-pellegrino" target="_blank" rel="noreferrer">Pierre</a>
      </div>
      <p>
        Made with ❤ - THP 2022
      </p>
    </footer>
  );
};

export default Footer;