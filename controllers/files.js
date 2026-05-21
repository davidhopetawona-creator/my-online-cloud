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
// 3. CMS GET ENDPOINT: Sends CMS to any visitor/admin device
router.get('/cms', (req, res) => {
    const dbPath = path.join(__dirname, '../database.json');
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(rawData);
    res.json(db.siteCms || db);
});

// 4. CMS POST ENDPOINT: Allows admin to save modified edits (partial updates)
router.post('/cms/update', (req, res) => {
    const dbPath = path.join(__dirname, '../database.json');
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(rawData);

    const patch = req.body;
    if (!patch || typeof patch !== 'object') {
        return res.status(400).json({ error: 'Invalid payload' });
    }

    // Replace siteCms with merged version (shallow merge; nested merge is handled by client shape)
    db.siteCms = Object.assign({}, db.siteCms || {}, patch.siteCms ? patch.siteCms : patch);

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json({ message: 'CMS updated successfully across all devices!' });
});


module.exports = router;