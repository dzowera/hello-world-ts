"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skillControllers_1 = require("../controllers/skillControllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
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
const router = express_1.default.Router();
router.get("/", skillControllers_1.getSkills);
router.get("/:id", skillControllers_1.findSkillById);
router.post("/", auth_middleware_1.authenticateToken, skillControllers_1.addSkill);
router.put("/:id", auth_middleware_1.authenticateToken, skillControllers_1.updateSkill);
router.delete("/:id", auth_middleware_1.authenticateToken, skillControllers_1.deleteSkill);
exports.default = router;
//# sourceMappingURL=skillRoutes.js.map