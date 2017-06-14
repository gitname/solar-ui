import React, {Component} from 'react';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';
import EnergyStorageChart from './EnergyStorageChart.js';
import PowerOutputChart from './PowerOutputChart.js';
import './OverviewPageContent.css';

class OverviewPageContent extends Component {
  render() {
    return (
      <Container>
        <Header as='h1' content='Overview' subheader='System status in a nutshell'/>
        <Grid stackable stretched>
          <Grid.Column width={8}>
            <Segment>
              <Header icon='dashboard' content='Power Output'/>
              <p>Power being output by the inverter.</p>
              <PowerOutputChart/>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <Header icon='high battery' content='Energy Storage'/>
              <p>Energy stored in each battery.</p>
              <EnergyStorageChart/>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default OverviewPageContent;
