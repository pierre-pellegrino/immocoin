import { shimmer, toBase64 } from "lib/image_loading";
import Image from "next/image";
import React from "react";
import {
  propertyCard,
  propertyCardPicture,
  propertyCardPrice,
  propertyCardDescription,
  propertyCardContent,
  picContainer,
  pic,
} from "./propertycard.module.scss";

const PropertyCard = ({ title, description, picture, price }) => {
  // Formats description to display it nicely
  const descriptionToDisplay =
    description && description.length > 140
      ? `${description.slice(0, 140)}...`
      : description || "Description not available.";

  const cleanPrice = new String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className={propertyCard}>
      <div className={propertyCardPicture}>
        <div className={picContainer}>
          <div className={pic}>
            <Image
              src={picture ?? "/nopic.svg"}
              alt={`property picture`}
              width={600}
              height={450}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(600, 450)
              )}`}
            />
          </div>
        </div>
      </div>

      <div className={propertyCardContent}>
        <h2>{title || "Nom de l'annonce"}</h2>
        <p className={propertyCardPrice}>{cleanPrice || "N/C"}€</p>
        <p className={propertyCardDescription}>{descriptionToDisplay}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
