import {connect} from 'react-redux'
import {toggleSidebarVisibility} from '../actions';
import HorizontalNavBar from '../components/HorizontalNavBar/HorizontalNavBar';

const mapDispatchToProps = {
  toggleSidebar: toggleSidebarVisibility
};

const HorizontalNavBarContainer = connect(
  null,
  mapDispatchToProps
)(HorizontalNavBar);

export default HorizontalNavBarContainer;
