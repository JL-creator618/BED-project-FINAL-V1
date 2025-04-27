///properties POST (Create a new property
import propertyData from "../../data/properties.json" with { type: 'json' };
import { v4 as uuid } from 'uuid';

const createProperty = ({ 
    title, 
    description, 
    location, 
    pricePerNight, 
    bedroomCount, 
    bathRoomCount, 
    maxGuestCount, 
    hostId, 
    rating 
    }) => {
  const newProperty= {
    id: uuid(),
    title, 
    description, 
    location, 
    pricePerNight, 
    bedroomCount, 
    bathRoomCount, 
    maxGuestCount, 
    hostId, 
    rating
  };

  propertyData.properties.push(newProperty); 
  return newProperty; 
};

export default createProperty;