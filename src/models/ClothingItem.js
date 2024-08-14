const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ['Novo', 'Usado'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pendente', 'Aprovado', 'Rejeitado'],
        default: 'Pendente'
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    imageUrls: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ClothingItem', clothingItemSchema);
