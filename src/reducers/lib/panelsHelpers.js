export const _outputVoltageVSetting = 24;
export const _outputCurrentA_to_inputRadianceKWM2_ratio = 4.5; // outputCurrent [A] ÷ inputRadiance [kW/m²]

/**
 * Clones an array of `panel` objects.
 *
 * @param panels - The array you want to clone.
 * @returns [] - The new array.
 */
export const clonePanels = function (panels = []) {
  return panels.map((panel) => ({...panel}));
};

/**
 * Enables or disables `panel` objects.
 *
 * @param panels - Array containing the `panel` objects.
 * @param panelIds - Array containing the ID of each `panel` object you want to enable or disable.
 * @param enable - Boolean indicating whether to enable (true) or disable (false) the panels.
 */
export const _enableDisablePanels = function (panels = [], panelIds = [], enable = true) {
  panels.forEach((panel) => {
    if (panelIds.indexOf(panel.id) !== -1) {
      panel.enabled = (enable === true);
      _reconcilePanelProperties(panel);
    }
  });
};

/**
 * Enables `panel` objects.
 *
 * @param panels - Array containing the `panel` objects.
 * @param panelIds - Array containing the ID of each `panel` object you want to enable.
 */
export const enablePanels = function (panels = [], panelIds = []) {
  _enableDisablePanels(panels, panelIds, true);
};

/**
 * Disables `panel` objects.
 *
 * @param panels - Array containing the `panel` objects.
 * @param panelIds - Array containing the ID of each `panel` object you want to enable.
 */
export const disablePanels = function (panels = [], panelIds = []) {
  _enableDisablePanels(panels, panelIds, false);
};

/**
 * Reconciles specific properties of a `panel` object with other properties of that `panel` object.
 *
 * Note: If we were using a real-life solar panel system, we would not need to do this, as the properties would be
 * naturally reconciled (i.e. by the laws of physics) by the time the client received them. However, with this being a
 * simulation in which all logic is in the client, and in which we can update individual properties that would, in
 * real-life, instantly affect other properties, we reconcile them (i.e. apply those effects) here.
 *
 * @param panel - The `panel` object.
 */
export const _reconcilePanelProperties = function (panel) {
  const outputCurrentA = panel.inputRadianceKWM2 * _outputCurrentA_to_inputRadianceKWM2_ratio;
  panel.outputVoltageV = (panel.enabled ? _outputVoltageVSetting : 0);
  panel.outputCurrentA = (panel.enabled ? outputCurrentA : 0);
};

/**
 * Updates the `inputRadianceKWM2` property value of each `panel` object for which a new value is provided.
 *
 * @param panels - Array containing the `panel` objects.
 * @param newInputRadiancesByPanelId - Array containing `inputRadianceKWM2` values, indexed by panel ID.
 */
export const updateInputRadiances = function (panels, newInputRadiancesByPanelId) {
  const panelIds = Object.keys(newInputRadiancesByPanelId);
  panels.forEach((panel) => {
    if (panelIds.indexOf(panel.id) !== -1) {
      panel.inputRadianceKWM2 = newInputRadiancesByPanelId[panel.id];
      _reconcilePanelProperties(panel);
    }
  });
};