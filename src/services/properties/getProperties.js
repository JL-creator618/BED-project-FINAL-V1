//properties: GET (Fetch all properties and their information)
import propertyData from "../../data/properties.json" with { type: 'json' };

const getProperties = (title, location) => {
  let properties = propertyData.properties;
    
  if (title) {
  properties = properties.filter((property) => property.title === title);
  }
  if (location) {
  properties = properties.filter((property) => property.location === location);
  }
    
  return properties;
};

export default getProperties;