const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// In-memory storage
const users = new Map();
const tasks = new Map();
let currentUser = null;

// User routes
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const id = uuidv4();
  const user = { id, name, email };
  users.set(id, user);
  res.json(user);
});

app.post('/api/login', (req, res) => {
  const { email } = req.body;
  const user = Array.from(users.values()).find(u => u.email === email);
  if (user) {
    currentUser = user;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.get('/api/users', (req, res) => {
  res.json(Array.from(users.values()));
});

// Task routes
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, assignedTo, dependencies = [] } = req.body;
  const id = uuidv4();
  const task = {
    id,
    title,
    description,
    priority,
    status: 'To Do',
    assignedTo,
    dependencies,
    createdBy: currentUser?.id,
    createdAt: new Date()
  };
  tasks.set(id, task);
  res.json(task);
});

app.get('/api/tasks', (req, res) => {
  res.json(Array.from(tasks.values()));
});

app.get('/api/tasks/my', (req, res) => {
  if (!currentUser) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const myTasks = Array.from(tasks.values()).filter(task => task.assignedTo === currentUser.id);
  res.json(myTasks);
});

app.get('/api/tasks/blocked', (req, res) => {
  const blockedTasks = Array.from(tasks.values()).filter(task => {
    if (task.status === 'Done') return false;
    return task.dependencies.some(depId => {
      const depTask = tasks.get(depId);
      return !depTask || depTask.status !== 'Done';
    });
  });
  res.json(blockedTasks);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.get(id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const updates = req.body;
  
  // Check if trying to mark as done with incomplete dependencies
  if (updates.status === 'Done') {
    const hasIncompleteDeps = task.dependencies.some(depId => {
      const depTask = tasks.get(depId);
      return !depTask || depTask.status !== 'Done';
    });
    if (hasIncompleteDeps) {
      return res.status(400).json({ error: 'Cannot complete task with incomplete dependencies' });
    }
  }
  
  const updatedTask = { ...task, ...updates };
  tasks.set(id, updatedTask);
  res.json(updatedTask);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  if (tasks.delete(id)) {
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});