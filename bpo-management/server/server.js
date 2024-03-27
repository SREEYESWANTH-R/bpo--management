// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

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

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'components', 'Homepage.js'));
});

// Authentication route
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

// Route to fetch the username from the database
app.get('/getUsername/:userId', (req, res) => {
  const userId = req.params.userId;

  // Query to fetch the username based on the user ID
  const query = `SELECT username FROM users WHERE id = ?`;

  // Execute the query
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      const username = results[0].username;
      res.json({ success: true, username: username });
    } else {
      // If no user found with the given ID
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
