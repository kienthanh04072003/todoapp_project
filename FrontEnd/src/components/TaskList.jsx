import React from 'react'
import TasksEmpty from './TasksEmpty';
import TaskCard from './TaskCard';

const TaskList = ({ filteredTasks, handleTaskChanged }) => {

  let filter = 'all';


  if (!filteredTasks || filteredTasks.length === 0) {
    return <TasksEmpty filter={filter} />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={task.id ?? index}
          task={task}
          index={index}
          handleTaskChanged={handleTaskChanged}
        />
      ))}
    </div>
  )
}

export default TaskList