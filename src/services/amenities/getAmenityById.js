// GET amenity by ID
import amenityData from "../../data/amenities.json" with { type: 'json' };

const getAmenityById = (id) => {
    return amenityData.amenities.find((amenity) => amenity.id === id);

};

export default getAmenityById;