import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";

import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

//1 GET /hosts
router.get("/", (req, res) => {
  try {
    const { username, password } = req.query;
    const hosts = getHosts(username, password);

    if (!hosts || hosts.length === 0) {
      return res.status(404).send("No hosts found.");
    }
    res.status(200).json(hosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of hosts!");
  }
});

//2 GET /hosts/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching host with ID: ${id}`);

  try {
    const host = getHostById(id);

    if (!host) {
      res.status(404).send(`Host with id ${id} was not found!`);
    }
    res.status(200).json(host);
  } catch {
    console.error("error fetching host:", error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while fetching the host");
    }
  }
});

//3 POST /host
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture ||
      !aboutMe
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHost = createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while creating new host!");
    }
  }
});

//4 PUT /hosts/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    const updatedHost = updateHostById({
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    if (!updatedHost) {
      res.status(404).send(`Host with id ${id} was not found!`);
    } else {
      res.status(200).json(updatedHost);
    }
  } catch (error) {
    console.error(error);

    if (error.message.includes("was not found")) {
      return res.status(404).send(error.message);
    }

    res.status(500).send("Something went wrong while updating host by id!");
  }
});

//5 DELETE /host/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHost = await deleteHostById(id);

    if (!deletedHost) {
      res.status(404).send(`Host with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Host with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting host by id!");
  }
});

// Global 404 handler (for undefined routes)
router.use((req, res) => {
  res.status(404).send("Route not found.");
});

export default router;
