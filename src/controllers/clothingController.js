const ClothingItem = require('../models/ClothingItem');

exports.donateClothing = async (req, res) => {
    try {
        const { itemName, description, size, condition, imageUrl, status, donorId, createdAt } = req.body;

        const newClothingItem = new ClothingItem({
            itemName,
            description,
            size,
            condition,
            imageUrl,
            status: status || 'Pending',
            donorId,
            createdAt: createdAt || new Date()
        });

        await newClothingItem.save();

        res.status(201).json({ message: 'Roupa doada com sucesso!', clothingItem: newClothingItem });
    } catch (error) {

        res.status(500).json({ message: 'Erro ao doar roupa', error: error.message });
    }
};

exports.getClothingItems = async (req, res) => {
    try {
        const clothingItems = await ClothingItem.find({ status: 'Approved' });

        res.status(200).json(clothingItems);
    } catch (error) {

        res.status(500).json({ message: 'Erro ao buscar roupas', error: error.message });
    }
};

exports.getClothingItemsByDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId; 
        if (!donorId) {
            return res.status(400).json({ message: 'donorId é obrigatório.' });
        }

        const clothingItems = await ClothingItem.find({ donorId })
            .select('itemName description status') 
            .exec();

        res.status(200).json(clothingItems);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar roupas', error: error.message });
    }
};



