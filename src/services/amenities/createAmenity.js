// amenities POST (Create a new amenity)
import amenityData from "../../data/amenities.json" with { type: "json" };
import { v4 as uuidv4 } from "uuid";

const createAmenity = (name) => {
    const newAmenity = {
        id: uuidv4(),
        name,
    };
    amenityData.amenities.push(newAmenity);

    return newAmenity;
};

export default createAmenity;