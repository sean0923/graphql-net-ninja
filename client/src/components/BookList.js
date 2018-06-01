import React from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

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
