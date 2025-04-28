import axios from "axios";
import { DatePicker, Form, Input, Select, Button, Modal } from "antd";
import dayjs from "dayjs";

import { useState, useEffect } from "react";

import "./TaskCard.css";
import TaskForm from "../TaskForm";
const TaskCard = ({
  index,
  title,
  description,
  deadline,
  id,
  status,
  setActiveCard,
  show_button,
}) => {
  const [editTask, setEditTask] = useState({
    _id: "",
    title: "",
    description: "",
    project: "",
    status: "",
    deadline: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [project, setProject] = useState([]);
  // const [editTask, setEditTask] = useState([]);
  // const [addTask, setAddTask] = useState(false);

  const [project, setProject] = useState([]);
  const [p, setP] = useState();
  // const [selected, setSelected] = useState(false);

  // const head = useRef();
  const defaultDate = dayjs(editTask.deadline, "YYYY-MM-DD");

  const getProject = async () => {
    const response = await axios.get("http://localhost:4000/projects");
    // console.log(response.data);
    setProject(response.data);
  };
  useEffect(() => {
    getProject();
  }, []);

  const modalOpen = () => {
    setIsEditModalOpen(true);
  };
  const handleOk = () => {
    setIsEditModalOpen(false);
  };
  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  const onChange = (value, key) => {
    setEditTask({ ...editTask, [key]: value });
  };
  const onChangeDate = (date, dateString) => {
    console.log(dateString);
    setEditTask({ ...editTask, deadline: dateString });
    // console.log(add);
  };
  const onChangeSelect = value => {
    // console.log(dateString);
    setEditTask({ ...editTask, status: value });
    // console.log(value);

    // console.log(add);
  };
  const onBtnClick = async id => {
    console.log(editTask);

    const response = await axios.patch(
      `http://localhost:4000/task/${id}`,
      editTask
    );
    // navigate("/");
    // set(true);
    // console.log("inside add fn");
    setIsEditModalOpen(false);
    // getTasks();
  };

  // console.log({ heading });
  const onDelClicked = async id => {
    const response = await axios.delete(`http://localhost:4000/task/${id}`);
  };
  const onEditClicked = async id => {
    const response = await axios.get(`http://localhost:4000/task/${id}`);

    // const res = await axios.get(`http://localhost:4000/task/${id}`);
    // setEditTask(response.data);

    console.log(response.data);

    // showEditModal(true);

    const res = await axios.get(
      `http://localhost:4000/projects/${response.data.project}`
    );
    console.log(res.data.name);
    setP(res.data.name);
    // console.log(add);
    setEditTask(response.data);
    console.log(editTask);

    modalOpen(true);
  };

  return (
    <>
      <div
        className="task_card"
        draggable
        onDragStart={() => setActiveCard(index)}
        onDragEnd={() => setActiveCard(null)}
      >
        <h4> {title}</h4>

        <p>{description}</p>
        <p>Status :{status}</p>
        <p>
          Deadline :{deadline.split("T")[0]}
          {/* {new Date(parseInt({ deadline })).toISOString().split("T")[0]} */}
        </p>
        <div className="buttons">
          {show_button && (
            <Button
              onClick={() => {
                onEditClicked(id);
              }}
            >
              Edit
            </Button>
          )}
          {show_button && (
            <Button
              onClick={() => {
                onDelClicked(id);
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      <Modal
        title="Edit the Task Details"
        open={isEditModalOpen}
        onCancel={handleCancel}
        onok={handleOk}
        onADD={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        // cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
        // initialValues={{
        //   title: editTask.title,
        //   description: editTask.description,
        //   project: editTask.project,
        //   status: editTask.status,
        //   deadline: editTask.deadline,
        // }}
        >
          <Form.Item label="Title">
            <Input
              defaultValue={editTask.title}
              value={editTask.title}
              onChange={e => onChange(e.target.value, "title")}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              showCount
              maxLength={100}
              defaultValue={editTask.description}
              onChange={e => onChange(e.target.value, "description")}
            />
          </Form.Item>
          <Form.Item label="Project">
            <Select
              value={p}
              defaultValue={p}
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
            <Select
              onChange={onChangeSelect}
              defaultValue={editTask.status}
              value={editTask.status}
            >
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Due Date">
            {/* // defaultValue={editTask.deadline} */}
            <DatePicker onChange={onChangeDate} format="YYYY-MM-DD" />
          </Form.Item>

          {/* <DatePicker
            onChange={onChangeDate}
            defaultValue={defaultDate}
            format="YYYY-MM-DD"
          /> */}

          <Form.Item>
            <Button
              onClick={() => {
                onBtnClick(id);
              }}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TaskCard;
