import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const getAuthorsQuery = gql`
  {
    authors {
      _id
      name
      age
    }
  }
`;

class AddBookForm extends Component {
  displayAuthors() {
    const { data } = this.props;
    if (data.loading) return null;
    return data.authors.map(author => {
      return (
        <option key={author._id} value={author._id}>
          {author.name}
        </option>
      );
    });
  }

  render() {
    return (
      <form>
        <div>
          <label>name:</label>
          <input type="text" />
        </div>

        <div>
          <label>genre:</label>
          <input type="text" />
        </div>

        <div>
          <label>author:</label>
          <select>{this.displayAuthors()}</select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBookForm);
