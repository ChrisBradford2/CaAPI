import mongoose from 'mongoose';

/**
 * ConsumptionDrinks model
 * 
 * @typedef {Object} ConsumptionDrinks
 * 
 * @property {Number} quantity.required - Quantity of the drink
 * @property {Drink} drink.required - Drink of the consumption
 * @property {Consumption} consumption.required - Consumption of the drink
 * 
 */

const consumptionDrinksSchema = new mongoose.Schema({
	quantity: { type: Number, required: true, default: 1 },
	drink: { type: mongoose.Schema.Types.ObjectId, ref: 'Drink', required: true },
});

module.exports = mongoose.model('ConsumptionDrinks', consumptionDrinksSchema);
