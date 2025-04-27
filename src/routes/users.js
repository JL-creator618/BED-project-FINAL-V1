import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";

import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

//0 Helper function to exclude password
const excludePassword = (user) => {
  if (!user) {
    return {};
  }
  const { password, ...safeUser } = user;
  return safeUser;
};

//1 GET /users/ - excluding password
router.get("/", async (req, res) => {
  try {
    const { username, password } = req.query;
    const users = getUsers(username, password);

    if (!users || users.length === 0) {
      return res.status(404).send("No users found.");
    }
    // Exclude password from each user object
    const safeUsers = users.map(excludePassword);
    res.status(200).json(safeUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of users!");
  }
});

//2 GET /users/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);

    if (!user) {
      return res.status(404).send(`User with id ${id} was not found!`);
    }
    // Exclude password from user object
    const safeUser = excludePassword(user);
    res.status(200).json(safeUser);
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while fetching the user");
    }
  }
});

//3 POST /users
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while fetching the user");
    }
  }
});

//4 PUT /users/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    const updatedUser = updateUserById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    if (!updatedUser) {
      res.status(404).send(`User with id ${id} was not found!`);
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error(error);

    if (error.message.includes("was not found")) {
      return res.status(404).send(error.message);
    }

    res.status(500).send("Something went wrong while updating user by id!");
  }
});

//5 DELETE /user/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      res.status(404).send(`User with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `User with id ${id} was deleted!`,
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
