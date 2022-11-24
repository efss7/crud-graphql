import mongoose from "mongoose";

mongoose.connect(process.env.URI_MONGO as string)
.then(()=>console.log("Mongodb connected"))
.catch(error=>console.log(error));