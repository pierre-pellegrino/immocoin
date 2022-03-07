import Layout from "../components/layout";
import "../styles/globals.css";
import 'styles/reset.scss';

const MyApp = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
