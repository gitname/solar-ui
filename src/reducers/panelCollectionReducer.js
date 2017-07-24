import moment from 'moment';
import {
  clonePanelCollection,
  enablePanels,
  disablePanels,
  updateInputRadiances,
  getIdentifiedPanelsDescription,
  addEvent
} from './lib/panelCollectionHelpers';

export const _initialPanelCollection = (function () {

  const panelCollection = {
    panels: [
      {
        id: '1',
        enabled: false,
        inputRadianceKWM2: null,
        outputVoltageV: null,
        outputCurrentA: null
      },
      {
        id: '2',
        enabled: false,
        inputRadianceKWM2: null,
        outputVoltageV: null,
        outputCurrentA: null
      },
      {
        id: '3',
        enabled: false,
        inputRadianceKWM2: null,
        outputVoltageV: null,
        outputCurrentA: null
      },
      {
        id: '4',
        enabled: false,
        inputRadianceKWM2: null,
        outputVoltageV: null,
        outputCurrentA: null
      },
      {
        id: '5',
        enabled: false,
        inputRadianceKWM2: null,
        outputVoltageV: null,
        outputCurrentA: null
      },
      {
        id: '6',
        enabled: false,
        inputRadianceKWM2: null,
        outputVoltageV: null,
        outputCurrentA: null
      },
      {
        id: '7',
        enabled: false,
        inputRadianceKWM2: null,
        outputVoltageV: null,
        outputCurrentA: null
      },
      {
        id: '8',
        enabled: false,
        inputRadianceKWM2: null,
        outputVoltageV: null,
        outputCurrentA: null
      }
    ],
    events: [
      {
        timestamp: moment().subtract(1, 'days').hour(8).minute(39).second(0), // a moment representing Yesterday at 8:39:00 AM
        type: 'disable',
        summary: 'You disabled all panels.'
      },
      {
        timestamp: moment().subtract(1, 'days').hour(13).minute(21).second(0),
        type: 'enable',
        summary: 'You enabled all panels.'
      },
      {
        timestamp: moment().subtract(1, 'days').hour(18).minute(12).second(0),
        type: 'disable',
        summary: 'You disabled panel 3.'
      }
    ]
  };

  let newInputRadiancesByPanelId = [];

  newInputRadiancesByPanelId['1'] = 0.25;
  newInputRadiancesByPanelId['2'] = 0.35;
  newInputRadiancesByPanelId['3'] = 0.64;
  newInputRadiancesByPanelId['4'] = 0.14;
  newInputRadiancesByPanelId['5'] = 0.85;
  newInputRadiancesByPanelId['6'] = 0.64;
  newInputRadiancesByPanelId['7'] = 0.13;
  newInputRadiancesByPanelId['8'] = 0.12;

  updateInputRadiances(panelCollection.panels, newInputRadiancesByPanelId);

  enablePanels(panelCollection.panels, ['1', '2', '4', '5', '6', '7', '8']); // Skip panel '3', to keep things interesting.

  return panelCollection;
})();

/**
 * Updates the `panelCollection` portion of the Redux state according to the action passed in.
 *
 * @param panelCollection
 * @param action
 * @returns {*}
 */
const panelCollectionReducer = function (panelCollection = _initialPanelCollection, action = {}) {
  let nextPanelCollection,
    panelIds,
    timestamp,
    newInputRadiances;

  switch (action.type) {
    case 'ENABLE_PANELS':
      nextPanelCollection = clonePanelCollection(panelCollection);
      panelIds = action.payload.panelIds;
      timestamp = action.payload.timestamp;
      enablePanels(nextPanelCollection.panels, panelIds);
      addEvent(nextPanelCollection.events, {
        timestamp: timestamp,
        type: 'enable',
        summary: `You enabled ${getIdentifiedPanelsDescription(nextPanelCollection.panels, panelIds)}.`
      });
      break;

    case 'DISABLE_PANELS':
      nextPanelCollection = clonePanelCollection(panelCollection);
      panelIds = action.payload.panelIds;
      timestamp = action.payload.timestamp;
      disablePanels(nextPanelCollection.panels, panelIds);
      addEvent(nextPanelCollection.events, {
        timestamp: timestamp,
        type: 'disable',
        summary: `You disabled ${getIdentifiedPanelsDescription(nextPanelCollection.panels, panelIds)}.`
      });
      break;

    case 'UPDATE_INPUT_RADIANCES':
      nextPanelCollection = clonePanelCollection(panelCollection);
      newInputRadiances = action.payload.newInputRadiances;
      updateInputRadiances(nextPanelCollection.panels, newInputRadiances);
      break;

    default:
      nextPanelCollection = panelCollection;
      break;
  }

  return nextPanelCollection;
};

export default panelCollectionReducer;