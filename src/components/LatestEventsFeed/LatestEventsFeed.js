import React, {Component} from 'react';
import {Feed, Icon, Popup} from 'semantic-ui-react';
import './LatestEventsFeed.css';

class LatestEventsFeed extends Component {
  render() {
    return (
      <Feed>

        <Feed.Event>
          <Feed.Label>
            <Icon name='full battery'/>
          </Feed.Label>
          <Feed.Content className='latest-events-feed--content'>
            <Feed.Date className='latest-events-feed--date'>
              Today at 6:12am
            </Feed.Date>
            <Feed.Summary className='latest-events-feed--summary'>
              <a title='View Battery 2 details'>Battery 2</a> is full.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label>
            <Icon name='desktop'/>
          </Feed.Label>
          <Feed.Content className='latest-events-feed--content'>
            <Feed.Date className='latest-events-feed--date'>
              Yesterday at 1:21pm
            </Feed.Date>
            <Feed.Summary className='latest-events-feed--summary'>
              You signed in from <Popup
              trigger={<span className='latest-events-feed--popup-trigger'>a new device</span>}
              header={'Marty\'s MacBook Pro'}
              content='IP: 172.217.5.100'
              position='right center'
              size='tiny'
              inverted
            />.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label>
            <Icon name='low battery'/>
          </Feed.Label>
          <Feed.Content className='latest-events-feed--content'>
            <Feed.Date className='latest-events-feed--date'>
              Yesterday at 8:39am
            </Feed.Date>
            <Feed.Summary className='latest-events-feed--summary'>
              <a title='View Battery 3 details'>Battery 3</a> is low.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

      </Feed>
    );
  }
}

export default LatestEventsFeed;
