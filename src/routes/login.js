import { Router } from 'express';
import userData from "../data/users.json" with { type: "json" };
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => { 
  try{
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';
  
  const { username, password } = req.body;
  console.log("Request Body:", req.body);
 
  const { users } = userData;
  const user = users.find( (u) => u.username === username && u.password === password 
  );

  if (!user) { 
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey); 
 
  console.log("Generated Token:", token); 
  
  res.status(200).json({ message: "Successfully logged in!", token });
} catch (error) {
  console.error("Error in /login route:", error); 
  res.status(500).json({ message: "internal server error" });
}
});
// Global 404 handler (for undefined routes)
router.use((req, res) => {
  res.status(404).send("Route not found.");
});



export default router;
