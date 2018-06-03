import gql from 'graphql-tag';

export const addBookMutation = gql`
  mutation {
    addBook(name: "book name", authorId: "5b04fe03ae37d7699b43e7f1", genre: "any genre") {
      name
      genre
    }
  }
`;
