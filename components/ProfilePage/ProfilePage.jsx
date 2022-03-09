import React from 'react';
import {profilePage, profilePage__hero, profilePage__content, left, right} from './profile_page.module.scss';
import PropertiesList from '../PropertiesList/PropertiesList';
import {useAtom} from 'jotai';
import {userAtom} from 'store';

const ProfilePage = ({properties}) => {
  const [user] = useAtom(userAtom);

  return (
    <div className={profilePage}>
      <div className={profilePage__hero}>
        <h1>Mon Profil</h1>
      </div>

      <div className={profilePage__content}>
        <div className={left}>
          Profil
        </div>
        <div className={right}>
            <p>Mes annonces</p>
            <PropertiesList properties={properties}/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;