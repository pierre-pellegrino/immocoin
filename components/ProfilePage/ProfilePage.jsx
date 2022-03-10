import React, { useEffect, useState, useRef } from "react";
import {
  modal,
  profilePage,
  profilePage__hero,
  profilePage__content,
  profilePage__content__img,
  profilePage__content__img__placeholder,
  left,
  right,
} from "./profile_page.module.scss";
import PropertiesList from "../PropertiesList/PropertiesList";
import { useAtom } from "jotai";
import { userAtom } from "store";
import Image from "next/image";
import Modal from "react-modal";
import APIManager from "pages/api/axiosMethods";
import { btn } from "styles/form.module.scss";
import { Oval } from 'react-loader-spinner';
import Errors from "components/Errors";

const ProfilePage = () => {
  const [user] = useAtom(userAtom);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const avatar = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState();
  const [error, setError] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APIManager.getPropertyFromUser(user.id);
        setProperties(response.data.properties);
        setIsLoading(false);
      } catch (e) {
        console.error(e.response);
        setError("Oups ! Il y a eu un souci 😅");
      }
    }

    if (user) fetchData();
  }, [user]);

  let showProperties = (
    <Oval
      height="100"
      width="100"
      color="hsl(212, 100%, 48%)"
      secondaryColor="#ddd"
      ariaLabel="loading"
    />
  );

  if (!isLoading && !error) {
    showProperties = (
      <PropertiesList properties={properties} profile />
    );
  }

  if (error) {
    showProperties = (
      <Errors serverErrors={error} />
    );
  }

  const handleSave = async () => {
    const formObj = {
      firstname: firstname,
      lastname: lastname,
      avatar: avatar.current.files[0]
    }
  
    const data = new FormData();
  
    Object.keys(formObj).forEach((key) => {
      data.append(key, formObj[key])
    });

    try {
      const response = await APIManager.editProfile(user.id, data);
      console.log(response.data);
      router.push(`/profile`);
      setModalIsOpen(false);
    } catch (error) {
      console.warn(error);
    }
  };

  let displayedAvatar = (
    <div className={profilePage__content__img__placeholder}></div>
  );

  if (user?.avatar) {
    displayedAvatar = (
      <Image
        src={user?.avatar ?? "/default_avatar.svg"}
        alt={`property picture`}
        width={128}
        height={128}
      />
    );
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
            {displayedAvatar}
          </div>
          <p className="mb1 bolder"> Mes coordonnées </p>
          <p className="mb1"> Nom : {user?.last_name ?? "Non renseigné"} </p>
          <p className="mb1">
            {" "}
            Prénom : {user?.first_name ?? "Non renseigné"}{" "}
          </p>
          <p className="mb1"> Email : {user?.email ?? "Non renseigné"} </p>
          <button className={btn} onClick={() => setModalIsOpen(true)}>
            Editer mon profil
          </button>
        </div>
        <div className={right}>
          <p className="mb1 bolder">Mes annonces</p>
          {showProperties}
        </div>
      </div>

      <Modal
        className={modal}
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <label>Prénom</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label>Nom</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <label>Avatar</label>
        <input type="file" accept="image/png, image/jpeg" ref={avatar} />
        <br />
        <button className={btn} onClick={() => handleSave()}>
          Enregistrer
        </button>
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 1000,
  },
};

export default ProfilePage;
