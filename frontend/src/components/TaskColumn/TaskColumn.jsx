import DropArea from "../DropArea/DropArea";
import TaskCard from "../TaskCard/TaskCard";
import React from "react";
import "./TaskColumn.css";
const TaskColumn = ({
  title,
  tasks,
  status,
  setActiveCard,
  onDrop,
  show_button,
}) => {
  return (
    <section className="task_column">
      <h2 className="task_column_heading">{title}</h2>
      <DropArea onDrop={() => onDrop(status, 0)} />

      {tasks.map(
        (task, index) =>
          task.status == status && (
            <React.Fragment key={index}>
              <TaskCard
                index={index}
                title={task.title}
                description={task.description}
                deadline={task.deadline}
                id={task._id}
                status={task.status}
                setActiveCard={setActiveCard}
                show_button={show_button}
              />

              <DropArea onDrop={() => onDrop(status, index + 1)} />
            </React.Fragment>
          )
      )}
    </section>
  );
};
export default TaskColumn;
