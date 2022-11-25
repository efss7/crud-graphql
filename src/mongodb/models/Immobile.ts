import mongoose from "mongoose";

const schema = new mongoose.Schema({
    type: String,
    address: String,
    ownerId: String,
});

export const ImmobileMongo = mongoose.model("Immobile", schema)