const express = require('express');
const { createRequest, getRequests, updateRequestStatus, patchRequestById } = require('../controllers/requestController');
const router = express.Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.patch('/:id', updateRequestStatus);
router.patch('/:id', patchRequestById);

module.exports = router;
