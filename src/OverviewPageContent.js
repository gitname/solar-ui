import React, {Component} from 'react';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';
import './OverviewPageContent.css';

class OverviewPageContent extends Component {
  render() {
    return (
      <Container>
        <Header as='h1' content='Overview' subheader='System status in a nutshell'/>
        <Grid stackable stretched>
          <Grid.Column width={16}>
            <Segment>
              Welcome to the Overview page.
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default OverviewPageContent;
