const ClothingItem = require('../models/ClothingItem');

exports.approveDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await ClothingItem.findByIdAndUpdate(id, { status: 'Approved', approvedBy: req.user.id }, { new: true });
        res.status(200).json({ message: 'Doação aprovada!', item: updatedItem });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao aprovar doação' });
    }
};

exports.getPendingDonations = async (req, res) => {
    try {
        const pendingDonations = await ClothingItem.find({ status: 'Pending' });
        res.status(200).json(pendingDonations);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar doações pendentes' });
    }
};
