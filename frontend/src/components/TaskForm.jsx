// import "./TaskForm.css";
// import { Button, DatePicker, Form, Input, Select } from "antd";
// import { useState } from "react";

// const TaskForm = ({ setTasks }) => {

//   const [taskData, setTaskData] = useState({
//     heading: "",
//     description: "",
//     duedate: "",
//     priority: "low",
//     status: "todo",
//   });
//   const onChange = e => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setTaskData(prev => {
//       return { ...prev, [name]: value };
//     });
//   };
//   const handleSubmit = e => {
//     e.preventDefault();
//     // console.log(taskData);
//     setTasks(prev => {
//       return [...prev, taskData];
//     });
//   };

//   return (
//     <>
//       <header className="app_header">
//         <form onSubmit={handleSubmit}>
//           <p>
//             Heading :
//             <input type="text" name="heading" onChange={onChange} />
//           </p>

//           <p>
//             Description :
//             <input type="textarea" name="description" onChange={onChange} />
//           </p>
//           <p>
//             Due date :
//             <input type="date" name="duedate" onChange={onChange} />
//           </p>
//           {/* // onChange={e => onChangeDate(, "duedate")} */}
//           {/* //   onChange={onChangeDate} */}

//           <p>
//             Priority :
//             <select name="priority" onChange={onChange}>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </p>
//           <p>
//             Task Status :
//             <select name="status" onChange={onChange}>
//               <option value="todo">Todo</option>
//               <option value="doing">Doing</option>
//               <option value="done">Done</option>
//             </select>
//           </p>
//           <button>Add</button>
//         </form>
//       </header>
//     </>
//   );
// };
// export default TaskForm;

///////////////////////////////////////////////////////
//
import "./TaskForm.css";
// import { Button, DatePicker, Form, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { Button, message, Modal } from "antd";
import { DatePicker, Form, Input, Select, Space } from "antd";
import TaskColumn from "./TaskColumn/TaskColumn";
import { useNavigate } from "react-router-dom";
// import IndividualService from "./services/IndividualService";

import axios from "axios";
import locale from "antd/es/date-picker/locale/en_US";
import TaskCard from "./TaskCard/TaskCard";

