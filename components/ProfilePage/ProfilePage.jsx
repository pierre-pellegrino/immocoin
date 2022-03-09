import React, { useEffect, useState, useRef } from 'react';
import {profilePage, profilePage__hero, profilePage__content, profilePage__content__img, left, right } from './profile_page.module.scss';
import PropertiesList from '../PropertiesList/PropertiesList';
import {useAtom} from 'jotai';
import {userAtom} from 'store';
import Image from 'next/image';
import Modal from 'react-modal';
import APIManager from 'pages/api/axiosMethods';

const ProfilePage = ({properties}) => {
  const [user] = useAtom(userAtom);
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const avatar = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSave = async () => {
    const newProfile = { 
      firstname: firstname,
      lastname: lastname,
      avatar: avatar.current.files[0]
    }
    console.log('newProfile: ', newProfile)
    const response = await APIManager.editProfile(user.id, newProfile)
    console.log('response: ', response)
  }

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
          <button onClick={() => setModalIsOpen(true)}>Editer mon profil</button>
        </div>
        <div className={right}>
            <p className="mb1 bolder">Mes annonces</p>
            <PropertiesList properties={properties} profile/>
        </div>
      </div>

      <Modal 
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
        >
          <label>Nouveau prénom</label>
          <input 
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)} 
          />

          <label>Nouveau nom</label>
          <input 
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)} 
          />

          <label>Avatar</label>
          <input 
            type="file"
            accept="image/png, image/jpeg"
            ref={avatar}
          />
          <br />
          <button onClick={() => handleSave()}>Enregistrer</button>
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default ProfilePage;