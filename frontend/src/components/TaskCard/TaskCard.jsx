import axios from "axios";
import { DatePicker, Form, Input, Select, Button, Modal } from "antd";
import dayjs from "dayjs";

import { useState, useEffect } from "react";

import "./TaskCard.css";
import TaskForm from "../TaskForm/TaskForm";
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

  const [project, setProject] = useState([]);
  const [p, setP] = useState();

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
  };
  const onBtnClick = async id => {
    console.log(editTask);

    const response = await axios.patch(
      `http://localhost:4000/task/${id}`,
      editTask
    );

    setIsEditModalOpen(false);
    location.reload();
  };

  const onDelClicked = async id => {
    const response = await axios.delete(`http://localhost:4000/task/${id}`);
    location.reload();
  };
  const onEditClicked = async id => {
    const response = await axios.get(`http://localhost:4000/task/${id}`);

    console.log(response.data);

    const res = await axios.get(
      `http://localhost:4000/projects/${response.data.project}`
    );
    console.log(res.data.name);
    setP(res.data.name);
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
        <p>Deadline :{deadline.split("T")[0]}</p>
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
      >
        <Form>
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
            </Select>
          </Form.Item>

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
