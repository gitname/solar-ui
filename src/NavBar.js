import React, {Component} from 'react';
import {Container, Dropdown, Icon, Menu} from 'semantic-ui-react';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <Menu inverted>
        <Container>
          <Menu.Item as='a' header>
            <Icon name='yellow sun'/> MySolarSystem
          </Menu.Item>
          <Menu.Item as='a' active>Overview</Menu.Item>
          <Menu.Item as='a'>Solar Panels</Menu.Item>
          <Menu.Item as='a'>Inverters</Menu.Item>
          <Menu.Item as='a'>Batteries</Menu.Item>

          <Menu.Menu position='right'>
            <Dropdown item icon='dropdown' text='Martin McFly'>
              <Dropdown.Menu>
                <Dropdown.Item icon='user' text='Profile'/>
                <Dropdown.Item icon='setting' text='Settings'/>
                <Dropdown.Item icon='help circle' text='Help'/>
                <Dropdown.Divider/>
                <Dropdown.Item icon='log out' text='Sign out'/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default NavBar;
