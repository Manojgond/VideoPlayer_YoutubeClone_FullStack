import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js";

dotenv.config({
    path: './env'
})


await connectDB();

// Export Express app for Vercel
export default app;

// .then(()=>{
//     app.listen(process.env.PORT || 8000, ()=>{
//         console.log(`Server running successfully at PORT: ${process.env.PORT}`)
//     })
// })
// .catch((err)=>{
//     console.log("MongoDB connection failed !!", err);

// })
