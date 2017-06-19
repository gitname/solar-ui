const panelEnablementReducer = function (enabledPanelIds = [], action) {
  let nextEnabledPanelIds = enabledPanelIds.concat(),
    panelIds = action.panelIds;

  switch (action.type) {
    // If the action is 'ENABLE', add each specified panel ID to the new array of enabled panel IDs.
    case 'ENABLE':
      for (let i = 0; i < panelIds.length; i++) {
        const panelId = panelIds[i];
        if (nextEnabledPanelIds.indexOf(panelId) === -1) {
          nextEnabledPanelIds.push(panelId);
        }
      }
      break;
    // If the action is 'DISABLE', remove each specified panel ID from the new array of enabled panel IDs.
    case 'DISABLE':
      for (let i = 0; i < panelIds.length; i++) {
        const panelId = panelIds[i];
        if (nextEnabledPanelIds.indexOf(panelId) !== -1) {
          nextEnabledPanelIds.splice(nextEnabledPanelIds.indexOf(panelId, 1));
        }
      }
      break;
    // If the action is unrecognized, reference the original array of enabled panel IDs.
    default:
      nextEnabledPanelIds = enabledPanelIds;
      break;
  }

  return nextEnabledPanelIds;
};

export default panelEnablementReducer;