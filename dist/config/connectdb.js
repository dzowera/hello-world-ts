"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const mongouri = process.env.MONGODB_URI;
        if (!mongouri) {
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }
        await mongoose_1.default.connect(mongouri);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=connectdb.js.map