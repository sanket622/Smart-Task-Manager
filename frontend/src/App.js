import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('all');
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      let url = 'http://localhost:8080/api/tasks';
      if (view === 'my') url = 'http://localhost:8080/api/tasks/my';
      if (view === 'blocked') url = 'http://localhost:8080/api/tasks/blocked';
      
      const response = await axios.get(url);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [view]);

  const handleLogin = async (email) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', { email });
      setCurrentUser(response.data);
    } catch (error) {
      alert('User not found');
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await axios.post('http://localhost:8080/api/users', userData);
      fetchUsers();
      setShowUserForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await axios.post('http://localhost:8080/api/tasks', taskData);
      fetchTasks();
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${taskId}`, updates);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.error || 'Error updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Smart Task Manager</h1>
        {currentUser ? (
          <div>
            <p>Welcome, {currentUser.name}!</p>
            <div className="nav">
              <button className="btn btn-primary" onClick={() => setShowTaskForm(true)}>
                Create Task
              </button>
              <button className="btn btn-secondary" onClick={() => setShowUserForm(true)}>
                Create User
              </button>
              <button className="btn btn-secondary" onClick={() => setCurrentUser(null)}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <select onChange={(e) => e.target.value && handleLogin(e.target.value)}>
                <option value="">Select user to login</option>
                {users.map(user => (
                  <option key={user.id} value={user.email}>{user.name} ({user.email})</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" onClick={() => setShowUserForm(true)}>
              Create New User
            </button>
          </div>
        )}
      </div>

      {showUserForm && (
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowUserForm(false)}
        />
      )}

      {showTaskForm && currentUser && (
        <TaskForm
          users={users}
          tasks={tasks}
          onSubmit={handleCreateTask}
          onCancel={() => setShowTaskForm(false)}
        />
      )}

      {currentUser && (
        <>
          <div className="nav">
            <button 
              className={`btn ${view === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setView('all')}
            >
              All Tasks
            </button>
            <button 
              className={`btn ${view === 'my' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setView('my')}
            >
              My Tasks
            </button>
            <button 
              className={`btn ${view === 'blocked' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setView('blocked')}
            >
              Blocked Tasks
            </button>
          </div>

          <TaskList
            tasks={tasks}
            users={users}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </>
      )}
    </div>
  );
}

export default App;