import {propertyViewPicture, propertyViewWrapper, propertyViewOwner, top, bottom} from './property_view.module.scss'
import { useAtom } from 'jotai';
import { isConnectedAtom } from "store";

const PropertyView = ({property, user}) => {
  const [isConnected] = useAtom(isConnectedAtom);
  const {title, description, picture, price, address} = property;
  const {email, first_name, last_name, avatar} = user;
  const cleanPrice = new String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className={propertyViewWrapper}>

      <div className="property">
        <h1> Annonce : </h1>
        <h3>{title}</h3>
        <h2 className="primary">{cleanPrice} €</h2>
        <div className={propertyViewPicture}>
          <img src={picture ? picture : "/nopic.svg"} alt={`${first_name}'s property on immocoin`}/>
        </div>

        <h3>Descriptif du bien : </h3>
        <p>
          {description}
        </p>
      </div>
      <div className={propertyViewOwner}>
        <div className={top}>
          <h1> Contacter le vendeur </h1>
        </div>
        <div className={bottom}>
          <img src={avatar ? avatar : "/default_avatar.svg"} alt={`${first_name} profile picture`}/>
          <p className="bolder"> M. {first_name} {last_name} </p>
          <p className="mb1">{isConnected ? `Email du vendeur: ${email}` : "Connectez-vous pour accéder aux coordonnées du vendeur."}</p>
          <p className="bolder">Adresse du bien :</p>
          <p>{isConnected ? address : "Connectez-vous pour accéder aux coordonnées du vendeur."}</p>

        </div>
      </div>
    </div>
  );
};

export default PropertyView;