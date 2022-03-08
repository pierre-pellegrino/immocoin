import styles from '../../styles/Home.module.css';

const propertyDetail = ({id}) => {
  
  return (
    <div className={styles.container}>
      {id}
    </div>
  )
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: { id }
  }
}

export default propertyDetail;