import { Provider } from "jotai";
import Layout from "components/layout";
import "styles/globals.css";
import 'styles/reset.scss';

const MyApp = ({ Component, pageProps }) => (
  <Provider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
