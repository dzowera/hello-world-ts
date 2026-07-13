"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.isTokenRevoked = exports.revokeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const revokedTokens = new Set();
const revokeToken = (token) => {
    revokedTokens.add(token);
};
exports.revokeToken = revokeToken;
const isTokenRevoked = (token) => revokedTokens.has(token);
exports.isTokenRevoked = isTokenRevoked;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    if ((0, exports.isTokenRevoked)(token)) {
        return res.status(401).json({ message: "Token revoked" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = typeof decoded.id === "string" ? decoded.id : undefined;
        req.userRole = decoded.role === "admin" ? "admin" : "user";
        return next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid token", error: err });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.middleware.js.map