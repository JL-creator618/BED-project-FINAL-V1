//amenities: GET (Fetch all amenities)
import amenityData from "../../data/amenities.json" with { type: 'json' };

const getAmenities = () => { 
   return amenityData.amenities;
};

export default getAmenities;