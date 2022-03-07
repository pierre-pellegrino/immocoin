import { Provider } from "jotai";
import Header from "../header";

const Layout = ({ children }) => {
  return (
    <Provider>
      <div className="Layout">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </Provider>
  );
};

export default Layout;
