import { useEffect, useState } from "react";
import {
  profilePage,
  profilePage__hero,
  profilePage__content,
  profilePage__content__img,
  left,
  right,
} from "./profile_page.module.scss";
import PropertiesList from "../PropertiesList/PropertiesList";
import { useAtom } from "jotai";
import { userAtom } from "store";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import Errors from "components/Errors";
import APIManager from "pages/api/axiosMethods";

const ProfilePage = () => {
  const [user] = useAtom(userAtom);
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
        setError("Oups ! Il y a eu un soucis 😅");
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
          <p className="mb1">
            {" "}
            Prénom : {user?.first_name ?? "Non renseigné"}{" "}
          </p>
          <p className="mb1"> Email : {user?.email ?? "Non renseigné"} </p>
        </div>
        <div className={right}>
          <p className="mb1 bolder">Mes annonces</p>
          {showProperties}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
