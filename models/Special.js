// Here we're creating our Special Schema, specifying the type of data
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialSchema = new Schema({
    goal: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true}
});

const Special = mongoose.model("Special", specialSchema);

module.exports = Special;