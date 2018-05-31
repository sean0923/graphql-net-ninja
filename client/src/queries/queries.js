import gql from 'graphql-tag';

export const getAuthorsQuery = gql`
  {
    authors {
      _id
      name
      age
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      _id
      name
      genre
    }
  }
`;
