import { Router } from "express";
import { authenticate, authorizeRole } from "../middleware";


const router = Router();

router.get("/", authenticate , authorizeRole("pantry"), (req, res) => {
    res.json({ message: "Welcome to Pantry Dashboard" });
});

export default router;
