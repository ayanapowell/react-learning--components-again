import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";
import SeasonDisplay from "./SeasonDisplay";
import "./SeasonDisplay.css";

class App extends Component {
  // Overriding React.Component's constructor func
  constructor(props) {
    // References React.Component's constructor func
    super(props);
    // THIS IS THE ONLY TIME we do direct assignment to this.state
    this.state = {
      lat: null,
      errorMessage: ""
    };
  }
  // Alternate way to define state
  // state = {
  //   lat: null,
  //   errorMessage: ""
  // };
  // When content is visible on screen
  componentDidMount() {
    // Get current position
    window.navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          lat: position.coords.latitude
        }),
      err => this.setState({ errorMessage: err.message })
    );
  }
  // When state changes
  componentDidUpdate() {}

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="Please accept location request" />;
  }

  render() {
    return (
      <div className="border red parent wrapper">{this.renderContent()}</div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
