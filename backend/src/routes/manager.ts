import { Router } from "express";
import { authenticate, authorizeRole } from "../middleware";


const router = Router();

router.get("/", authenticate, authorizeRole("manager"), (req, res) => {
    res.json({ message: "Welcome to Manager Dashboard" });
});


export default router;
