///reviews POST (Create a new review)
import reviewData from "../../data/reviews.json" with { type: 'json' };
import { v4 as uuid } from 'uuid';

const createReview = ({
    userId,
    propertyId,
    rating,
    comment
}) => {
  const newReview= {
    id: uuid(),
    userId,
    propertyId,
    rating,
    comment
  };

  reviewData.reviews.push(newReview); 

  return newReview; 
};

export default createReview;