import { Router } from "express";
import { authenticate, authorizeRole } from "../middleware";


const router = Router();

router.get("/", authenticate, authorizeRole("delivery"), (req, res) => {
    res.json({ message: "Welcome to Delivery Dashboard" });
});

export default router;
