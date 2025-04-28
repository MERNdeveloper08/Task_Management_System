const { Schema, model } = require("mongoose");
const taskSchema = Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: Schema.Types.ObjectId, ref: "projects" },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"] },
  deadline: { type: Date },
});
const Task = model("tasks", taskSchema);
module.exports = Task;
