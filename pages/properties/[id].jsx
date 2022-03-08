import { useState, useEffect } from 'react';
import PropertyView from '../../components/PropertyView/PropertyView';
import styles from '../../styles/Home.module.css';
import APIManager from "pages/api/axiosMethods";
import { Oval } from 'react-loader-spinner';

const PropertyDetail = ({ user, property, picture }) => {

  // const [fetchedProperty, setFetchedProperty] = useState('');

  // useEffect(() => {
  //   const getProperty = async () => {
  //     const response = await APIManager.getPropertyDetails(id);
  //     setFetchedProperty(response);
  //   }

  //   getProperty()
  //   .catch(console.error);
  // }, [])

  // if (fetchedProperty.length === 0) {
  //   return (
  //     <main className={styles.main}>
  //       <div>
  //         <Oval
  //           height="100"
  //           width="100"
  //           color='#0070F3'
  //           secondaryColor='#ddd'
  //           ariaLabel='loading'
  //         />
  //       </div>
  //       <p> Chargement en cours... </p>
  //     </main>
  //   );
  // }

  return (
    <main className={styles.main}>
      <PropertyView property={property} user={user} picture={picture} />
    </main>
  );
}

export const getStaticProps = async (context) => {
  const { id } = context.params;

  const response = await APIManager.getPropertyDetails(id);
  const { property, picture, user } = response.data;

  return {
    props: {
      property,
      picture,
      user,
    },
  }
}

export const getStaticPaths = async () => {
  const response = await APIManager.getAllProperties();
  const paths = response.data.properties.map((property) => ({
    params: {
      id: property.property.id.toString()
    }
  }));

  return {
    paths,
    fallback: false,
  }
}

export default PropertyDetail;
