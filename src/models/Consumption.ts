import mongoose from 'mongoose';

/**
 * Consumption model
 * @typedef {Object} Consumption
 * 
 * @property {Date} date.required - Date of the consumption
 * @property {Array.<ConsumptionDrinks>} consumptionDrinks.required - Drinks of the consumption
 * @property {User} user.required - User of the consumption
 */
const consumptionSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	consumptionDrinks: [
		{
			quantity: { type: Number, required: true, default: 1 },
			drink: { type: mongoose.Schema.Types.ObjectId, ref: 'Drink', required: true },
		}
	],
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Consumption', consumptionSchema);
