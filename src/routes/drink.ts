const express = require('express');
const router = express.Router();

const drinkCtrl = require('../controllers/drink');

router.post('/', drinkCtrl.createDrink);
router.put('/:id', drinkCtrl.modifyDrink);
router.delete('/:id', drinkCtrl.deleteDrink);
router.get('/', drinkCtrl.getAllDrink);
router.get('/:id', drinkCtrl.getOneDrink);

module.exports = router;