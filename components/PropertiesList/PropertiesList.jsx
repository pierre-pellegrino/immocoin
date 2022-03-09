import PropertyCard from "../PropertyCard/PropertyCard";
import { propertiesListWrapper } from './propertieslist.module.scss';
import Link from 'next/link';

const PropertiesList = ({ properties }) => (
  <div className={propertiesListWrapper}>
    {properties.map(property => {
      const { title, description, price, id } = property.property;
      const picture = property.picture;

      return (
        <Link href={`/properties/${id}`} key={id}>
          <a><PropertyCard 
            title={title} 
            description={description} 
            picture={picture}
            price={price} 
          />
          </a>
        </Link>
      )
    })}
  </div>
);

export default PropertiesList;
