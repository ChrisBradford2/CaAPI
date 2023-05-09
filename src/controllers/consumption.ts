const Consumption = require('../models/Consumption');
import date from '../utils/utils';

exports.createConsumption = (req: any, res: any, next: any) => {
	const consumption = new Consumption({
		date: req.body.date,
		consumptionDrinks: req.body.consumptionDrinks,
		user: req.body.user
	});
	consumption.save().then(
		() => {
			console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/consumption | \x1b[32m201\x1b[0m');
			res.status(201).json({
				consumption: consumption,
			})
		}
	).catch(
		(error: Error) => {
			console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/consumption | \x1b[31m400\x1b[0m');
			res.status(400).json({
				error: error
			})
		}
	);
};

exports.modifyConsumption = (req: any, res: any, next: any) => {
	const consumption = new Consumption({
		_id: req.params.id,
		date: req.body.date,
		consumptionDrinks: req.body.consumptionDrinks,
		user: req.body.user
	});
	Consumption.updateOne({_id: req.params.id}, consumption).then(
		() => {
			console.log('[\x1b[34mPUT\x1b[0m] ' + date + ' - /api/consumption/' + req.params.id + ' | \x1b[32m201\x1b[0m');
			res.status(201).json({
				consumption: consumption,
			})
		}
	).catch(
		(error: Error) => {
			console.log('[\x1b[34mPUT\x1b[0m] ' + date + ' - /api/consumption/' + req.params.id + ' | \x1b[31m400\x1b[0m');
			res.status(400).json({
				error: error
			})
		}
	);
};

exports.deleteConsumption = (req: any, res: any, next: any) => {
	Consumption.deleteOne({_id: req.params.id}).then(
		() => {
			console.log('[\x1b[31mDELETE\x1b[0m] ' + date + ' - /api/consumption/' + req.params.id + ' | \x1b[32m200\x1b[0m');
			res.status(200).json({
				message: 'Deleted!'
			})
		}
	).catch(
		(error: Error) => {
			console.log('[\x1b[31mDELETE\x1b[0m] ' + date + ' - /api/consumption/' + req.params.id + ' | \x1b[31m400\x1b[0m');
			res.status(400).json({
				error: error
			})
		}
	);
}

exports.getOneConsumption = (req: any, res: any, next: any) => {
	Consumption.findOne({_id: req.params.id}).then(
		(consumption: any) => {
			console.log('[\x1b[36mGET\x1b[0m] ' + date + ' - /api/consumption/' + req.params.id + ' | \x1b[32m200\x1b[0m');
			res.status(200).json(consumption);
		}
	).catch(
		(error: Error) => {
			console.log('[\x1b[36mGET\x1b[0m] ' + date + ' - /api/consumption/' + req.params.id + ' | \x1b[31m404\x1b[0m');
			res.status(404).json({
				error: error
			})
		}
	);
}

exports.getAllConsumption = (req: any, res: any, next: any) => {
	Consumption.find().then(
		(consumptions: any) => {
			console.log('[\x1b[36mGET\x1b[0m] ' + date + ' - /api/consumption | \x1b[32m200\x1b[0m');
			res.status(200).json(consumptions);
		}
	).catch(
		(error: Error) => {
			console.log('[\x1b[36mGET\x1b[0m] ' + date + ' - /api/consumption | \x1b[31m400\x1b[0m');
			res.status(400).json({
				error: error
			})
		}
	);
}
