import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import Skill from "../models/Skill";
import { Types } from "mongoose";

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find();
    return res.status(200).json({ message: "Skills fetched successfully", skills });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching skills", error: err });
  }
};

export const addSkill = async (req: AuthenticatedRequest, res: Response) => {
  const { name, description, category, typeOfSkill } = req.body;
  const userId = req.userId;

  if (!name || !description || !category || !typeOfSkill) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const skill = await Skill.create({
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
  } catch (err) {
    return res.status(500).json({ message: "Error adding skill", error: err });
  }
};

export const findSkillById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid skill ID" });
  }

  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    return res.status(200).json({ message: "Skill found", skill });
  } catch (err) {
    return res.status(500).json({ message: "Error finding skill", error: err });
  }
};

export const updateSkill = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params as { id: string };
  const { name, description, category, typeOfSkill } = req.body;
  const userId = req.userId;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid skill ID" });
  }

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this skill" });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { name, description, category, typeOfSkill },
      { new: true },
    );

    return res.status(200).json({ message: "Skill updated successfully", skill: updatedSkill });
  } catch (err) {
    return res.status(500).json({ message: "Error updating skill", error: err });
  }
};

export const deleteSkill = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params as { id: string };
  const userId = req.userId;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid skill ID" });
  }

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this skill" });
    }

    await Skill.findByIdAndDelete(id);
    return res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting skill", error: err });
  }
};
