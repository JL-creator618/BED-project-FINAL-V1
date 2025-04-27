import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";

import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

//1 GET /all amenities
router.get("/", async (req, res) => {
  try {
    const amenities = getAmenities();

    if (!amenities || amenities.length === 0) {
      return res.status(404).send("No amenities found.");
    }
    res.status(200).json(amenities);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting list of Amenities!");
  }
});

//2 GET /amenities/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const amenity = getAmenityById(id);

    if (!amenity) {
      res.status(404).send(`Amenity with id ${id} was not found!`);
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while fetching the amenity");
    }
  }
});

//3 POST/amenities
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newAmenity = createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    console.error(error);
    if (error) {
      return res
        .status(500)
        .send("Something went wrong while creating new amnity!");
    }
  }
});

//4 PUT/amenities/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedAmenity = updateAmenityById(id, { name });

    if (!updatedAmenity) {
      res.status(404).send(`Amenity with id ${id} was not found!`);
    } else {
      res.status(200).json(updatedAmenity);
    }
  } catch (error) {
    console.error(error);

    if (error.message.includes("was not found")) {
      return res.status(404).send(error.message);
    }

    res.status(500).send("Something went wrong while creating new amnity!");
  }
});

//5 DELETE/amenities/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAmenity = deleteAmenityById(id);

    if (!deletedAmenity) {
      res.status(404).send(`Amenity with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Amenity with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting the amenity!");
  }
});

// Global 404 handler (for undefined routes)
router.use((req, res) => {
  res.status(404).send("Route not found.");
});

export default router;
