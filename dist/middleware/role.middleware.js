"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireAdmin = (req, res, next) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }
    next();
};
exports.default = requireAdmin;
//# sourceMappingURL=role.middleware.js.map