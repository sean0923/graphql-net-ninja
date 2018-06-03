import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';
import { addBookMutation } from '../queries/mutations';

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
    // this.props
    const { getAuthorsQuery } = this.props;

    if (getAuthorsQuery.loading) {
      return <option disabled> Loading data ...</option>;
    }

    return getAuthorsQuery.authors.map(author => {
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

// export default graphql(getAuthorsQuery)(AddBookForm);
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBookForm);
