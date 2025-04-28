const express = require("express");
const Project = require("../model/projectschema");
const router = express.Router();

router.post("/projects", async (req, res) => {
  try {
    const { body } = req;
    const response = await Project.create(body);
    return res
      .status(201)
      .json({ success: true, message: "Project added", data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

router.get("/projects", async (req, res) => {
  try {
    const response = await Project.find();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});
router.delete("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Project.findByIdAndDelete(id);
    return res.status(200).json({ message: `Project with ${id}  deleted` });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});
router.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Project.findById(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});
router.patch("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const response = await Project.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: `Project with ${id} updated` });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

module.exports = router;
