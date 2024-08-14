const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./connect/database');

const port = process.env.PORT || 3033;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clothing', require('./routes/clothingRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/uploads', express.static('uploads'));

app.use((req, res, next) => {
    res.status(404).send('Rota não encontrada');
});

app.listen(port, () => console.log(`Aplicação rodando em http://localhost:${port}`));
