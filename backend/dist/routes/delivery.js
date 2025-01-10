"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.get("/", middleware_1.authenticate, (0, middleware_1.authorizeRole)("delivery"), (req, res) => {
    res.json({ message: "Welcome to Delivery Dashboard" });
});
exports.default = router;
