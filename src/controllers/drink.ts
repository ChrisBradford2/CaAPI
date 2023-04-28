const Drink = require('../models/drink');
const date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

exports.createDrink = (req: any, res: any, next: any) => {
  const drink = new Drink({
    name: req.body.name,
    caffein_level: req.body.caffein_level,
    volume: req.body.volume
  });
  drink.save().then(
    () => {
      res.status(201).json({
        message: 'Drink saved successfully!'
      }) && console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/drink | \x1b[32m201\x1b[0m')
    }
  ).catch(
    (error: Error) => {
      res.status(400).json({
        error: error
      }) && console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/drink | \x1b[31m400\x1b[0m')
    }
  );
}

exports.modifyDrink = (req: any, res: any, next: any) => {
  const drink = new Drink({
    _id: req.params.id,
    name: req.body.name,
    caffein_level: req.body.caffein_level,
    volume: req.body.volume
  });
  Drink.updateOne({_id: req.params.id}, drink).then(
    () => {
      res.status(201).json({
        message: 'Drink updated successfully!'
      }) && console.log('[\x1b[34mPUT\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m201\x1b[0m')
    }
  ).catch(
    (error: Error) => {
      res.status(400).json({
        error: error
      }) && console.log('[\x1b[34mPUT\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m400\x1b[0m')
    }
  );
}

exports.deleteDrink = (req: any, res: any, next: any) => {
  Drink.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Drink deleted successfully!'
      }) && console.log('[\x1b[35mDELETE\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m200\x1b[0m')
    }
  ).catch(
    (error: Error) => {
      res.status(400).json({
        error: error
      }) && console.log('[\x1b[35mDELETE\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m400\x1b[0m')
    }
  );
}

exports.getOneDrink = (req: any, res: any, next: any) => {
  Drink.findOne({_id: req.params.id}).then(
    (drink: any) => {
      res.status(200).json(drink) && console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m200\x1b[0m')
    }
  ).catch(
    (error: Error) => {
      res.status(404).json({
        error: error
      }) && console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m404\x1b[0m')
    }
  );
}

exports.getAllDrink = (req: any, res: any, next: any) => {
  Drink.find().then(
    (drinks: any) => {
      res.status(200).json(drinks) && console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink | \x1b[32m200\x1b[0m')
    }
  ).catch(
    (error: Error) => {
      res.status(400).json({
        error: error
      }) && console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink | \x1b[31m400\x1b[0m')
    }
  );
}
