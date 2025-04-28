const express = require("express");
const Task = require("../model/taskschema");
const router = express.Router();

router.post("/task", async (req, res) => {
  try {
    const { body } = req;
    const response = await Task.create(body);
    return res
      .status(201)
      .json({ success: true, message: "Task added", data: response });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});
// router.get("/task", async (req, res) => {
//   try {
//     // const response = await Task.find().populate("project");
//     const response = await Task.find();

//     return res.status(200).json(response);
//   } catch (e) {
//     return res.status(500).json({ error: true, message: e.message });
//   }
// });
router.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Task.findById(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});
router.get("/task", async (req, res) => {
  try {
    const { sortorder = "asc", sortby = "title", page = 1, status } = req.query;

    // const { status } = req.query;
    if (status) {
      const response = await Task.find({ status: status });

      return res.status(200).json(response);
    } else {
      // const response = await Task.find();

      const response = await Task.find();
      // .sort({ [sortby]: sortorder })
      // .limit(2)
      // .skip((page - 1) * 2);
      return res.status(200).json(response);
    }
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});
router.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: `Task with ${id}  deleted` });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});
router.delete("/task", async (req, res) => {
  try {
    const response = await Task.deleteMany({}); // Deletes all documents in the collection
    return res.status(200).json({
      message: "All tasks deleted successfully",
      deletedCount: response.deletedCount,
    });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

router.patch("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const response = await Task.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: `Task with ${id} updated` });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
});

module.exports = router;
