const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Define where uploaded files will save on your machine
const uploadDirectory = path.join(__dirname, '../uploads');

// Create the uploads folder automatically if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure how files are saved and named
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        // Adds a unique timestamp to the front of the filename to prevent overwriting
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// 1. UPLOAD ENDPOINT: Handles uploading a single file
router.post('/upload', upload.single('cloudFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file selected for upload.' });
    }
    res.json({ 
        message: 'File uploaded successfully!', 
        fileName: req.file.filename 
    });
});

// 2. DOWNLOAD ENDPOINT: Downloads a file by its name
router.get('/download/:filename', (req, res) => {
    const filePath = path.join(uploadDirectory, req.params.filename);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found.' });
    }
    
    res.download(filePath);
});
// 3. DATABASE GET ENDPOINT: Sends database info to any visitor device
router.get('/content', (req, res) => {
    const dbPath = path.join(__dirname, '../database.json');
    const rawData = fs.readFileSync(dbPath);
    res.json(JSON.parse(rawData));
});

// 4. DATABASE POST ENDPOINT: Allows the admin to save modified edits
router.post('/content/update', (req, res) => {
    const dbPath = path.join(__dirname, '../database.json');
    
    // Structure the updated text content
    const updatedData = [
        {
            id: 1,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl || ""
        }
    ];

    // Commit changes to the JSON file
    fs.writeFileSync(dbPath, JSON.stringify(updatedData, null, 2));
    res.json({ message: "Content updated successfully across all devices!" });
});

module.exports = router;