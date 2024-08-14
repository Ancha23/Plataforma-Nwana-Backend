const mongoose = require('mongoose');
const connectDB = require('./connect/database');
const User = require('./models/User');
const ClothingItem = require('./models/ClothingItem');
const Request = require('./models/Request');

require('dotenv').config();

const uri = process.env.MONGO_URL || 'mongodb://localhost:27017/api';

connectDB();

const seedData = async () => {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000,
        });

        await User.deleteMany({});
        await ClothingItem.deleteMany({});
        await Request.deleteMany({});

        const users = await User.insertMany([
            {
                username: "johndoe",
                email: "johndoe@example.com",
                password: "password123",
                role: "Donor",
                createdAt: new Date()
            },
            {
                username: "janedoe",
                email: "janedoe@example.com",
                password: "password123",
                role: "Requester",
                createdAt: new Date()
            }
        ]);

        const donorId = users.find(user => user.username === "johndoe")._id;
        const requesterId = users.find(user => user.username === "janedoe")._id;

        const clothingItems = await ClothingItem.insertMany([
            {
                itemName: "Camiseta",
                description: "Camiseta nova, tamanho M",
                size: "M",
                condition: "New",
                status: "Pending",
                donorId: donorId,
                approvedBy: null,
                imageUrl: "http://example.com/image.jpg",
                createdAt: new Date()
            }
        ]);

        const itemId = clothingItems[0]._id;

        await Request.insertMany([
            {
                itemId: itemId,
                requesterId: requesterId,
                status: "Pending",
                createdAt: new Date()
            }
        ]);

        console.log('Dados de teste inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados de teste:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
