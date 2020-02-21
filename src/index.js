import React from "react";
import { render } from "react-dom";
import Spinner from "./Spinner";

function detectDesktopOrMobile(WrappedComponent) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        width: window.innerWidth,
      };
    }
    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });
    };
    render() {
      return <WrappedComponent isDesktop={this.state.width > 500} {...this.props} />;
    }
  };
}

class HelloWorld extends React.Component {
  render() {
    return this.props.isDesktop ? <h1>Hello world from Desktop</h1> : <h1>Hello world from mobile</h1>;
  }
}

const HelloWorldResponsive = detectDesktopOrMobile(HelloWorld);


render(<HelloWorldResponsive hidden={false} />, document.getElementById("root"));
