const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

// graphQL schema
const schema = require('./schema/schema');

// express app
const app = express();

// allow cross origin requests
app.use(cors());

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
