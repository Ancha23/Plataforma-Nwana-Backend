const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String },
    size: { type: String, required: true },
    condition: { type: String, enum: ['New', 'Used'], required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClothingItem', clothingItemSchema);
