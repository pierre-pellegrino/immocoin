import React, { useState } from 'react';
import {modal, profilePage, profilePage__hero, profilePage__content, profilePage__content__img, left, right } from './profile_page.module.scss';
import PropertiesList from '../PropertiesList/PropertiesList';
import {useAtom} from 'jotai';
import {userAtom} from 'store';
import Image from 'next/image';
import Modal from 'react-modal';
import APIManager from 'pages/api/axiosMethods';
import { btn } from 'styles/form.module.scss';
import withPrivateRoute from "components/withPrivateRoute";

const ProfilePage = ({properties}) => {
  const [user] = useAtom(userAtom);
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [avatar, setAvatar] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async () => {
    const data = { 
      first_name: firstname,
      last_name: lastname,
      avatar: avatar
    }
    const response = await APIManager.editProfile(data)
    console.log(response)
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
          <button className={btn} onClick={() => setModalIsOpen(true)}>Editer mon profil</button>
        </div>
        <div className={right}>
            <p className="mb1 bolder">Mes annonces</p>
            <PropertiesList properties={properties} profile/>
        </div>
      </div>

      <Modal className={modal} style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
        <label>Prénom</label>
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        
        <label>Nom</label>
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        
        <label>Avatar</label>
        <input type="file" accept="image/png, image/jpeg" onChange={(e) => setAvatar(e.target.files[0])}/>
        
        <br />
        <button className={btn} onClick={() => handleSubmit()}>Enregistrer</button>
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
  overlay: {
    zIndex: 1000
  }
};

export default withPrivateRoute(ProfilePage);
