/**
 * Clones an array of `panels`.
 *
 * @param panels - The array you want to clone.
 * @returns {Array} - The new array.
 */
const clonePanels = function (panels) {
  const panelsClone = [];
  panels.forEach(function (panel) {
    // Doing a shallow copy is sufficient, since a `panel` has a depth of only 1.
    const panelClone = Object.assign({}, panel);
    panelsClone.push(panelClone);
  });
  return panelsClone;
};

/**
 * Enables one or more `panel` objects.
 *
 * @param targetPanelIds - An array containing the ID of each `panel` object you want to enable.
 * @param panels - An array containing the `panel` objects you want to enable.
 */
const enablePanels = function (targetPanelIds, panels) {
  panels.forEach(function (panel) {
    if (targetPanelIds.indexOf(panel.id) !== -1) {
      panel.enabled = true;
    }
  });
};

/**
 * Disables one or more `panel` objects.
 *
 * @param targetPanelIds - An array containing the ID of each `panel` object you want to disable.
 * @param panels - An array containing the `panel` objects you want to disable.
 */
const disablePanels = function (targetPanelIds, panels) {
  panels.forEach(function (panel) {
    if (targetPanelIds.indexOf(panel.id) !== -1) {
      panel.enabled = false;
    }
  });
};

/**
 * Updates the 'output...' properties so they're mathematically consistent with the 'input...' and 'enabled' properties,
 * of each `panel` object in the array passed in.
 *
 * Note: In real life, the 'input', 'enabled', and 'output' values might originate at some hardware sensors, be
 * processed by a server, and be provided to the web client via a REST API. However, since this is only a simulation of
 * a solar panel system, I'm calculating the 'output' values here, in the web client itself.
 *
 * @param panels - An array containing the `panel` objects you want to update.
 */
const reconcileOutputProperties = function (panels) {
  panels.forEach(function (panel) {
    const outputVoltage = 12,
      outputCurrentToInputRadianceRatio = 0.1348,
      outputCurrent = panel.inputRadiance * outputCurrentToInputRadianceRatio;

    panel.outputVoltage = (panel.enabled ? outputVoltage : 0);
    panel.outputCurrent = (panel.enabled ? outputCurrent : 0);
  });
};

/**
 * Updates the `panels` portion of the Redux state according to the type of the action passed in.
 *
 * @param panels
 * @param action
 * @returns {*}
 */
const panelsReducer = function (panels, action) {
  let nextPanels;

  // Initialize the `panels` array if it is `undefined`.
  if (panels === undefined) {
    panels = [
      {
        id: '1',
        enabled: true,
        inputRadiance: 0.25,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      {
        id: '2',
        enabled: true,
        inputRadiance: 0.35,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      {
        id: '3',
        enabled: false,
        inputRadiance: 0.64,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      {
        id: '4',
        enabled: true,
        inputRadiance: 0.14,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      {
        id: '5',
        enabled: true,
        inputRadiance: 0.85,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      {
        id: '6',
        enabled: true,
        inputRadiance: 0.64,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      {
        id: '7',
        enabled: true,
        inputRadiance: 0.13,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      {
        id: '8',
        enabled: true,
        inputRadiance: 0.12,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      }
    ];
    reconcileOutputProperties(panels);
  }

  switch (action.type) {
    case 'ENABLE_PANELS':
      nextPanels = clonePanels(panels);
      enablePanels(action.panelIds, nextPanels);
      reconcileOutputProperties(nextPanels);
      break;

    case 'DISABLE_PANELS':
      nextPanels = clonePanels(panels);
      disablePanels(action.panelIds, nextPanels);
      reconcileOutputProperties(nextPanels);
      break;

    default:
      nextPanels = panels;
      break;
  }

  return nextPanels;
};

export default panelsReducer;