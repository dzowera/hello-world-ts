import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) =>{
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    return res.status(401).json({message: "No token provided"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({message: "Invalid token", error: err})
    next(err)
  }
  
}