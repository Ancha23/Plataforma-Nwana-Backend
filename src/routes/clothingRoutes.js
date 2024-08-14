const express = require('express');
const { donateClothing, getClothingItems } = require('../controllers/clothingController');
const upload = require('../config/uploadConfig');
const router = express.Router();

router.post('/donate', upload.single('image'), donateClothing);

router.get('/', getClothingItems);

module.exports = router;
