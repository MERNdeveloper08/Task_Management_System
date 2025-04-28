import React from "react";
import "./graph.css";
import Navbar from "../../components/Navbar/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Function to process data and group by month
const processData = data => {
  const groupedData = {};

  data.forEach(item => {
    // Convert deadline to Year-Month format
    const month = item.deadline.split("T")[0].slice(0, 7); // Extracts "YYYY-MM"

    if (!groupedData[month]) {
      groupedData[month] = {
        month,
        Completed: 0,
        Pending: 0,
        "In Progress": 0,
      };
    }
    groupedData[month][item.status] += 1;
  });

  return Object.values(groupedData).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
};
const Graph = () => {
  const [data, setData] = useState([]);

  const getTasks = async () => {
    const response = await axios.get("http://localhost:4000/task");
    // console.log(response.data);
    setData(response.data);
  };
  useEffect(() => {
    getTasks();
  }, []);
  console.log(data);

  const chartData = processData(data);

  return (
    <div>
      <Navbar />
      <h3> Graph analysis</h3>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Stacked bars for each status */}
          <Bar dataKey="Completed" stackId="a" fill="#00C49F" />
          <Bar dataKey="In Progress" stackId="a" fill="#FF8042" />

          <Bar dataKey="Pending" stackId="a" fill="#FFBB28" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
