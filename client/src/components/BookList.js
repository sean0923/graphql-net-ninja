import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      _id
      name
      genre
    }
  }
`;

const renderBookListItems = ({ data }) => {
  return (
    <ul>
      {data.books.map(bookListItem => {
        return <li key={bookListItem._id}>{bookListItem.name}</li>;
      })}
    </ul>
  );
};

const BookList = props => {
  if (props.data.loading) return <div>Loading ...</div>;
  return <div>{renderBookListItems(props)}</div>;
};

export default graphql(getBooksQuery)(BookList);
