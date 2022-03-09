import ProfilePage from "../components/ProfilePage/ProfilePage";
import APIManager from "./api/axiosMethods";
import { Oval } from "react-loader-spinner";
import withPrivateRoute from "components/withPrivateRoute";

const Profile = ({ properties, error }) => {
  // const cleanedProperties = properties.filter(property => property.user_id === user.id);

  let content = (
    <>
      {/* <ProfilePage properties={cleanedProperties}/> */}
      <ProfilePage properties={properties} />
    </>
  );

  if (error) {
    content = (
      <>
        <Oval
          height="100"
          width="100"
          color="hsl(212, 100%, 48%)"
          secondaryColor="#ddd"
          ariaLabel="loading"
        />
        <div style={{ marginTop: "2rem" }}>
          Oups ! Nous rencontrons actuellement un petit souci, veuillez revenir
          plus tard !
        </div>
      </>
    );
  }

  return content;
};

export default withPrivateRoute(Profile);

export const getStaticProps = async () => {
  try {
    const response = await APIManager.getAllProperties();
    const properties = response.data.properties;
    // Trier ici les properties qui correspondent au user (à faire quand j'aurai un login)
    return {
      props: {
        properties,
      },
    };
  } catch (e) {
    return {
      props: {
        error: true,
      },
    };
  }
};
