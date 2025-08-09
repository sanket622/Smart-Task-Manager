import React, { useState } from 'react';

function TaskForm({ users, tasks, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignedTo: '',
    dependencies: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.assignedTo) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        assignedTo: '',
        dependencies: []
      });
    }
  };

  const handleDependencyChange = (taskId, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        dependencies: [...formData.dependencies, taskId]
      });
    } else {
      setFormData({
        ...formData,
        dependencies: formData.dependencies.filter(id => id !== taskId)
      });
    }
  };

  return (
    <div className="form">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assign to:</label>
          <select
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            required
          >
            <option value="">Select user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Dependencies:</label>
          <div>
            {tasks.map(task => (
              <div key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.dependencies.includes(task.id)}
                    onChange={(e) => handleDependencyChange(task.id, e.target.checked)}
                  />
                  {task.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Create Task</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;