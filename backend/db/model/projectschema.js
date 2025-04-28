const { Schema, model } = require("mongoose");
const projectSchema = Schema({
  name: { type: String, required: true },
  description: String,
});
const Project = model("projects", projectSchema);
module.exports = Project;
