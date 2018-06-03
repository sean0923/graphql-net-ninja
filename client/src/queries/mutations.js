import gql from 'graphql-tag';

export const addBookMutation = gql`
  mutation($name: String!, authorId: ID!, $genre: $String!) {
    addBook(name: $name, authorId: $authorId, genre: $genre) {
      name
      genre
    }
  }
`;
