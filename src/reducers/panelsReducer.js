/**
 * Clones a `panel` object.
 *
 * @param panel - The `panel` object you want to clone.
 * @returns {{enabled, inputRadiance: (number|*), outputVoltage: number, outputCurrent: (number|*), inverterId: (string|*|number)}} - The new `panel` object.
 */
const clonePanel = function (panel) {
  return {
    enabled: panel.enabled,
    inputRadiance: panel.inputRadiance,
    outputVoltage: panel.outputVoltage,
    outputCurrent: panel.outputCurrent,
    inverterId: panel.inverterId
  };
};

/**
 * Clones a `panels` object.
 *
 * @param panels - The `panels` object you want to clone.
 * @returns {{}} - The new `panels` object.
 */
const clonePanels = function (panels) {
  const panelIds = Object.keys(panels),
    clone = {};

  panelIds.forEach(function (panelId) {
    const panel = panels[panelId];
    clone[panelId] = clonePanel(panel);
  });
  return clone;
};

/**
 * Enables one or more `panel` objects.
 *
 * @param targetPanelIds - An array containing the ID of each `panel` object you want to enable.
 * @param panels - The `panels` object containing the `panel` objects you want to enable.
 */
const enablePanels = function (targetPanelIds, panels) {
  const panelIds = Object.keys(panels);

  panelIds.forEach(function (panelId) {
    if (targetPanelIds.indexOf(panelId) !== -1) {
      panels[panelId].enabled = true;
    }
  });
};

/**
 * Disables one or more `panel` objects.
 *
 * @param targetPanelIds - An array containing the ID of each `panel` object you want to disable.
 * @param panels - The `panels` object containing the `panel` objects you want to disable.
 */
const disablePanels = function (targetPanelIds, panels) {
  const panelIds = Object.keys(panels);

  panelIds.forEach(function (panelId) {
    if (targetPanelIds.indexOf(panelId) !== -1) {
      panels[panelId].enabled = false;
    }
  });
};

/**
 * Updates the 'output' properties so they're mathematically consistent with the 'input' properties,
 * of each `panel` object in the `panels` object passed in.
 *
 * Note: In real life, both the 'input' and 'output' values might originate at some hardware sensors, be processed by a
 * server, and be provided to the web client via a REST API. However, since this is only a simulation of a solar panel
 * system, I'm calculating the 'output' values here, in the web client itself.
 *
 * @param panels - The `panels` object you want to update.
 */
const reconcileOutputProperties = function (panels) {
  const panelIds = Object.keys(panels);

  panelIds.forEach(function (panelId) {
    const panel = panels[panelId],
      outputVoltage = 12,
      outputCurrentToInputRadianceRatio = 0.1348;

    panel.outputVoltage = (panel.enabled ? outputVoltage : 0);
    panel.outputCurrent = (panel.enabled ? panel.inputRadiance * outputCurrentToInputRadianceRatio : 0);
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

  if (panels === undefined) {
    panels = {
      '1': {
        enabled: true,
        inputRadiance: 0.25,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      '2': {
        enabled: true,
        inputRadiance: 0.35,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      '3': {
        enabled: false,
        inputRadiance: 0.64,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      '4': {
        enabled: true,
        inputRadiance: 0.14,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      '5': {
        enabled: true,
        inputRadiance: 0.85,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      '6': {
        enabled: true,
        inputRadiance: 0.64,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      '7': {
        enabled: true,
        inputRadiance: 0.13,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      },
      '8': {
        enabled: true,
        inputRadiance: 0.12,
        outputVoltage: null,
        outputCurrent: null,
        inverterId: '1'
      }
    };
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