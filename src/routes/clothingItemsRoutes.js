const express = require('express');
const multer = require('multer');
const path = require('path');
const ClothingItem = require('../models/ClothingItem');
const { getClothingIventory, patchClothingById, deleteClothingById } = require('../controllers/clothingController');

const router = express.Router();

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
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }

        if (!req.body.donorId) {
            return res.status(400).json({ message: 'donorId is required.' });
        }

        const imageUrls = req.files.map(file => file.path);
        const clothingItem = new ClothingItem({
            ...req.body,
            imageUrls
        });

        await clothingItem.save();
        res.status(201).json(clothingItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

router.get('/clothing-items', async (req, res) => {
    try {
        const clothingItems = await ClothingItem.find();
        res.status(200).json(clothingItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/clothing-items/:id', async (req, res) => {
    try {
        const clothingItem = await ClothingItem.findById(req.params.id);
        if (clothingItem) {
            res.status(200).json(clothingItem);
        } else {
            res.status(404).json({ message: 'Clothing item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/clothing-items/:id', async (req, res) => {
    try {
        const clothingItem = await ClothingItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (clothingItem) {
            res.status(200).json(clothingItem);
        } else {
            res.status(404).json({ message: 'Clothing item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/clothing-items/:id', async (req, res) => {
    try {
        const clothingItem = await ClothingItem.findByIdAndDelete(req.params.id);
        if (clothingItem) {
            res.status(200).json({ message: 'Clothing item deleted' });
        } else {
            res.status(404).json({ message: 'Clothing item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/inventory', getClothingIventory);
router.patch('/clothing-items/:id', patchClothingById);
router.delete('/clothing-items/:id', deleteClothingById);


module.exports = router;
