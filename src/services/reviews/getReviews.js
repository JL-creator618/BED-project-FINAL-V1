//review: GET (Fetch all reviews and their information)
import reviewData from "../../data/reviews.json" with { type: 'json' };

const getReviews = (rating, comment) => {
    let reviews = reviewData.reviews;

  if (rating) {
    reviews = reviews.filter((review) => review.rating === rating);
  }
  if (comment) {
    reviews = reviews.filter((review) => review.comment === comment);
  }
    
    return reviews;
};

export default getReviews;