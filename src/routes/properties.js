import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";

import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

//1 GET /properties
router.get("/", async (req, res) => {
  try {
    const { title, location } = req.query;
    const properties = getProperties(title, location);

    if (!properties || properties.length === 0) {
      return res.status(404).send("No properties found.");
    }
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting list of properties!");
  }
});

//2 GET /properties/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const property = getPropertyById(id);

    if (!property) {
      res.status(404).send(`Property with id ${id} was not found!`);
    }
    res.status(200).json(property);
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while fetching the property");
    }
  }
});

//3 POST /properties
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    const newProperty = createProperty({
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });

    if (
      !title ||
      !description ||
      !location ||
      !pricePerNight ||
      !bedroomCount ||
      !bathRoomCount ||
      !maxGuestCount ||
      !hostId ||
      !rating
    ) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      res.status(201).json(newProperty);
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while fetching the property");
    }
  }
});

//4 PUT /properties/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    const updatedProperty = updatePropertyById(id, {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });

    if (!updatedProperty) {
      res.status(404).send(`Property with id ${id} was not found!`);
    } else {
      res.status(200).json(updatedProperty);
    }
  } catch (error) {
    console.error(error);

    if (error.message.includes("was not found")) {
      return res.status(404).send(error.message);
    }

    res.status(500).send("Something went wrong while updating property by id!");
  }
});

//5 DELETE /properties/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = deletePropertyById(id);

    if (!deletedProperty) {
      res.status(404).send(`Property with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Property with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting user by id!");
  }
});

// Global 404 handler (for undefined routes)
router.use((req, res) => {
  res.status(404).send("Route not found.");
});

export default router;
