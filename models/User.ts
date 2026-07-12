import mongoose, { Schema} from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.types";


// Define the schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Pre-save hook for hashing
UserSchema.pre("save" as any, async function (this: any, next: any) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password);
};

// Export the model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
