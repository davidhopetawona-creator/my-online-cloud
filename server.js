const express = require('express');
const path = require('path');
const fileRouter = require('./controllers/files');

const app = express();
const PORT = 3000;

// Allow the server to read JSON data
app.use(express.json());

// Serve your website HTML/CSS files directly from the main folder
app.use(express.static(path.join(__dirname)));

// Link your file upload/download API routes
app.use('/api', fileRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Cloud server running at http://localhost:${PORT}`);
});