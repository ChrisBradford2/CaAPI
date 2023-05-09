const Drink = require('../models/drink');
const date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

exports.createDrink = (req: any, res: any, next: any) => {
  const drink = new Drink({
    name: req.body.name,
    caffein_level: req.body.caffein_level,
    volume: req.body.volume
  });
  switch (true) {
    case (drink.name == null && drink.caffein_level == null):
      res.status(400).json({
        message: 'Name and caffein level are required'
      })
      break;
    case (drink.name == null):
      res.status(400).json({
        message: 'Name is required'
      })
      break;
    case (drink.caffein_level == null):
      res.status(400).json({
        message: 'Caffein level is required'
      })
      break;
    case (drink.volume == null):
      res.status(400).json({
        message: 'Volume is required'
      })
      break;
    default:
  }
  drink.save().then(
    () => {
      console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/drink | \x1b[32m201\x1b[0m')
      return res.status(201).json({
        drink: drink,
      })
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/drink | \x1b[31m400\x1b[0m')
      return res.status(400).json({
        error: error
      })
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
      console.log('[\x1b[34mPUT\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m201\x1b[0m')
      res.status(201).json({
        drink: drink,
      })
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[34mPUT\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m400\x1b[0m')
      res.status(400).json({
        error: error
      })
    }
  );
}

exports.deleteDrink = (req: any, res: any, next: any) => {
  Drink.deleteOne({_id: req.params.id}).then(
    () => {
      console.log('[\x1b[35mDELETE\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m200\x1b[0m')
      res.status(200).json({
        message: 'Drink deleted successfully!'
      })
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[35mDELETE\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m400\x1b[0m')
      res.status(400).json({
        error: error
      })
    }
  );
}

exports.getOneDrink = (req: any, res: any, next: any) => {
  Drink.findOne({_id: req.params.id})
    .then((drink: any) => {
      if (!drink) {
        console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m404\x1b[0m');
        return res.status(404).json({ error: 'No drinks found!' });
      }
      console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m200\x1b[0m');
      res.status(200).json(drink);
    })
    .catch((error: Error) => {
      console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m404\x1b[0m');
      res.status(404).json({ error: error });
    });
}

exports.getAllDrink = (req: any, res: any, next: any) => {
  Drink.find().then(
    (drinks: any) => {
      console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink | \x1b[32m200\x1b[0m')
      res.status(200).json(drinks)
    }
  ).catch(
    (error: Error) => {
      console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink | \x1b[31m400\x1b[0m')
      res.status(400).json({
        error: error
      })
    }
  );
}
