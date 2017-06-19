import React, {Component} from 'react';
import {Sidebar} from 'semantic-ui-react';
import VerticalNavBarContainer from '../../containers/VerticalNavBarContainer';
import HorizontalNavBarContainer from '../../containers/HorizontalNavBarContainer';
import OverviewPageContent from '../OverviewPageContent/OverviewPageContent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <VerticalNavBarContainer/>
        <Sidebar.Pusher>
          <HorizontalNavBarContainer/>
          <OverviewPageContent/>
        </Sidebar.Pusher>
      </div>
    );
  }
}

export default App;
