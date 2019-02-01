import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import fishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

// Turn this into a snippet?
class App extends React.Component {
  // AirBnb ESLint rules enforce this order.
  // State
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  // Life-cycle events
  componentDidMount() {
    // reinstate local storage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    console.log(localStorageRef);
    console.log(JSON.parse(localStorageRef));

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

    // console.log("MOUNTING");
    // firebase reference
    // console.log(this.ref);

    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
    // console.log(this.ref);
  }

  componentDidUpdate() {
    // console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );

    // console.log("IT UPDATED");
  }

  componentWillUnmount() {
    // console.log("UNMOUNTING");

    base.removeBinding(this.ref);
  }

  // Custom functions
  addFish = fish => {
    console.log("Adding a fish!");

    // Object spread (deep clone not needed)
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;

    // ES6 attribute and value if equal only need to put in once.
    this.setState({
      fishes
    });
  };

  addToOrder = key => {
    // 1. Copy state (don't mutate, copy and set instead)
    const order = { ...this.state.order };

    // 2. Add to order or update the number in our order
    order[key] = order[key] + 1 || 1;

    // 3. Update state
    this.setState({
      order
    });
  };

  updateFish = (key, updatedFish) => {
    // copy fishes
    const fishes = { ...this.state.fishes };

    fishes[key] = updatedFish;

    this.setState({
      fishes
    });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;

    // this doesn't work for firebase:
    // delete fishes[key];

    this.setState({ fishes });
  };

  decrementOrderItem = key => {
    const order = { ...this.state.order };
    // order[key]--;

    // if (!order[key] || order[key] <= 0) {
    delete order[key];
    // }

    this.setState({ order });
  };

  loadSampleFishes = () => {
    // alert("loading sample");
    // alert(fishes);

    // console.log(fishes);

    this.setState({
      fishes
    });

    // console.log(this.state.fishes);
  };

  // Render
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              >
                {key}
              </Fish>
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          decrementOrderItem={this.decrementOrderItem}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
