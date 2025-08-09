import React, { useState } from 'react';

function TaskList({ tasks, users, onUpdateTask, onDeleteTask }) {
  const [filter, setFilter] = useState({ priority: '', status: '' });

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  const filteredTasks = tasks.filter(task => {
    if (filter.priority && task.priority !== filter.priority) return false;
    if (filter.status && task.status !== filter.status) return false;
    return true;
  });

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateTask(taskId, { status: newStatus });
  };

  return (
    <div>
      <div className="filter-bar">
        <div className="filter-group">
          <label>Filter by Priority:</label>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          
          <label>Filter by Status:</label>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="task-item">No tasks found</div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-header">
                <div className="task-title">{task.title}</div>
                <div>
                  <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  <span className={`status status-${task.status.toLowerCase().replace(' ', '')}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              
              <p>{task.description}</p>
              <p><strong>Assigned to:</strong> {getUserName(task.assignedTo)}</p>
              
              {task.dependencies.length > 0 && (
                <p><strong>Dependencies:</strong> {task.dependencies.length} task(s)</p>
              )}
              
              <div style={{ marginTop: '10px' }}>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                
                <button
                  className="btn btn-danger"
                  onClick={() => onDeleteTask(task.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;