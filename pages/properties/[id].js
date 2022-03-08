import { useState, useEffect } from 'react';
import PropertyView from '../../components/PropertyView/PropertyView';
import styles from '../../styles/Home.module.css';
import APIManager from "pages/api/axiosMethods";
import { Oval } from 'react-loader-spinner';

const propertyDetail = ({id}) => {

  const [fetchedProperty, setFetchedProperty] = useState('');

  useEffect(() => {
    const getProperty = async () => {
      const response = await APIManager.getPropertyDetails(id);
      setFetchedProperty(response);
    }

    getProperty()
    .catch(console.error);
  }, [])

  if (fetchedProperty.length === 0) {
    return (
      <main className={styles.main}>
        <div>
          <Oval
            height="100"
            width="100"
            color='#0070F3'
            secondaryColor='#ddd'
            ariaLabel='loading'
          />
        </div>
        <p> Chargement en cours... </p>
      </main>
    );
  }
  else {
    return (
      <main className={styles.main}>
        <PropertyView property={fetchedProperty.data.property} user={fetchedProperty.data.user} />
      </main>
    );
  }
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: { id }
  }
}

export default propertyDetail;