import {
  clonePanels,
  enablePanels,
  disablePanels,
  updateInputRadiances
} from './lib/panelsHelpers';

export const _initialPanels = (function () {

  const panels = [
    {
      id: '1',
      enabled: false,
      inputRadiance: null,
      outputVoltage: null,
      outputCurrent: null
    },
    {
      id: '2',
      enabled: false,
      inputRadiance: null,
      outputVoltage: null,
      outputCurrent: null
    },
    {
      id: '3',
      enabled: false,
      inputRadiance: null,
      outputVoltage: null,
      outputCurrent: null
    },
    {
      id: '4',
      enabled: false,
      inputRadiance: null,
      outputVoltage: null,
      outputCurrent: null
    },
    {
      id: '5',
      enabled: false,
      inputRadiance: null,
      outputVoltage: null,
      outputCurrent: null
    },
    {
      id: '6',
      enabled: false,
      inputRadiance: null,
      outputVoltage: null,
      outputCurrent: null
    },
    {
      id: '7',
      enabled: false,
      inputRadiance: null,
      outputVoltage: null,
      outputCurrent: null
    },
    {
      id: '8',
      enabled: false,
      inputRadiance: null,
      outputVoltage: null,
      outputCurrent: null
    }
  ];

  let newInputRadiancesByPanelId = [];

  newInputRadiancesByPanelId['1'] = 0.25;
  newInputRadiancesByPanelId['2'] = 0.35;
  newInputRadiancesByPanelId['3'] = 0.64;
  newInputRadiancesByPanelId['4'] = 0.14;
  newInputRadiancesByPanelId['5'] = 0.85;
  newInputRadiancesByPanelId['6'] = 0.64;
  newInputRadiancesByPanelId['7'] = 0.13;
  newInputRadiancesByPanelId['8'] = 0.12;

  updateInputRadiances(panels, newInputRadiancesByPanelId);

  enablePanels(panels, ['1', '2', '4', '5', '6', '7', '8']); // Skip panel '3', to keep things interesting.

  return panels;
})();

/**
 * Updates the `panels` portion of the Redux state according to the action passed in.
 *
 * @param panels
 * @param action
 * @returns {*}
 */
const panelsReducer = function (panels = _initialPanels, action = {}) {
  let nextPanels;

  switch (action.type) {
    case 'ENABLE_PANELS':
      nextPanels = clonePanels(panels);
      enablePanels(nextPanels, action.payload.panelIds);
      break;

    case 'DISABLE_PANELS':
      nextPanels = clonePanels(panels);
      disablePanels(nextPanels, action.payload.panelIds);
      break;

    case 'UPDATE_INPUT_RADIANCES':
      nextPanels = clonePanels(panels);
      updateInputRadiances(nextPanels, action.payload.newInputRadiances);
      break;

    default:
      nextPanels = panels;
      break;
  }

  return nextPanels;
};

export default panelsReducer;