// const TaskForm = ({ setTasks }) => {
const TaskForm = ({ setSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Edit, setEdit] = useState(false);
  // console.log(id, "id");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [addTask, setAddTask] = useState(false);
  const [selTask, setSelTask] = useState([]);

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [add, setAdd] = useState({
    title: "",
    description: "",
    project: "",
    status: "",
    deadline: "",
  });
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [project, setProject] = useState([]);
  const [show, setShow] = useState(false);

  // const head = useRef();

  const getProject = async () => {
    const response = await axios.get("http://localhost:4000/projects");
    // console.log(response.data);
    setProject(response.data);
  };
  useEffect(() => {
    getProject();
  }, []);
  const getTasks = async () => {
    const response = await axios.get("http://localhost:4000/task");
    // console.log(response.data);
    setData(response.data);
  };
  useEffect(() => {
    getTasks();
  }, []);

  const addTaskClicked = () => {
    setAddTask(true);
  };
  const onChange = (value, key) => {
    setAdd({ ...add, [key]: value });
  };
  const onChangeDate = (date, dateString) => {
    // console.log(dateString);
    // const AUTH_TOKEN = dateString;
    // const userToken = localStorage.getItem(AUTH_TOKEN);
    // IndividualService.setToken(userToken);
    // values["dead_line"] = moment(values.dead_line).format("YYYY-MM-DD");
    // IndividualService.postIndividual(values)
    // .then(resp => {
    //   console.log(resp);
    //   message.success("Succesfully added details");
    // })
    // .catch(error => {
    //   message.error("Error occurred", error.message);
    // });
    // const d = new Date(dateString);

    // const year = d.getFullYear(); // Extract the year
    // const month = String(d.getMonth() + 1).padStart(2, "0"); // Extract the month (zero-indexed, so add 1)
    // const day = String(d.getDate()).padStart(2, "0"); // Extract the day
    // const formattedDate = year + "-" + month + "-" + day;
    // console.log(formattedDate);
    // setAdd({ ...add, deadline: formattedDate });

    setAdd({ ...add, deadline: dateString });

    // console.log(add);
  };
  const onChangeSelect = value => {
    // console.log(dateString);
    setAdd({ ...add, status: value });
    // console.log(value);

    // console.log(add);
  };
  const onBtnClick = async () => {
    console.log(add);

    const response = await axios.post("http://localhost:4000/task", add);
    // navigate("/");
    // set(true);
    // console.log("inside add fn");
    setIsModalOpen(false);
    // getTasks();
  };
  // const handleCancel_sale = () => {
  //   setIsModalOpen_sale(false);
  // };
  const handleChange = async e => {
    // console.log(`selected ${id}`);
    const selected_res = await axios.get(
      `http://localhost:4000/task?status=${e}`
    );
    console.log(selected_res.data);

    setData(selected_res.data);
    setSelect(false);
    console.log(e);
    setShow(e);

    // setSelTask(selected_res);
    // setSelected(true);
  };
  const onFinish = values => {
    console.log("Form values:", values);
  };

  return (
    <>
      <div className="button">
        <Button onClick={showModal}>Add Task</Button>
        {/* <Select
          defaultValue="Tasks with status"
          style={{ width: 200 }}
          onChange={handleChange}
          allowClear
          options={[{ value: "lucy", label: "Lucy" }]}
          placeholder="Tasks with status"
        /> */}
        <Select
          style={{ width: 200 }}
          placeholder="Tasks with status"
          defaultValue={"Tasks with status"}
          onChange={e => {
            handleChange(e);
          }}
        >
          {/* {data.map(item => {
            return (
              <Select.Option value={item._id}>{item.status}</Select.Option>
            );
          })} */}

          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="In Progress">In Progress</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
        </Select>
      </div>
      <Modal
        title="Enter Task Details"
        open={isModalOpen}
        onCancel={handleCancel}
        onok={handleOk}
        onADD={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          initialValues={{
            title: "",
            description: "",
            project: "",
            status: "",
            deadline: "",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="Title"
            label="Title"
            rules={[
              {
                required: true,
                status: "Please enter the title!",
              },
            ]}
          >
            <Input
              onChange={e => onChange(e.target.value, "title")}
              placeholder="Enter the title"
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              showCount
              maxLength={100}
              onChange={e => onChange(e.target.value, "description")}
            />
          </Form.Item>
          <Form.Item label="Project">
            <Select
              defaultValue={"Choose project"}
              onChange={e => {
                onChange(e, "project");
              }}
            >
              {project.map(item => {
                return (
                  <Select.Option value={item._id}>{item.name}</Select.Option>
                );
              })}

              {/* <Select.Option value="medium">Medium</Select.Option> */}
              {/* <Select.Option value="high">High</Select.Option> */}
            </Select>
          </Form.Item>

          {/* <select
            value={book.author}
            onChange={e => {
              onInputChange(e, "author");
            }}
          >
            <option value="">Choose Author</option>
            {author.map(item => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </select> */}

          <Form.Item label="Status">
            <Select onChange={onChangeSelect} defaultValue={"Choose status"}>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Due Date">
            <DatePicker
              format="YYYY-MM-DD"
              name="dead_line"
              onChange={onChangeDate}
            />
          </Form.Item>

          <Form.Item>
            <Button onClick={onBtnClick}>Add</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="show_box">
        {show && (
          <TaskColumn
            title={show}
            tasks={data}
            status={show}
            show_button=""
            // setActiveCard={setActiveCard}
            // onDrop={onDrop}
          />
        )}
      </div>
      {/* <TaskColumn
        title="In Progress"
        tasks={tasks}
        status="In Progress"
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      /> */}
      {/* <TaskColumn
        title="Completed"
        tasks={tasks}
        status="Completed"
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      /> */}
    </>
  );
};
export default TaskForm;
