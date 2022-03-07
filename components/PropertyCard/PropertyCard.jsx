import React from 'react';
import { propertyCard, propertyCardPicture, propertyCardPrice, propertyCardDescription, propertyCardContent } from './propertycard.module.scss';

const PropertyCard = ({title, description, picture, price}) => {

  // Formats description to display it nicely
  const descriptionToDisplay = description && description.length > 140 ? `${description.slice(0,140)}...` : description || "Description not available.";

  return (
    <div className={propertyCard}>
      <div className={propertyCardPicture}>
        <img src={picture || "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} />
      </div>

      <div className={propertyCardContent}>
        <h2>{title || "Nom de l'annonce"}</h2>
        <p className={propertyCardPrice}>{price || "N/C"}€</p>
        <p className={propertyCardDescription}> 
          {descriptionToDisplay}
        </p>
      </div>

    </div>
  );
};

export default PropertyCard;