import React, {Component} from 'react';
import {Icon, Menu, Sidebar} from 'semantic-ui-react';
import './VerticalNavBar.css';

class VerticalNavBar extends Component {
  render() {
    return (
      <Sidebar as={Menu} animation='overlay' vertical inverted size='large' visible={this.props.visible}>
        <Menu.Item onClick={this.props.toggleSidebar}>
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

export default VerticalNavBar;
