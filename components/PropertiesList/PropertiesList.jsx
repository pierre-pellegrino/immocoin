import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import APIManager from "pages/api/axiosMethods";
import PropertyCard from "../PropertyCard/PropertyCard";
import { propertiesListWrapper } from './propertieslist.module.scss';

const PropertiesList = () => {

  const [fetchedProperties, setFetchedProperties] = useState("");

  useEffect(() => {
    const getProperties = async () => {
      const response = await APIManager.getAllProperties();
      setFetchedProperties(response.data.properties);
    }
    
    getProperties()
    .catch(console.error);
  }, [])


  if (fetchedProperties.length === 0) {
    return (
      <>
        <div>
          <Oval
            height="100"
            width="100"
            color='#0070F3'
            secondaryColor='#ddd'
            ariaLabel='loading'
          />
        </div>
        <p> Chargement des logements en cours... </p>
      </>
    );
  }
  else {
    return (
      <div className={propertiesListWrapper}>
        {fetchedProperties.map(property => {
          const { title, description, picture, price, id } = property;
          return (
            <PropertyCard 
              title={title} 
              description={description} 
              picture={picture} 
              price={price} 
              key={id}
            />
          )
        })}
      </div>
    );
  }
  
};

export default PropertiesList;