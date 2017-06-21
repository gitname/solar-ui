import {connect} from 'react-redux'
import {updateInputRadiances} from '../actions';
import App from '../components/App/App';

const mapStateToProps = function (state) {
  return {
    panels: state.panels
  };
};

const mapDispatchToProps = {
  updateInputRadiances: updateInputRadiances
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
