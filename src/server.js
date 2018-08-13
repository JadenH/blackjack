// https://github.com/motdotla/dotenv
// Load the .env file
require('dotenv').config()

import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';

import { default as graphqlSchema } from './schema';

// =========== Database ===========
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error);
// =========== /Database ===========

// =========== App ===========
const app = express();

// =========== GraphQL ===========
const formatError = error => {
  console.log(error);
  return {
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  }
}

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  graphiql: true,
  formatError: formatError
}));
// =========== /GraphQL ===========

// =========== Connect ===========
db.once('open', () => {
  console.log('Database connected')
  app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.port}!`));
});
// =========== /Connect ===========
