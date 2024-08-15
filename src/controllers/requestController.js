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
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar requisições' });
    }
};
exports.updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Requisição não encontrada' });
        }

        res.status(200).json({ message: 'Status atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar status' });
    }
};

exports.patchRequestById = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!request) return res.status(404).json({ message: 'Pedido não encontrado' });


        if (status === "Aprovado") {
            await ClothingItem.findByIdAndDelete(request.itemId);
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar status do pedido' });
    }
};