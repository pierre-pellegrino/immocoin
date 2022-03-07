import Cookies from "js-cookie";
import { Provider, useAtom } from "jotai";
import { useEffect } from "react";
import { userAtom, authTokenAtom } from "store";
import Header from "../header";

const Layout = ({ children }) => {
  const [_user, setUser] = useAtom(userAtom);
  const [_authToken, setAuthToken] = useAtom(authTokenAtom);

  useEffect(() => {
    setAuthToken(Cookies.get("token"));
    setUser
  }, []);

  return (
    <Provider>
      <Header />
      <main>
        {children}
      </main>
    </Provider>
  );
};

export default Layout;
