const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Todo", todoSchema);
