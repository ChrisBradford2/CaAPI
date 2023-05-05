import mongoose from 'mongoose';

/**
 * Drink model
 *
 * @typedef {Object} Drink
 *
 * @property {String} name.required - Name of the drink
 * @property {Number} caffein_level.required - Caffein level of the drink
 * @property {Number} volume.required - Volume of the drink
 */

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  caffein_level: { type: Number, required: true },
  volume: { type: Number, required: false },
});

module.exports = mongoose.model('Drink', drinkSchema);
