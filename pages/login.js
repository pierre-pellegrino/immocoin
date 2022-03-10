import LoginForm from 'components/LoginForm/LoginForm';
import styles from 'styles/Home.module.css'

const login = ({ redirected }) => {
  return (
    <main className={styles.main}>
      <LoginForm redirected={redirected} />
    </main>
  )
}

export default login;

export const getServerSideProps = async (context) => {
  if (context.query.redirected === "true") {
    return {
      props: {
        redirected: true,
      },
    };
  }

  return {
    props: {},
  };
}
