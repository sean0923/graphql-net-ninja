const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const _ = require('lodash');
const faker = require('faker');

// fake data
const fakeData = [
  { _id: '1', name: faker.name.firstName(), genre: faker.name.lastName() },
  { _id: '2', name: faker.name.firstName(), genre: faker.name.lastName() },
  { _id: '3', name: faker.name.firstName(), genre: faker.name.lastName() },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db and/or other source
        return _.find(fakeData, { _id: args._id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
