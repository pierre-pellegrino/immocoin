import ProfilePage from '../components/ProfilePage/ProfilePage';
import APIManager from './api/axiosMethods';
import {useAtom} from 'jotai';
import {userAtom} from 'store';
import {useRouter} from 'next/router';
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';


const Profile = ({properties, error}) => {
  const [user] = useAtom(userAtom);
  const router = useRouter();

  // const cleanedProperties = properties.filter(property => property.user_id === user.id);

  useEffect(() => {
    // Kinda works but cheesy, it briefly shows the page then redirects to home...
    // update : doesn't work at all kek
    // (!user) && router.back();
  }, [])

  let content = (
    <>
      {/* <ProfilePage properties={cleanedProperties}/> */}
      <ProfilePage properties={properties}/>
    </>
  )

  if (error) {
    content = (
      <>
        <Oval
          height="100"
          width="100"
          color='hsl(212, 100%, 48%)'
          secondaryColor='#ddd'
          ariaLabel='loading'
        />
        <div style={{ marginTop: "2rem" }}>Oups ! Nous rencontrons actuellement un petit souci, veuillez revenir plus tard !</div>
      </>
    );
  }

  return (
    content
  )
}

export default Profile;

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
    }
  }

}
