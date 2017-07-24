import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Feed, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './LatestEventsFeed.css';

class LatestEventsFeed extends Component {
  render() {
    const events = this.props.events.map((event) => {
      let iconName;
      switch (event.type) {
        case 'enable':
          iconName = 'check circle outline';
          break;
        case 'disable':
          iconName = 'remove circle outline';
          break;
        default:
          iconName = 'clock';
          break;
      }

      // Format the timestamp.
      //
      // TODO: Consider formatting the timestamp using moment.js functionality instead of using raw JavaScript.
      // Reference: http://momentjs.com/docs/#/customization/calendar/
      // Reference: http://momentjs.com/docs/#/customization/long-date-formats/
      //
      let formattedTimestamp = event.timestamp.calendar();
      if (formattedTimestamp.substr(-3) === ' AM') {
        formattedTimestamp = formattedTimestamp.substr(0, formattedTimestamp.length - 3) + 'am';
      } else {
        formattedTimestamp = formattedTimestamp.substr(0, formattedTimestamp.length - 3) + 'pm';
      }

      return (
        <CSSTransition
          key={event.timestamp}
          classNames='latest-events-feed--event-'
          timeout={{enter: 5000}}
          exit={false}>

          <Feed.Event>
            <Feed.Label>
              <Icon name={iconName}/>
            </Feed.Label>
            <Feed.Content className='latest-events-feed--event-content'>
              <Feed.Date className='latest-events-feed--event-date' title={event.timestamp.toString()}>
                {formattedTimestamp}
              </Feed.Date>
              <Feed.Summary className='latest-events-feed--event-summary'>
                {event.summary}
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>

        </CSSTransition>
      );
    });

    return (
      <Feed as={TransitionGroup}>

        {events}

      </Feed>
    );
  }
}

LatestEventsFeed.propTypes = {
  events: PropTypes.array.isRequired
};

export default LatestEventsFeed;
