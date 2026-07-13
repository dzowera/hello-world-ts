"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const auth_middleware_1 = require("../middleware/auth.middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
// register a user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    const normalizedRole = role === "admin" ? "admin" : "user";
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User_1.default.create({ name, email, password, role: normalizedRole });
        const userResponse = user.toObject();
        const safeUser = {
            id: userResponse._id,
            name: userResponse.name,
            email: userResponse.email,
            role: userResponse.role,
        };
        return res.status(201).json({ message: "User registered successfully", user: safeUser });
    }
    catch (error) {
        return res.status(500).json({ message: "Error registering user", error });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "User logged in successfully", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    catch (error) {
        return res.status(500).json({ message: "Error logging in", error });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token) {
            (0, auth_middleware_1.revokeToken)(token);
        }
        return res.status(200).json({ message: "User logged out successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Error logging out", error: err });
    }
};
exports.logoutUser = logoutUser;
const deleteUser = async (req, res) => {
    const userId = req.userId;
    const userRole = req.userRole;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!userRole || userRole !== "admin") {
        return res.status(403).json({ message: "Insufficient permissions" });
    }
    const userIdParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(userIdParam)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const deletedUser = await User_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting user", error });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userControllers.js.map