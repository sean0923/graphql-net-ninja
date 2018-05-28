import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const fakeBookList = [{ name: 'book name1' }, { name: 'book name2' }];

const getBooksQuery = gql`
  {
    books {
      _id
      name
      genre
    }
  }
`;

const BookList = props => {
  // console.log('props: ', props);
  return (
    <div>
      <ul>
        {fakeBookList.map((bookListItem, idx) => {
          return <li key={idx}>{bookListItem.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
