import React, {Component} from 'react';
import {Icon, Menu, Sidebar} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './VerticalNavBar.css';

class VerticalNavBar extends Component {
  render() {
    return (
      <Sidebar as={Menu} animation='overlay' vertical inverted size='large' visible={this.props.sidebarVisible}>
        <Menu.Item onClick={this.props.toggleSidebarVisibility}>
          <span>
            <Icon name='remove'/>
          </span>
        </Menu.Item>

        <Menu.Item as='a' active>Overview</Menu.Item>
        <Menu.Item as='a'>Solar Panels</Menu.Item>
        <Menu.Item as='a'>Inverters</Menu.Item>
        <Menu.Item as='a'>Batteries</Menu.Item>
        <Menu.Item as='a'>My Account</Menu.Item>
      </Sidebar>
    );
  }
}

VerticalNavBar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired,
  toggleSidebarVisibility: PropTypes.func.isRequired
};

export default VerticalNavBar;
