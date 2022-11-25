import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    type: String,
    contact: String
});

export const ClientMongo = mongoose.model("Client", schema)