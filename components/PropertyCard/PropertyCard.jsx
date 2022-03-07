import React from 'react';
import { propertyCard, propertyCardPicture, propertyCardPrice, propertyCardDescription, propertyCardContent } from './propertycard.module.scss';

const PropertyCard = ({title, description, picture, price}) => {

  const descriptionToDisplay = `${(description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac lorem et nisi tincidunt volutpat sed nec eros. Suspendisse quis est a ipsum finibus posuere vitae ac erat. Suspendisse facilisis laoreet magna, nec porttitor ante ornare eget. Nunc nec justo fringilla, euismod magna vitae, finibus justo. Quisque molestie eu eros nec tempor. Sed imperdiet lacus est, id mattis augue finibus eget. Suspendisse eleifend arcu vel justo sollicitudin lobortis. Nulla porttitor ante vel quam vehicula, sed auctor dolor rhoncus. Aliquam erat volutpat. Aliquam in dui vitae ligula pulvinar dapibus. In et hendrerit neque. Aenean faucibus blandit enim, sed interdum lorem elementum non.").slice(0,180)}...`;
  return (
    <div className={propertyCard}>
      <div className={propertyCardPicture}>
        <img src={picture || "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} />
      </div>

      <div className={propertyCardContent}>
        <h2> {title || "Nom de l'annonce trop long"} </h2>
        <p className={propertyCardPrice}> {price || "178.000€"}</p>
        <p className={propertyCardDescription}> 
          {descriptionToDisplay}
        </p>
      </div>

    </div>
  );
};

export default PropertyCard;