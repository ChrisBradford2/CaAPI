const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
require('dotenv').config();
import mongoose from 'mongoose';

const Drink = require('./models/drink');

app.use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/drink', (req: { body: { _id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: any; }): any; new(): any; }; }; }, next: any) => {
  delete req.body._id;
  const thing = new Drink({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Boisson enregistré !'}) && console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/drink | \x1b[32m201\x1b[0m'))
    .catch((error: Error) => res.status(400).json({ error }) && console.log('[\x1b[33mPOST\x1b[0m] ' + date + ' - /api/drink | \x1b[31m400\x1b[0m'));
});

app.get('/api/drink', (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): any; new(): any; }; }; }, next: any) => {
  Drink.find()
    .then((things: any) => res.status(200).json(things) && console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink | \x1b[32m200\x1b[0m'))
    .catch((error: Error) => res.status(400).json({ error }) && console.log('[\x1b[33mGET\x1b[0m] ' + date + ' - /api/drink | \x1b[31m400\x1b[0m'));
});

app.get('/api/drink/:id', (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): any; new(): any; }; }; }, next: any) => {
  Drink.findOne({ _id: req.params.id })
    .then((drink: any) => res.status(200).json(drink) && console.log('[\x1b[32mGET\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m200\x1b[0m'))
    .catch((error: Error) => res.status(404).json({ error }) && console.log('[\x1b[33mGET\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m404\x1b[0m'));
});

app.put('/api/drink/:id', (req: { params: { id: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: any; }): any; new(): any; }; }; }, next: any) => {
  Drink.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Boisson modifié !'}) && console.log('[\x1b[34mPATCH\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m200\x1b[0m'))
    .catch((error: Error) => res.status(400).json({ error }) && console.log('[\x1b[34mPATCH\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m400\x1b[0m'));
});

app.delete('/api/drink/:id', (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: any; }): any; new(): any; }; }; }, next: any) => {
  Drink.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Boisson supprimé !'}) && console.log('[\x1b[35mDELETE\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[32m200\x1b[0m'))
    .catch((error: Error) => res.status(400).json({ error }) && console.log('[\x1b[35mDELETE\x1b[0m] ' + date + ' - /api/drink/' + req.params.id + ' | \x1b[31m400\x1b[0m'));
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.jbuiwbc.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true } as mongoose.ConnectOptions)
  .then(() => console.log('[\x1b[32mOK\x1b[0m] MongoDB connection'))
  .catch(() => console.log('[\x1b[31mERROR\x1b[0m] MongoDB connection'));

module.exports = app;
