"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.findSkillById = exports.addSkill = exports.getSkills = void 0;
const Skill_1 = __importDefault(require("../models/Skill"));
const mongoose_1 = require("mongoose");
const getSkills = async (req, res) => {
    try {
        const skills = await Skill_1.default.find();
        return res.status(200).json({ message: "Skills fetched successfully", skills });
    }
    catch (err) {
        return res.status(500).json({ message: "Error fetching skills", error: err });
    }
};
exports.getSkills = getSkills;
const addSkill = async (req, res) => {
    const { name, description, category, typeOfSkill } = req.body;
    const userId = req.userId;
    if (!name || !description || !category || !typeOfSkill) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const skill = await Skill_1.default.create({
            name,
            description,
            category,
            typeOfSkill,
            userId,
        });
        if (!skill) {
            return res.status(400).json({ message: "Error adding skill" });
        }
        return res.status(201).json({ message: "Skill added successfully", skill });
    }
    catch (err) {
        return res.status(500).json({ message: "Error adding skill", error: err });
    }
};
exports.addSkill = addSkill;
const findSkillById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid skill ID" });
    }
    try {
        const skill = await Skill_1.default.findById(id);
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }
        return res.status(200).json({ message: "Skill found", skill });
    }
    catch (err) {
        return res.status(500).json({ message: "Error finding skill", error: err });
    }
};
exports.findSkillById = findSkillById;
const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, description, category, typeOfSkill } = req.body;
    const userId = req.userId;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid skill ID" });
    }
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const skill = await Skill_1.default.findById(id);
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }
        if (skill.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this skill" });
        }
        const updatedSkill = await Skill_1.default.findByIdAndUpdate(id, { name, description, category, typeOfSkill }, { new: true });
        return res.status(200).json({ message: "Skill updated successfully", skill: updatedSkill });
    }
    catch (err) {
        return res.status(500).json({ message: "Error updating skill", error: err });
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid skill ID" });
    }
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const skill = await Skill_1.default.findById(id);
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }
        if (skill.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this skill" });
        }
        await Skill_1.default.findByIdAndDelete(id);
        return res.status(200).json({ message: "Skill deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Error deleting skill", error: err });
    }
};
exports.deleteSkill = deleteSkill;
//# sourceMappingURL=skillControllers.js.map