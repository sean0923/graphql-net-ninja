const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const _ = require('lodash');
const faker = require('faker');

// fake data -----------------------------------------------------------------
const fakeBookData = [
  { _id: '1', name: faker.name.firstName(), genre: faker.name.lastName(), authorId: '1' },
  { _id: '2', name: faker.name.firstName(), genre: faker.name.lastName(), authorId: '2' },
  { _id: '3', name: faker.name.firstName(), genre: faker.name.lastName(), authorId: '3' },
  { _id: '4', name: faker.name.firstName(), genre: faker.name.lastName(), authorId: '3' },
  { _id: '5', name: faker.name.firstName(), genre: faker.name.lastName(), authorId: '2' },
  { _id: '6', name: faker.name.firstName(), genre: faker.name.lastName(), authorId: '2' },
  { _id: '7', name: faker.name.firstName(), genre: faker.name.lastName(), authorId: '3' },
];

const fakeAuthorData = [
  { _id: '1', name: faker.name.firstName(), age: _.random(20, 90) },
  { _id: '2', name: faker.name.firstName(), age: _.random(20, 90) },
  { _id: '3', name: faker.name.firstName(), age: _.random(20, 90) },
];
// ----------------------------------------------------------------------------

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    // _id: { type: GraphQLString },
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString },
    // 1st type relation ----------------------------------------
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log('args: ', args);
        console.log('parent: ', parent);
        return _.find(fakeAuthorData, { _id: parent.authorId });
      },
    },
    // ----------------------------------------------------------
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(fakeBookData, book => book.authorId === parent._id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      // args: { _id: { type: GraphQLString } },
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db and/or other source
        return _.find(fakeBookData, { _id: args._id });
      },
    },
    author: {
      type: AuthorType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(fakeAuthorData, { _id: args._id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
