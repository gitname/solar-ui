import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Sidebar} from 'semantic-ui-react';
import VerticalNavBarContainer from '../../containers/VerticalNavBarContainer';
import HorizontalNavBarContainer from '../../containers/HorizontalNavBarContainer';
import OverviewPageContent from '../OverviewPageContent/OverviewPageContent';
import {getNearbyRandomNumber} from '../../lib/random';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    setInterval(this.updateInputRadiances.bind(this), 4000);
  }

  /**
   * Begins the process of updating the input radiance value of each panel in the Redux store, with a value that is near
   * the current value.
   *
   * Note: If we were using a real-life solar panel system, we would not need to do this, as the input radiance of each
   * panel would be naturally updated as their sunlight exposure changed over time. In that case, the client might
   * obtain the new values by reading them from an API, which read them from sensors. However, since this is a
   * simulation in which all logic is contained within the client, we update the properties ourselves (i.e. here) instead.
   */
  updateInputRadiances() {
    const newInputRadiancesByPanelId = [];
    this.props.panels.forEach((panel) => {
      newInputRadiancesByPanelId[panel.id] = getNearbyRandomNumber(0, 1, panel.inputRadianceKWM2, 0.05);
    });
    this.props.updateInputRadiances(newInputRadiancesByPanelId);
  }

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

App.propTypes = {
  panels: PropTypes.array.isRequired,
  updateInputRadiances: PropTypes.func.isRequired
};

export default App;
