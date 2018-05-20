## 13 Type Relations
- resolve() is in charge of getting data

# Get book's author

1. add authorId to fakeBookData
2. add author to BookType
3. able to get authorId from author.resolve parent
4. use _.find to get author data of particular book

## 14 GraphQL Lists

- realize args is not needed for type relation

- Describe why fields need to be wrap by field

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

# Get author's list of books

1. import graphQLList from graphql lib
2. add books under AuthorType and then set type as new graphQLList(BookType)
3. add resolve(parent, args) just like prev lesson

