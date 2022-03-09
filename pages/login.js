import LoginForm from 'components/LoginForm/LoginForm';
import styles from 'styles/Home.module.css'


const login = () => {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  )
}

export default login;