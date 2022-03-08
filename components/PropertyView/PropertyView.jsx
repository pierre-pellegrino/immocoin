import {
  propertyViewPicture,
  propertyViewWrapper,
  propertyViewOwner,
  top,
  bottom,
  profilePicture,
} from "./property_view.module.scss";
import { useAtom } from "jotai";
import { isConnectedAtom } from "store";
import Image from "next/image";
import { shimmer, toBase64 } from "lib/image_loading";

const PropertyView = ({ property, picture, user }) => {
  const [isConnected] = useAtom(isConnectedAtom);
  const { title, description, price, address } = property;
  const { email, first_name, last_name, avatar } = user;
  const cleanPrice = new String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

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

        <h3>Descriptif du bien : </h3>
        <p>{description}</p>
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
