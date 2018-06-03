## GraphQL Course Taught by Net Ninja
My implementation of Net Ninja's GraphQL course.
His GraphQL playlist is available at 
https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f

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

## 15 More on RootQueries

- Q: How to get entire books and authors from root query
- A: By setting up at root query 

## 16 Connect to MongoDB

## 17 Mongoose Model

- don't get confuse between graphql schema (graph) and mongoose schema
- make models dir
- models/book and author (make book and author models)

## 18 Mutation (addAuthor)

- add mutation in schema.js
- add mutation to root query
- when we are making mutation we need to put mutation in front of {}
- return author.save to receive author at graphiql

## 19 More on Mutation (addBook)

- type: BookType, args: name, genre, authorId

## 20 Updating the Resolver Functions (use data in mongoDB instead of fakeData)

- find book's author
- find author's books
- find book
- find author
- find all books
- find all authors

## 21  GraphQL NonNull (specify thing should not be null)

- We don't want author to be saved without age or name
- GraphQLNonNull from graphql
- What ever you want to be not null surround with new GraphQLNonNull()

## 22 ~ 23 React front-end setup
## 24 Add BookList component

# 25 Apollo Client Setup

- Just like axios help making http req apollo client help making GraphQL req
- npm install apollo-boost react-apollo graphql-tag graphql --save

# 26 Making Queries from React

- Copy paste query from graphiql
- Allow CORS on server.js
- Fetch data

# 27 Rendering Data in a Component

- render data

# 28 AddBook Component

- render AddBookForm Component
- Display authors in select options html tag

# 29 External Query File

- Make external queries file so that queries can be imported

# 31 Composing Queries

- add "addBook" mutation
- import { compose } from react-apollo
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBookForm);
- then there will be no 'data' prop from graphql

# 32 Query Variables
- on mutation files, next to mutation add dollar sign and type
  mutation($name: String!, $authorId: ID!, $genre: String!) {
    addBook(name: $name, authorId: $authorId, genre: $genre) {
      name
      genre
    }
  }

- then argument can take those variables
  this.props.addBookMutation({
    variables: {
      name: this.state.name,
      genre: this.state.genre,
      authorId: this.state.authorId,
    },
  });

- pass args in front-end as variables({...})
- mutation will happen but update shows up only when refreshed

# 33 Re-fetching Queries
- after addBook mutation, refetch book data