const mongoose = require("mongoose");
// Creating schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
// Creating model using schema
const todomodel = mongoose.model("todo", todoSchema);
// exporting model
module.exports = todomodel;
