import {
  propertyViewPicture,
  propertyViewWrapper,
  propertyViewOwner,
  top,
  bottom,
  profilePicture,
} from "./property_view.module.scss";
import { useAtom } from "jotai";
import { isConnectedAtom, userAtom } from "store";
import Image from "next/image";
import { shimmer, toBase64 } from "lib/image_loading";
import EditPropertyModal from "../EditPropertyModal/EditPropertyModal";
import { btn } from 'styles/form.module.scss';
import { useState } from "react";
import APIManager from "pages/api/axiosMethods";
import { useRouter } from "next/router"


const PropertyView = ({ property, picture, user }) => {
  const [isConnected] = useAtom(isConnectedAtom);
  const [currentUser] = useAtom(userAtom);
  const { title, description, price, address, id, user_id } = property;
  const { email, first_name, last_name, avatar } = user;
  const cleanPrice = new String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const alertText = "Cliquez sur OK pour confirmer la suppression de votre annonce.";
    if (confirm(alertText)) {
      try {
        const response = await APIManager.deleteProperty(id);
        router.push("/profile");
      } catch (e) {
        console.error(e.response);
        setError("Oups ! Il y a eu un souci 😅");
      }
    }
  }

  return (
    <div className={propertyViewWrapper}>
      <div className="property">
        <h1> Annonce : </h1>
        <h3>{title}</h3>
        <h2 className="primary">{cleanPrice} €</h2>
        <div className={propertyViewPicture}>
          <Image
            src={picture ?? "/nopic.svg"}
            alt={`${first_name}'s property on immocoin`}
            width={600}
            height={450}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(600, 450)
            )}`}
          />
        </div>

        <EditPropertyModal isOpen={modalIsOpen} toggle={() => setModalIsOpen()} id={id} property={property}/>

        <h3>Descriptif du bien : </h3>
        <p>{description}</p>
        {currentUser?.id === user_id && (
          <>
          <button className={btn} onClick={() => setModalIsOpen(true)}>Editer cette annonce</button>
          <button className={`${btn} danger-bg`} onClick={() => handleDelete()}>Supprimer cette annonce</button>
          </>
        )}
      </div>

      
      <div className={propertyViewOwner}>
        <div className={top}>
          <h1> Contacter le vendeur </h1>
        </div>
        <div className={bottom}>
          <Image
            src={avatar ?? "/default_avatar.svg"}
            alt={`${first_name} profile picture`}
            className={profilePicture}
            width={92}
            height={92}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(92, 92)
            )}`}
          />
          <p className="bolder">
            {" "}
            M. {first_name} {last_name}{" "}
          </p>
          <p className="mb1">
            {isConnected
              ? `Email du vendeur: ${email}`
              : "Connectez-vous pour accéder aux coordonnées du vendeur."}
          </p>
          <p className="bolder">Adresse du bien :</p>
          <p>
            {isConnected
              ? address
              : "Connectez-vous pour accéder aux coordonnées du vendeur."}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
