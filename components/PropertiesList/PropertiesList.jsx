import PropertyCard from "../PropertyCard/PropertyCard";
import { propertiesListWrapper, propertiesListProfile } from './propertieslist.module.scss';
import Link from 'next/link';

const PropertiesList = ({ properties, profile }) => (
  <>
    {properties.length === 0 && <p>Vous n&apos;avez pas encore créé d&apos;annonces</p>}
    <div className={`${propertiesListWrapper} ${profile && propertiesListProfile}`}>
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
  </>
);

export default PropertiesList;
