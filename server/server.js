const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

// graphQL schema
const schema = require('./schema/schema');

// express app
const app = express();

// connecting to mongoDB
mongoose.connect('mongodb://localhost/graphql-ninja');
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
});

// graphql endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
