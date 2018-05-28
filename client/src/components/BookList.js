import React from 'react';

const fakeBookList = [{ name: 'book name1' }, { name: 'book name2' }];

const BookList = () => {
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

export default BookList;
