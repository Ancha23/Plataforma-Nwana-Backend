const express = require('express');
const router = express.Router();
const multer = require('multer');
const ClothingItem = require('./models/ClothingItem'); // Adjust path as needed

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/clothing-items', upload.array('images', 6), async (req, res) => {
    try {
        const imageUrls = req.files.map(file => file.path);
        const clothingItem = new ClothingItem({
            ...req.body,
            imageUrls
        });
        await clothingItem.save();
        res.status(201).json(clothingItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
