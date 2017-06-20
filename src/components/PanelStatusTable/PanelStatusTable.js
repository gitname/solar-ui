import React, {Component} from 'react';
import {Button, Checkbox, Icon, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './PanelStatusTable.css';

class PanelStatusTable extends Component {
  handleCheckboxChange(event, data) {
    const checkboxMarked = data.checked,
      panelId = data.name;

    if (checkboxMarked === true) {
      this.props.enablePanels([panelId]);
    } else {
      this.props.disablePanels([panelId]);
    }
  }

  enableAllPanels(event, data) {
    this.props.enablePanels(PanelStatusTable.getPanelIds(this.props.panels));
  }

  disableAllPanels(event, data) {
    this.props.disablePanels(PanelStatusTable.getPanelIds(this.props.panels));
  }

  static getPanelIds(panels) {
    return panels.map(function (panel) {
      return panel.id;
    });
  }

  static forkOnGitHub() {
    window.location.assign('https://github.com/gitname/solar-ui');
  }

  render() {
    let rows,
      panels = this.props.panels;

    // Generate one table row per panel.
    rows = panels.map(function (panel) {
      return (
        <Table.Row key={panel.id}>
          <Table.Cell collapsing>
            <Checkbox slider checked={panel.enabled} name={'' + panel.id}
                      onChange={this.handleCheckboxChange.bind(this)}/>
          </Table.Cell>
          <Table.Cell><a title={'View Panel ' + panel.id + ' details'}>{panel.id}</a></Table.Cell>
          <Table.Cell disabled={!panel.enabled}>{panel.inputRadiance.toFixed(2)} kW/m²</Table.Cell>
          <Table.Cell disabled={!panel.enabled}>{panel.outputVoltage.toFixed(2)} V</Table.Cell>
          <Table.Cell disabled={!panel.enabled}>{panel.outputCurrent.toFixed(2)} A</Table.Cell>
          <Table.Cell disabled={!panel.enabled}>{panel.inverterId}</Table.Cell>
        </Table.Row>
      );
    }, this);

    return (
      <Table celled compact definition className='panel-status-table'>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Enabled</Table.HeaderCell>
            <Table.HeaderCell>Panel</Table.HeaderCell>
            <Table.HeaderCell>Solar Radiance</Table.HeaderCell>
            <Table.HeaderCell>Output Voltage</Table.HeaderCell>
            <Table.HeaderCell>Output Current</Table.HeaderCell>
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

PanelStatusTable.propTypes = {
  panels: PropTypes.arrayOf(PropTypes.shape({
    enabled: PropTypes.bool,
    inputRadiance: PropTypes.number,
    outputVoltage: PropTypes.number,
    outputCurrent: PropTypes.number,
    inverterId: PropTypes.string
  })).isRequired,
  enablePanels: PropTypes.func.isRequired,
  disablePanels: PropTypes.func.isRequired
};

export default PanelStatusTable;
