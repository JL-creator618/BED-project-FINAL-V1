//review/:id PUT (Update a review)
import reviewData from "../../data/reviews.json" with { type: 'json' };

const updateReviewById = (id, updatedReview) => { 
    
    
    const reviewIndex = reviewData.reviews.findIndex((review) => review.id === id);
    if (reviewIndex === -1) {
        return null;
    }

    const { userId, propertyId, rating, comment } = updatedReview;
    
    const currentReview = reviewData.reviews[reviewIndex];

    currentReview.userId = userId ?? currentReview.userId;
    currentReview.propertyId = propertyId ?? currentReview.propertyId;
    currentReview.rating = rating ?? currentReview.rating;
    currentReview.comment = comment ?? currentReview.comment;

  return currentReview;
};


export default updateReviewById;
