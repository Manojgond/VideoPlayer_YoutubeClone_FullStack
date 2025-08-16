import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "../src/app.js";

dotenv.config({
    path: './env'
})


await connectDB();

app.get("/", (req, res) => {
    res.send("Backend is working on Vercel");
});

// Export Express app for Vercel
export default app;