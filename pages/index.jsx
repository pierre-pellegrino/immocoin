import Head from 'next/head'
import { useAtom } from "jotai";
import { userAtom } from 'store';
import styles from "styles/Home.module.css";
import PropertiesList from 'components/PropertiesList/PropertiesList'
import HeroHeader from 'components/HeroHeader/HeroHeader'
import APIManager from './api/axiosMethods';
import { Oval } from 'react-loader-spinner';

export default function Home({ properties, error }) {
  const [user] = useAtom(userAtom);

  let content = (
    <>
      <h1 className={styles.title}>
        Bonjour {user?.first_name} !
      </h1>
      
      <PropertiesList properties={properties} />
    </>
  )

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
        <div style={{ marginTop: "2rem" }}>Oups ! Nous rencontrons actuellement un petit souci, veuillez revenir plus tard !</div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ImmoCoin</title>
        <meta name="description" content="Achetez ici le logement de vos rêves." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HeroHeader />
        {content}
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  try {
    const response = await APIManager.getAllProperties();
    const properties = response.data.properties;
    return {
      props: {
        properties,
      },
    };
  } catch (e) {
    return {
      props: {
        error: true,
      },
    }
  }

}
