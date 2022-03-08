import Head from 'next/head'
import { useAtom } from "jotai";
import { userAtom } from 'store';
import styles from "styles/Home.module.css";
import PropertiesList from 'components/PropertiesList/PropertiesList'

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
      </main>
    </div>
  )
}
