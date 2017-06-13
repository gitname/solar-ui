import React, {Component} from 'react';
import VerticalNavBar from './VerticalNavBar.js';
import HorizontalNavBar from './HorizontalNavBar.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false
    };
  }

  toggleSidebar() {
    // The authors of the React documentation caution against relying on this.state for calculating the next state
    // (which is why I do not toggle myProperty via "this.setState({myProperty: !this.state.myProperty})");
    // they instead recommend using the following version of setState() instead, which gives us the previous state.
    // Reference: https://facebook.github.io/react/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    this.setState(function (prevState, props) {
      return {
        sidebarVisible: !prevState.sidebarVisible
      };
    });
  }

  render() {
    return (
      <div>
        <VerticalNavBar visible={this.state.sidebarVisible} toggleSidebar={this.toggleSidebar.bind(this)}/>
        <div className='pusher'>
          <HorizontalNavBar toggleSidebar={this.toggleSidebar.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
