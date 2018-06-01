import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

class AddBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }

  displayAuthors() {
    const { data } = this.props;

    if (data.loading) {
      return <option disabled> Loading data ...</option>;
    }

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
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('this.state: ', this.state);
        }}
      >
        <div>
          <label>name:</label>
          <input onChange={e => this.setState({ name: e.target.value })} type="text" />
        </div>

        <div>
          <label>genre:</label>
          <input onChange={e => this.setState({ genre: e.target.value })} type="text" />
        </div>

        <div>
          <label>author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option />
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBookForm);
