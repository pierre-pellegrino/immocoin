import PropertyView from '../../components/PropertyView/PropertyView';
import styles from '../../styles/Home.module.css';
import APIManager from "pages/api/axiosMethods";
import { Oval } from 'react-loader-spinner';

const PropertyDetail = ({ user, property, picture, error }) => {
  let content = (
    <PropertyView property={property} user={user} picture={picture} />
  );

  if (error) {
    content = (
      <>
        <Oval
          height="100"
          width="100"
          color='hsl(212, 100%, 48%)'
          secondaryColor='#ddd'
          ariaLabel='loading'
        />
        <div style={{ marginTop: "2rem" }}>Oups ! Nous rencontrons actuellement un petit soucis, veuillez revenir plus tard !</div>
      </>
    );
  }

  return (
    <main className={styles.main}>
      {content}
    </main>
  );
}

export const getServerSideProps = async (context) => {
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

export default PropertyDetail;
