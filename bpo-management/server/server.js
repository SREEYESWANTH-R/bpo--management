// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const { error } = require('console');

// Create Express app
const app = express();
const PORT = process.env.PORT || 8081; // Change port to 8081

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bpo'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Assuming index.html is your homepage
});

// Authentication route admin
app.get('/admin', (req, res) => {
  const { username, password } = req.query;

  const query = `SELECT * FROM admin WHERE username = ? AND password = ?`;
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Authentication successful', user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  });
});

// Authentication route user
app.get('/authenticate', (req, res) => {
  const { username, password } = req.query;

  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Authentication successful', user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  });
});

// Route to fetch all users from the database
app.get('/users', (req, res) => {
  const query = `SELECT * FROM users`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    res.json(results);
  });
});

app.post('/addworker',(req,res)=>{
  const {name, role, password, pendingWork,completedWork} = req.body;
  const query = `INSERT INTO users (username,password,role,pending_work,completed_work) VALUES (?, ?, ?,?,?)`
  connection.query(query, [name,password,role,pendingWork,completedWork],(error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    res.json({ success: true, message: 'Worker added successfully' });
  });
});

app.post('/addtask',(req,res)=>{
  const {name, work, description, dueDate} = req.body;
  const query = 'INSERT INTO task (name, work, description, due_date) VALUES (?, ?, ?, ?)'
  connection.query(query, [name,work,description,dueDate],(error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    res.json({ success: true, message: 'task added successfully' });
  });
})

app.get('/tasks',(req,res)=>{
  const query = "SELECT * from task WHERE name = 'John_Doe'"
  connection.query(query,(error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    res.json(results);
  });
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
