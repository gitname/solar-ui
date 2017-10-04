import {connect} from 'react-redux'
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';

const mapStateToProps = function (state) {
  // Note: I created this variable in an attempt to clarify for the reader, what--in terms of Redux concepts--this function returns.
  let props = {
    sidebarVisible: state.sidebarVisible
  };
  return props;
};

const VerticalNavBarContainer = connect(
  mapStateToProps,
  null
)(VerticalNavBar);

export default VerticalNavBarContainer;
