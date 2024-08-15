const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const connectDB = require('./connect/database');

const port = process.env.PORT || 3033;

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/clothing', require('./routes/clothingItemsRoutes'));

app.use((req, res, next) => {
    res.status(404).send('Rota não encontrada');
});

app.listen(port, () => console.log(`Aplicação rodando em http://localhost:${port}`));
