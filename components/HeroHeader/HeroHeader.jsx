import React from 'react';
import { heroHeaderWrapper, heroHeaderContent } from './hero_header.module.scss';
import Image from 'next/image';

const HeroHeader = () => {
  return (
    <div className={heroHeaderWrapper}>
      <h1> Chez ImmoCoin, </h1>
      <h1>on fait plus que vous loger, on crée des coups de cœur !</h1>

      <div className={heroHeaderContent}>
        <div>
          <p> Des milliers de logements disponibles </p>
          <p> Une équipe de 4 collaborateurs à votre service </p>
          <p> Mise en relation avec des particuliers </p>
          <p> Création d'annonces gratuite </p>
        </div>
        <div>
          <Image
            src="/432.svg"
            width="500"
            height="500"
            alt="profile picture"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;