import withPrivateRoute from 'components/withPrivateRoute';
import ProfilePage from '../components/ProfilePage/ProfilePage';

const Profile = () => {
  return (
    <ProfilePage />
  );
}

export default withPrivateRoute(Profile);
