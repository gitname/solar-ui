export const _outputVoltageVSetting = 24;
export const _outputCurrentA_to_inputRadianceKWM2_ratio = 4.5; // outputCurrent [A] ÷ inputRadiance [kW/m²]

/**
 * Clones a `panelCollection` object.
 *
 * @param panelCollection - The `panelCollection` object you want to clone.
 * @return {{panels: Array, events: Array}} - The new `panelCollection` object.
 */
export const clonePanelCollection = function (panelCollection = {panels: [], events: []}) {
  return {
    panels: panelCollection.panels.map((panel) => ({...panel})),
    events: panelCollection.events.map((event) => ({...event}))
  };
};

/**
 * Enables or disables `panel` objects.
 *
 * @param panels - Array containing the `panel` objects.
 * @param panelIds - Array containing the ID of each `panel` object you want to enable or disable.
 * @param enable - Boolean indicating whether to enable (true) or disable (false) the panels.
 * @private
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
 * @private
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

/**
 * Returns a string that describes which panels (out of those in `panels`) are identified by `panelIds`.
 *
 * @param panels
 * @param panelIds
 * @return {string}
 */
export const getIdentifiedPanelsDescription = function (panels, panelIds) {
  const identifiesAllPanels = _containsAllPanelIds(panels, panelIds);
  let description;
  if (identifiesAllPanels) {
    description = 'all panels';
  } else {
    description = (panelIds.length === 1 ? 'panel ' : 'panels ') + panelIds.join(', ');
  }
  return description;
};

/**
 * Returns `true` if `panelIds` contains the ID of each panel in `panels`; otherwise returns `false`.
 *
 * @param panels
 * @param panelIds
 * @return {boolean|*}
 * @private
 */
export const _containsAllPanelIds = function (panels, panelIds) {
  return panels.every((panel) => {
    return (panelIds.indexOf(panel.id) !== -1);
  });
};

/**
 * Modifies the `events` array passed in, by removing its first element and appending `newEvent` to the `events` array.
 *
 * @param events
 * @param newEvent
 */
export const addEvent = function (events, newEvent) {
  events.shift();
  events.push(newEvent);
};