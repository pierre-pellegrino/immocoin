import React from 'react';
import {profilePage, profilePage__hero, profilePage__content, profilePage__content__img, left, right} from './profile_page.module.scss';
import PropertiesList from '../PropertiesList/PropertiesList';
import {useAtom} from 'jotai';
import {userAtom} from 'store';
import Image from 'next/image';
import withPrivateRoute from "components/withPrivateRoute";

const ProfilePage = ({properties}) => {
  const [user] = useAtom(userAtom);

  return (
    <div className={profilePage}>
      <div className={profilePage__hero}>
        <h1>Mon Profil</h1>
      </div>

      <div className={profilePage__content}>
        <div className={left}>
          <p className="bolder"> Photo de profil </p>
          <div className={`${profilePage__content__img} mb1`}>
            <Image
              src={user?.avatar ?? "/default_avatar.svg"}
              alt={`property picture`}
              width={128}
              height={128}
            />
          </div>
          <p className="mb1 bolder"> Mes coordonnées </p>
          <p className="mb1"> Nom : {user?.last_name ?? "Non renseigné"} </p>
          <p className="mb1"> Prénom : {user?.first_name ?? "Non renseigné"} </p>
          <p className="mb1"> Email : {user?.email ?? "Non renseigné"} </p>
        </div>
        <div className={right}>
            <p className="mb1 bolder">Mes annonces</p>
            <PropertiesList properties={properties} profile/>
        </div>
      </div>
    </div>
  );
};

export default withPrivateRoute(ProfilePage);