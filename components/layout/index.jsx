import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "store";
import Header from "../header";
import APIManager from "pages/api/axiosMethods";

const Layout = ({ children }) => {
  const [_user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await APIManager.logInFromToken();
        setUser(response.data);
      } catch (e) {
        console.error(e);
      }
    }

    if (Cookies.get("token")) getUser();
  }, [setUser]);

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;
