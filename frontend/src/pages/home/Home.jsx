import React from "react";
import { Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import TaskForm from "../../components/TaskForm/TaskForm";
import Navbar from "../../components/Navbar/navbar";
import "./home.css";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import Graph from "../graph/graph";

import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [select, setSelect] = useState(true);

  const getTasks = async () => {
    const response = await axios.get("http://localhost:4000/task");
    // console.log(response.data);
    setTasks(response.data);
  };
  useEffect(() => {
    getTasks();
  }, []);

  const onDrop = async (status, position) => {
    // console.log(
    //   `${activeCard} is going to place into ${status} and at the position ${position}`
    // );
    if (activeCard === null || activeCard === undefined) return;
    console.log(activeCard);

    // const taskTomove = tasks[activeCard];
    // const updatedTasks = tasks.filter((task, index) => index !== activeCard);
    // updatedTasks.splice(position, 0, { ...taskTomove, status: status });

    const taskTomove = tasks[activeCard];

    const updatedTasks = tasks.filter((task, index) => index !== activeCard);
    updatedTasks.splice(position, 0, { ...taskTomove, status: status });

    // console.log(tasks);
    // console.log(taskTomove);
    // console.log(status, "Status");
    // console.log(updatedTasks);

    const res = await axios.delete("http://localhost:4000/task");
    updatedTasks.map(async item => {
      const response = await axios.post("http://localhost:4000/task", item);
      // You might want to handle the response or errors here
      console.log(response.data);
      location.reload();
    });

    useEffect(() => {
      onDrop();
    }, []);

    console.log(updatedTasks);

    // const response = await axios.post(
    //   "http://localhost:4000/task",
    //   updatedTasks
    // );

    // const response = await axios.patch(
    //   `http://localhost:4000/task/${taskTomove._id}`,
    //   updatedTasks
    // );
    // setTasks(updatedTasks);
  };

  return (
    <>
      <Navbar />

      <TaskForm setSelect={setSelect} />

      <div className="app">
        <main className="app_main">
          {select && (
            <TaskColumn
              title="Pending"
              tasks={tasks}
              status="Pending"
              setActiveCard={setActiveCard}
              show_button="true"
              onDrop={onDrop}
            />
          )}
          {select && (
            <TaskColumn
              title="In Progress"
              tasks={tasks}
              status="In Progress"
              setActiveCard={setActiveCard}
              onDrop={onDrop}
              show_button="true"
            />
          )}
          {select && (
            <TaskColumn
              title="Completed"
              tasks={tasks}
              status="Completed"
              setActiveCard={setActiveCard}
              onDrop={onDrop}
              show_button="true"
            />
          )}
        </main>

        {/* <h1>Active card :{activeCard}</h1> */}
      </div>
    </>
  );
};
export default Home;
