const express = require('express');
const router = express.Router();
import limiter from "../utils/ratelimit";

const auth = require('../middleware/auth');
const consumptionCtrl = require('../controllers/consumption');

router.post('/', consumptionCtrl.createConsumption);
router.put('/:id', consumptionCtrl.modifyConsumption);
router.delete('/:id', consumptionCtrl.deleteConsumption);
router.get('/', consumptionCtrl.getAllConsumption);
router.get('/:id', consumptionCtrl.getOneConsumption);

module.exports = router;
