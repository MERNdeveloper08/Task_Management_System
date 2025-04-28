const express = require("express");
const cors = require("cors");
const db = require("./db");
const ProjectRoutes = require("./db/routes/projectroutes");
const TaskRoutes = require("./db/routes/taskroutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(ProjectRoutes);
app.use(TaskRoutes);

app.listen(4000, () => {
  console.log("App is running");
});
