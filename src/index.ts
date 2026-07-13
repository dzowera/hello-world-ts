import express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connectdb";
import userRoutes from "./routes/userRoutes";
import skillRoutes from "./routes/skillRoutes";
import { setupSwagger } from "./swagger";
dotenv.config()

const app = express()
const PORT: any = process.env.PORT || 3000

// connect to the database
connectDB();

// middleware to parse incoming JSON requests and form data, and allow cross-origin requests
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.options(/(.*)/, cors())

// Routes
setupSwagger(app);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes)

app.get("/", (req: Request, res:Response) =>{
  res.send("Hello from Community Skill Exchange API")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});