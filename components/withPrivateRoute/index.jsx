/* eslint-disable react/display-name */
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { userAtom } from "store";

const withPrivateRoute = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const [isConnected] = useAtom(userAtom);
      
      if (!isConnected) {
        Router.replace("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withPrivateRoute;
