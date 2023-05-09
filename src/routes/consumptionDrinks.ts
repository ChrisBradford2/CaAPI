const express: any = require('express');
const router: any = express.Router();
import limiter from "../utils/ratelimit";

const consumptionDrinksCtrl = require('../controllers/consumptionDrinks');

router.post('/', consumptionDrinksCtrl.createConsumptionDrinks);
router.put('/:id', consumptionDrinksCtrl.modifyConsumptionDrinks);
router.delete('/:id', consumptionDrinksCtrl.deleteConsumptionDrinks);
router.get('/', consumptionDrinksCtrl.getAllConsumptionDrinks);
router.get('/:id', consumptionDrinksCtrl.getOneConsumptionDrinks);

module.exports = router;
