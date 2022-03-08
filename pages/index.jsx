import Head from 'next/head'
import { useAtom } from "jotai";
import { userAtom } from 'store';
import styles from "styles/Home.module.css";
import PropertyCard from 'components/PropertyCard/PropertyCard'
import PropertiesList from 'components/PropertiesList/PropertiesList'
import APIManager from './api/axiosMethods'

export default function Home() {

  const [user] = useAtom(userAtom);

  return (
    <div className={styles.container}>
      <Head>
        <title>ImmoCoin</title>
        <meta name="description" content="Achetez ici le logement de vos rêves." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Salut {user?.email ?? "étranger"} !
        </h1>
        <PropertiesList />
        {/* <PropertyCard description={"WOH SUPER MAISON LA WOH SUPER MAISON LA WOH SUPER MAISON LA WOH SUPER MAISON LA WOH SUPER MAISON LA WOH SUPER MAISON LA WOH SUPER MAISON LA WOH SUPER MAISON LA WOH SUPER MAISON LA "}/> */}
      </main>
    </div>
  )
}
