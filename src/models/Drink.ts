import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  caffein_level: { type: Number, required: true },
  volume: { type: Number, required: false },
});

module.exports = mongoose.model('Drink', drinkSchema);
