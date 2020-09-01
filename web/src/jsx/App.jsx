import React, { Component } from 'react';

import { Button, Icon, Loader, Dimmer, Modal } from 'semantic-ui-react';

import { Switch, Route, Redirect } from 'react-router-dom';

import '../css/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Display
      loading: true,
    };
  }

  render() {
    return <div>Hello, World!</div>;
  }

  /**
   * Called after the component has mounted
   *
   */
  componentDidMount() {}
}
