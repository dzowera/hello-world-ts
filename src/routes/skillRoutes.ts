import express from "express";
import {
  getSkills,
  addSkill,
  findSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillControllers";
import { authenticateToken } from "../middleware/auth.middleware";

/**
 * @openapi
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Skills fetched successfully
 *   post:
 *     summary: Create a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, category, typeOfSkill]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               typeOfSkill:
 *                 type: string
 *     responses:
 *       201:
 *         description: Skill added successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/skills/{id}:
 *   get:
 *     summary: Get a skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill found
 *       404:
 *         description: Skill not found
 *   put:
 *     summary: Update a skill by ID
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill updated successfully
 *       403:
 *         description: You are not authorized to update this skill
 *   delete:
 *     summary: Delete a skill by ID
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *       403:
 *         description: You are not authorized to delete this skill
 */

const router = express.Router();

router.get("/", getSkills);
router.get("/:id", findSkillById);
router.post("/", authenticateToken, addSkill);
router.put("/:id", authenticateToken, updateSkill);
router.delete("/:id", authenticateToken, deleteSkill);

export default router;
