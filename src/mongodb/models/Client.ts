import mongoose from "mongoose";
import { TYPE } from "../../models/Client";

const schema = new mongoose.Schema({
    name: String,
    type: String,
    contact: String
});

export const ClientMongo = mongoose.model("Client", schema)