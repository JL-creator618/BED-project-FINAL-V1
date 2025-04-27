import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";

import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

//1 GET /reviews
router.get("/", async (req, res) => {
  try {
    const { rating, comment } = req.query;
    const reviews = getReviews(rating, comment);

    if (!reviews || reviews.length === 0) {
      return res.status(404).send("No properties found.");
    } else {
      res.status(200).json(reviews);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of reviews!");
  }
});

//2 GET /reviews/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = getReviewById(id);

    if (!review) {
      res.status(404).send(`Review with id ${id} was not found!`);
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while fetching the review");
    }
  }
});

//3 POST /reviews
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;

    const newReview = createReview({
      userId,
      propertyId,
      rating,
      comment,
    });

    if (!userId || !propertyId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      res.status(201).json(newReview);
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while creating new review!");
    }
  }
});

//4 PUT /reviews/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;

    const updatedReview = updateReviewById(id, {
      userId,
      propertyId,
      rating,
      comment,
    });

    if (!updatedReview) {
      res.status(404).send(`Review with id ${id} was not found!`);
    } else {
      res.status(200).json(updatedReview);
    }
  } catch (error) {
    console.error(error);

    if (error.message.includes("was not found")) {
      return res.status(404).send(error.message);
    }

    res.status(500).send("Something went wrong while updating review by id!");
  }
});

//5 DELETE /reviews/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = deleteReviewById(id);

    if (!deletedReview) {
      return res.status(404).send(`Review with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Review with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting review by id!");
  }
});

// Global 404 handler (for undefined routes)
router.use((req, res) => {
  res.status(404).send("Route not found.");
});

export default router;
