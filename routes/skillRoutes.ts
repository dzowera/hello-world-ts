import express from "express";
import {
  getSkills,
  addSkill,
  findSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillControllers";
import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", getSkills);
router.get("/:id", findSkillById);
router.post("/", authenticateToken, addSkill);
router.put("/:id", authenticateToken, updateSkill);
router.delete("/:id", authenticateToken, deleteSkill);

export default router;
