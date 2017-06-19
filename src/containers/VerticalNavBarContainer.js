import {connect} from 'react-redux'
import {toggleSidebarVisibility} from '../actions';
import VerticalNavBar from '../components/VerticalNavBar/VerticalNavBar';

const mapStateToProps = function (state) {
  // Note: I created this variable in an attempt to clarify for the reader, what--in terms of Redux concepts--this function returns.
  let props = {
    visible: state.sidebarVisible
  };
  return props;
};

const mapDispatchToProps = {
  toggleSidebar: toggleSidebarVisibility
};

const VerticalNavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerticalNavBar);

export default VerticalNavBarContainer;
