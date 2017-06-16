import React, {Component} from 'react';
import {Button, Checkbox, Icon, Table} from 'semantic-ui-react';
import './PanelStatusTable.css';

class PanelStatusTable extends Component {
  constructor(props) {
    super(props);

    // The initial properties of each panel.
    this.panels = [
      {
        id: 1,
        initialSolarRadiance: 0.25,
        initialVoltage: 2.34,
        initialCurrent: 3.45,
        inverterId: 1,
        initiallyEnabled: true
      },
      {
        id: 2,
        initialSolarRadiance: 0.35,
        initialVoltage: 3.45,
        initialCurrent: 4.56,
        inverterId: 1,
        initiallyEnabled: true
      },
      {
        id: 3,
        initialSolarRadiance: 0.64,
        initialVoltage: 4.56,
        initialCurrent: 5.67,
        inverterId: 1,
        initiallyEnabled: false
      },
      {
        id: 4,
        initialSolarRadiance: 0.14,
        initialVoltage: 5.67,
        initialCurrent: 7.89,
        inverterId: 1,
        initiallyEnabled: true
      },
      {
        id: 5,
        initialSolarRadiance: 0.85,
        initialVoltage: 8.90,
        initialCurrent: 9.10,
        inverterId: 1,
        initiallyEnabled: true
      },
      {
        id: 6,
        initialSolarRadiance: 0.64,
        initialVoltage: 9.10,
        initialCurrent: 1.01,
        inverterId: 1,
        initiallyEnabled: true
      },
      {
        id: 7,
        initialSolarRadiance: 0.13,
        initialVoltage: 1.01,
        initialCurrent: 1.11,
        inverterId: 1,
        initiallyEnabled: true
      },
      {
        id: 8,
        initialSolarRadiance: 0.12,
        initialVoltage: 1.11,
        initialCurrent: 1.21,
        inverterId: 1,
        initiallyEnabled: true
      }
    ];

    // The ID of each panels.
    this.panelIds = [];

    // The ID of each initially-enabled panel.
    const enabledPanelIds = [];
    for (let i = 0; i < this.panels.length; i++) {
      this.panelIds.push(this.panels[i].id);

      if (this.panels[i].initiallyEnabled === true) {
        enabledPanelIds.push(this.panels[i].id);
      }
    }

    // Store these values in the component state so React re-renders the component whenever these values change.
    this.state = {
      enabledPanelIds: enabledPanelIds
    };
  }

  handleCheckboxChange(event, data) {
    const marked = data.checked,
      panelId = parseInt(data.name, 10);

    if (marked === true) {
      this.enablePanel(panelId);
    } else {
      this.disablePanel(panelId);
    }
  }

  enablePanel(panelId) {
    this.setState(function (prevState, props) {
      // Copy the array, since the React docs recommend against mutating `prevState` directly.
      const enabledPanelIds = prevState.enabledPanelIds.concat();

      enabledPanelIds.push(panelId);
      return {
        enabledPanelIds: enabledPanelIds
      }
    });
  }

  disablePanel(panelId) {
    this.setState(function (prevState, props) {
      // Copy the array, since the React docs recommend against mutating `prevState` directly.
      const enabledPanelIds = prevState.enabledPanelIds.concat();

      enabledPanelIds.splice(enabledPanelIds.indexOf(panelId), 1);
      return {
        enabledPanelIds: enabledPanelIds
      }
    });
  }

  enableAllPanels(event, data) {
    this.setState({
      enabledPanelIds: this.panelIds.concat()
    });
  }

  disableAllPanels(event, data) {
    this.setState({
      enabledPanelIds: []
    });
  }

  forkOnGitHub() {
    window.location.assign('https://github.com/gitname/solar-ui');
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.panels.length; i++) {
      let panel = this.panels[i],
        panelDisabled = (this.state.enabledPanelIds.indexOf(panel.id) === -1),
        voltage = panelDisabled ? 0 : panel.initialVoltage,
        current = panelDisabled ? 0 : panel.initialCurrent;

      rows.push(
        <Table.Row key={panel.id}>
          <Table.Cell collapsing>
            <Checkbox slider checked={!panelDisabled} name={'' + panel.id}
                      onChange={this.handleCheckboxChange.bind(this)}/>
          </Table.Cell>
          <Table.Cell><a title={'View Panel ' + panel.id + ' details'}>{panel.id}</a></Table.Cell>
          <Table.Cell disabled={panelDisabled}>{panel.initialSolarRadiance} kW/m²</Table.Cell>
          <Table.Cell disabled={panelDisabled}>{voltage} V</Table.Cell>
          <Table.Cell disabled={panelDisabled}>{current} A</Table.Cell>
          <Table.Cell disabled={panelDisabled}>{panel.inverterId}</Table.Cell>
        </Table.Row>
      );
    }

    return (
      <Table celled compact definition>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Enabled</Table.HeaderCell>
            <Table.HeaderCell>Panel</Table.HeaderCell>
            <Table.HeaderCell>Solar Radiance</Table.HeaderCell>
            <Table.HeaderCell>Voltage Output</Table.HeaderCell>
            <Table.HeaderCell>Current Output</Table.HeaderCell>
            <Table.HeaderCell>Inverter</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{rows}</Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='8'>
              <Button.Group size='small'>
                <Button basic color='green' onClick={this.disableAllPanels.bind(this)}>Disable All</Button>
                <Button color='green' onClick={this.enableAllPanels.bind(this)}>Enable All</Button>
              </Button.Group>

              <Button size='small' color='green' icon labelPosition='left' floated='right'
                      className='power-consumption-report--right-button'
                      onClick={this.forkOnGitHub}>
                <Icon name='fork'/> Fork on GitHub
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>

      </Table>
    );
  }
}

export default PanelStatusTable;
