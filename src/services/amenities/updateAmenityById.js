// PUT update amenity by ID
import amenityData from "../../data/amenities.json" with { type: 'json' };


const updateAmenityById = (id, name) => { 
    const amenityIndex  = amenityData.amenities.findIndex( (amenity) => amenity.id === id);

    if (amenityIndex === -1) { 
        return null;
    }
    
    const amenity = amenityData.amenities[amenityIndex];
    
    amenity.name = name ?? amenity.name;  

    return amenity;

};

export default updateAmenityById;