// create web server
const express = require('express');
const app = express();
const port = 3000;

// import comments data
const comments = require('./comments.json');

// create endpoint
app.get('/comments', (req, res) => {
    res.json(comments);
});

// start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});