import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.URI_MONGO as string)
.then(()=>console.log("Mongodb connected"))
.catch(error=>console.log(error));
