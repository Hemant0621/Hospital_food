"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
// Register Route
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password, role } = req.body;
    if (!name || !username || !email || !password || !role) {
        res.status(400).send({ message: "All fields are required" });
        return;
    }
    try {
        const existingEmail = yield user_1.default.findOne({ email });
        const existingUsername = yield user_1.default.findOne({ username });
        if (existingEmail) {
            res.status(400).send({ message: "Email already in use" });
            return;
        }
        if (existingUsername) {
            res.status(400).send({ message: "Username already in use" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new user_1.default({ name, username, email, password: hashedPassword, role });
        yield user.save();
        res.status(201).send({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Error registering user", error });
    }
}));
// Login Route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ message: "All fields are required" });
        return;
    }
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.send({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).send({ message: "Error logging in", error });
    }
}));
exports.default = router;
