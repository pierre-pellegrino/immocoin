import {propertyViewPicture} from './property_view.module.scss'
import Image from 'next/image';

const PropertyView = ({property, user}) => {
  const {id, title, description, picture, price} = property;
  const {email, first_name, last_name, avatar} = user;
  const cleanPrice = new String(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  console.log(cleanPrice)

  return (
    <>
      <h1>{title}</h1>
      <h2 className="primary">{cleanPrice} €</h2>
      <div className={propertyViewPicture}>
        <img src={picture ? picture : "/nopic.svg"} alt={`${first_name}'s property on immocoin`}/>
      </div>
    </>
  );
};

export default PropertyView;