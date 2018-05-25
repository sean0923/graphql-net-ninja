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

// mongoose model
const Book = require('../models/book');
const Author = require('../models/author');

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
        // return _.find(fakeAuthorData, { _id: parent.authorId });
        return Author.findById(parent.authorId);
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
        // return _.filter(fakeBookData, book => book.authorId === parent._id);
        return Book.find({ authorId: parent._id });
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
        // return _.find(fakeBookData, { _id: args._id });
        return Book.findById(args._id);
      },
    },
    author: {
      type: AuthorType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(fakeAuthorData, { _id: args._id });
        return Author.findById(args._id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return fakeBookData;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return fakeAuthorData;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });

        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
