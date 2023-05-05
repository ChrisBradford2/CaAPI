const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
import mongoose from 'mongoose';
import path from 'path';

app.use(bodyParser.json());

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const drinkRoutes = require('./routes/drink')
app.use('/api/drink', drinkRoutes);

app.use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.jbuiwbc.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true } as mongoose.ConnectOptions)
  .then(() => console.log('[\x1b[32mOK\x1b[0m] MongoDB connection'))
  .catch((error: Error) => console.log(`[\x1b[31mERROR\x1b[0m] ${error}`));

app.use('/', express.static(path.join(__dirname, '../public')));

module.exports = app;
