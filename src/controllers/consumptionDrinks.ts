const ConsumptionDrinks = require('../models/ConsumptionDrinks');
import date from '../utils/utils';

exports.createConsumptionDrinks = (req: any, res: any, next: any) => {
  const consumptionDrinks = new ConsumptionDrinks({
    drink: req.body.drink,
    consumption: req.body.consumption,
    quantity: req.body.quantity,
  });
  consumptionDrinks.save().then(
    () => {
      console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/consumption_drinks | \x1b[32m201\x1b[0m');
      res.status(201).json({
        consumptionDrinks: consumptionDrinks,
      })
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/consumption_drinks | \x1b[31m400\x1b[0m');
      res.status(400).json({
        error: error
      })
    }
  );
}

exports.modifyConsumptionDrinks = (req: any, res: any, next: any) => {
  const consumptionDrinks = new ConsumptionDrinks({
    _id: req.params.id,
    drink: req.body.drink,
    consumption: req.body.consumption,
    quantity: req.body.quantity,
  });
  ConsumptionDrinks.updateOne({_id: req.params.id}, consumptionDrinks).then(
    () => {
      console.log('[\x1b[34mPUT\x1b[0m] ' + date + ' - /api/consumption_drinks/' + req.params.id + ' | \x1b[32m201\x1b[0m');
      res.status(201).json({
        consumptionDrinks: consumptionDrinks,
      })
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[34mPUT\x1b[0m] ' + date + ' - /api/consumption_drinks/' + req.params.id + ' | \x1b[31m400\x1b[0m');
      res.status(400).json({
        error: error
      })
    }
  );
}

exports.deleteConsumptionDrinks = (req: any, res: any, next: any) => {
  ConsumptionDrinks.deleteOne({_id: req.params.id}).then(
    () => {
      console.log('[\x1b[31mDELETE\x1b[0m] ' + date + ' - /api/consumption_drinks/' + req.params.id + ' | \x1b[32m200\x1b[0m');
      res.status(200).json({
        message: 'Deleted!'
      })
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[31mDELETE\x1b[0m] ' + date + ' - /api/consumption_drinks/' + req.params.id + ' | \x1b[31m400\x1b[0m');
      res.status(400).json({
        error: error
      })
    }
  );
}

exports.getAllConsumptionDrinks = (req: any, res: any, next: any) => {
  ConsumptionDrinks.find().then(
    (consumptionDrinks: any) => {
      console.log('[\x1b[36mGET\x1b[0m] ' + date + ' - /api/consumption_drinks | \x1b[32m200\x1b[0m');
      res.status(200).json(consumptionDrinks)
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[36mGET\x1b[0m] ' + date + ' - /api/consumption_drinks | \x1b[31m400\x1b[0m');
      res.status(400).json({
        error: error
      })
    }
  );
}

exports.getOneConsumptionDrinks = (req: any, res: any, next: any) => {
  ConsumptionDrinks.findOne({_id: req.params.id}).then(
    (consumptionDrinks: any) => {
      console.log('[\x1b[36mGET\x1b[0m] ' + date + ' - /api/consumption_drinks/' + req.params.id + ' | \x1b[32m200\x1b[0m');
      res.status(200).json(consumptionDrinks)
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[36mGET\x1b[0m] ' + date + ' - /api/consumption_drinks/' + req.params.id + ' | \x1b[31m404\x1b[0m');
      res.status(404).json({
        error: error
      })
    }
  );
}
