import { Provider } from "jotai";
import Layout from "components/layout";
import 'styles/reset.scss';
import "styles/globals.css";

const MyApp = ({ Component, pageProps }) => (
  <Provider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;

export const getServerSideProps = () => {
  
}
