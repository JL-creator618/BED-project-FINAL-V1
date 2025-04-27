// DELETE / Amenity by Id  
import amenityData from "../../data/amenities.json" with { type: "json" };

const deleteAmenityById = (id) => {
    const amenityIndex = amenityData.amenities.findIndex((amenity) => amenity.id === id);

    if (amenityIndex === -1) {
        return null;
    }
    const deletedAmenity = amenityData.amenities.splice(amenityIndex, 1);
    return deletedAmenity;
};

export default deleteAmenityById;