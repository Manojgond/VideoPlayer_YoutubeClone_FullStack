import dotenv from "dotenv"
import connectDB from "../backend/src/db/index.js"
import { app } from "../backend/src/app.js";

dotenv.config({
    path: './env'
})


await connectDB();

app.get("/", (req, res) => {
    res.send("Backend is working on Vercel");
});

// Export Express app for Vercel
export default app;