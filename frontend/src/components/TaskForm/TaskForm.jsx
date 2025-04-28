import "./TaskForm.css";
import { useState, useEffect } from "react";
import { Button, message, Modal } from "antd";
import { DatePicker, Form, Input, Select, Space } from "antd";
import TaskColumn from "../TaskColumn/TaskColumn";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import locale from "antd/es/date-picker/locale/en_US";
import TaskCard from "../TaskCard/TaskCard";

const TaskForm = ({ setSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Edit, setEdit] = useState(false);

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
    setAdd({ ...add, deadline: dateString });
  };
  const onChangeSelect = value => {
    setAdd({ ...add, status: value });
  };
  const onBtnClick = async () => {
    console.log(add);

    const response = await axios.post("http://localhost:4000/task", add);

    setIsModalOpen(false);
    // getTasks();
  };
  const handleChange = async e => {
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

        <Select
          style={{ width: 200 }}
          placeholder="Tasks with status"
          defaultValue={"Tasks with status"}
          onChange={e => {
            handleChange(e);
          }}
        >
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
            </Select>
          </Form.Item>

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
          <TaskColumn title={show} tasks={data} status={show} show_button="" />
        )}
      </div>
    </>
  );
};
export default TaskForm;
