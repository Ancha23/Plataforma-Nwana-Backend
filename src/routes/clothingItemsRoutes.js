const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');
const User = require('../models/User');

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

module.exports = router;
