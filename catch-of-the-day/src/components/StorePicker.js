import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { getFunName } from "../helpers";

export class StorePicker extends React.Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  goToStore = event => {
    event.preventDefault();
    console.log("Going to store!");

    // console.log(this);
    // console.log(this.myInput.current.value);
    const storeNmae = this.myInput.current.value;

    this.props.history.push(`/store/${storeNmae}`);
  };

  //   componentDidMount() {
  //     console.log("MOUNTED");
  //     console.log(this);
  //   }

  render() {
    // console.log(this);

    // return <p>I AM THE STORE PICKER!</p>;
    // return React.createElement('p', { className: 'hey' }, 'Heyyyoooo');
    return (
      <Fragment>
        <p>fish</p>
        <form className="store-selector" onSubmit={this.goToStore}>
          {/* Test */}
          <h2>Please enter a store</h2>
          <input
            type="text"
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
            ref={this.myInput}
          />
          <button type="Submit">Visit Store →</button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
