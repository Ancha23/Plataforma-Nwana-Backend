const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
    try {
        const { itemId } = req.body;
        const newRequest = new Request({ itemId, requesterId: req.user.id });
        await newRequest.save();
        res.status(201).json({ message: 'Requisição criada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar requisição' });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find({ requesterId: req.user.id });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar requisições' });
    }
};
