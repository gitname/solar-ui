import {connect} from 'react-redux'
import LatestEventsFeed from '../components/LatestEventsFeed/LatestEventsFeed';

const mapStateToProps = function (state) {
  return {
    events: state.panelCollection.events
  };
};

const LatestEventsFeedContainer = connect(
  mapStateToProps,
  null
)(LatestEventsFeed);

export default LatestEventsFeedContainer;
