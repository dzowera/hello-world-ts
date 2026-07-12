import {Document, Schema, Types} from "mongoose";

export interface ISkill extends Document {
  name: string;
  description: string;
  category: string;
  typeOfSkill: string;
  userId: Types.ObjectId;
}