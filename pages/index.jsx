import Head from 'next/head'
import { useAtom } from "jotai";
import { userAtom } from 'store';
import styles from "styles/Home.module.css";
import PropertiesList from 'components/PropertiesList/PropertiesList'
import HeroHeader from 'components/HeroHeader/HeroHeader'
import APIManager from './api/axiosMethods';

export default function Home({ properties }) {

  const [user] = useAtom(userAtom);

  return (
    <div className={styles.container}>
      <Head>
        <title>ImmoCoin</title>
        <meta name="description" content="Achetez ici le logement de vos rêves." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroHeader />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Salut {user?.email ?? "étranger"} !
        </h1>
        
        <PropertiesList properties={properties} />
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await APIManager.getAllProperties();
  const properties = response.data.properties;

  return {
    props: {
      properties,
    },
  };
}
