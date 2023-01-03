import React, {Component} from 'react';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';
import SolarRadianceChartContainer from "../../containers/SolarRadianceChartContainer";
import PowerOutputChartContainer from "../../containers/PowerOutputChartContainer";
import EnergyStorageChartContainer from "../../containers/EnergyStorageChartContainer";
import LatestEventsFeedContainer from "../../containers/LatestEventsFeedContainer";
import PanelStatusTableContainer from "../../containers/PanelStatusTableContainer";
import './OverviewPageContent.css';

class OverviewPageContent extends Component {
  render() {
    return (
      <Container>
        <Header as='h1' content='Overview' subheader='System status in a nutshell'/>
        <Grid stackable stretched>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='sun' content='Solar Radiance'/>
              <p>Solar radiance at each panel.</p>
              <SolarRadianceChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='tachometer alternate' content='Power Output'/>
              <p>Power output by the inverter.</p>
              <PowerOutputChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='battery three quarters' content='Energy Storage'/>
              <p>Energy stored in each battery.</p>
              <EnergyStorageChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='clock' content='Latest Events'/>
              <p>Latest events involving the system.</p>
              <LatestEventsFeedContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column width={16}>
            <Segment>
              <Header icon='sliders horizontal' content='Panel Status'/>
              <p>Status of each panel.</p>
              <PanelStatusTableContainer/>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default OverviewPageContent;
