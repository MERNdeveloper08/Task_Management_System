import React from "react";
import TaskCard from "../TaskCard/TaskCard";

const TaskShow = (title, tasks, status) => {
  return (
    <div>
      {console.log(tasks)}
      {/* {tasks.map(
        (task, index) =>
          task.status == status && (
            <TaskCard
              index={index}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              //   id={task._id}
              status={task.status}
              // setActiveCard={setActiveCard}
            />
          )
      )} */}
    </div>
  );
};

export default TaskShow;
