"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectdb_1 = require("./config/connectdb");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// connect to the database
(0, connectdb_1.connectDB)();
// middleware to parse incoming JSON requests and form data, and allow cross-origin requests
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', (0, cors_1.default)());
// Routes
(0, swagger_1.setupSwagger)(app);
app.use("/api/users", userRoutes_1.default);
app.use("/api/skills", skillRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hello from Community Skill Exchange API");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map