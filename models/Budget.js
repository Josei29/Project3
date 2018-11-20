// Here we're creating our Budget Schema, specifying the type of data
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, required: true},
    amount: { type: Number, required: true}
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;

