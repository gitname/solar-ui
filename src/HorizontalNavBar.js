import React, {Component} from 'react';
import {Container, Dropdown, Icon, Menu} from 'semantic-ui-react';
import './HorizontalNavBar.css';

class HorizontalNavBar extends Component {
  render() {
    return (
      <Menu inverted className='horizontal-nav-bar'>
        <Container>
          <Menu.Item as='a' icon='sidebar' onClick={this.props.toggleSidebar}
                     className='hidden-on-small-monitor hidden-on-large-monitor'/>

          <Menu.Item as='a' header>
            <Icon name='sun' color='yellow'/> MySolarSystem
          </Menu.Item>
          <Menu.Item as='a' className='hidden-on-tablet hidden-on-phone' active>Overview</Menu.Item>
          <Menu.Item as='a' className='hidden-on-tablet hidden-on-phone'>Solar Panels</Menu.Item>
          <Menu.Item as='a' className='hidden-on-tablet hidden-on-phone'>Inverters</Menu.Item>
          <Menu.Item as='a' className='hidden-on-tablet hidden-on-phone'>Batteries</Menu.Item>

          <Menu.Menu position='right' className='hidden-on-tablet hidden-on-phone'>
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

export default HorizontalNavBar;
