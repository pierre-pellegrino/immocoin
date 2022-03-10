/* eslint-disable react/display-name */
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { isConnectedAtom } from "store";

const withPrivateRoute = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const [isConnected] = useAtom(isConnectedAtom);

      if (!isConnected) {
        router.push("/login?redirected");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withPrivateRoute;
