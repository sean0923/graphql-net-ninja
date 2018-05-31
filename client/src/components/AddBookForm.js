import React, { Component } from 'react';

class AddBookForm extends Component {
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
          <select>
            <option value="aaa">aaa</option>
            <option value="bbb">bbb</option>
            <option value="ccc">ccc</option>
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default AddBookForm;
