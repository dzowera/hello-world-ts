import mongoose from "mongoose"
import { ISkill } from "../types/skill.types"

const SkillSchema = new mongoose.Schema<ISkill>({
  name:{
    type: String,
    required: true
  }, 

  description:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  typeOfSkill:{
    type: String,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  } 
})

const Skill = mongoose.model<ISkill>("Skill", SkillSchema)
export default Skill