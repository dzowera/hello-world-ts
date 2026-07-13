import {Response, NextFunction} from "express";
import { AuthenticatedRequest } from "./auth.middleware";

const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

export default requireAdmin;

