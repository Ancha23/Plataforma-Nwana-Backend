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
            status: status || 'Pendente',
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

exports.getClothingIventory = async (req, res) => {
    try {
        const inventory = await ClothingItem.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o inventário' });
    }
};

exports.patchClothingById = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedItem = await ClothingItem.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item não encontrado' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar status do item' });
    }
};

exports.deleteClothingById = async (req, res) => {
    try {
        const deletedItem = await ClothingItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item não encontrado' });
        res.status(200).json({ message: 'Item excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o item' });
    }
};

exports.getAppovedItens = async (req, res) => {
    try {
        const approvedItems = await ClothingItem.find({ status: 'Aprovado' });
        res.json(approvedItems);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as doações aprovadas.' });
    }
};
