const panelEnablementReducer = function (enabledPanelIds = [1, 2, 4, 5, 6, 7, 8], action) {
  let nextEnabledPanelIds,
    panelIds;

  // Create a copy of the original enabled panel IDs array, so that we do not mutate the original one.
  nextEnabledPanelIds = enabledPanelIds.concat();

  // Retrieve the array of panel IDs we want to enable or disable.
  panelIds = action.panelIds;

  switch (action.type) {
    case 'ENABLE_PANELS':
      // For each specified panel ID, if it doesn't already exist in the new enabled panel IDs array, add it to that array.
      for (let i = 0; i < panelIds.length; i++) {
        const panelId = panelIds[i],
          panelIdIndex = nextEnabledPanelIds.indexOf(panelId);

        if (panelIdIndex === -1) {
          nextEnabledPanelIds.push(panelId);
        }
      }
      break;
    case 'DISABLE_PANELS':
      // For each specified panel ID, if it exists in the new enabled panel IDs array, remove it from that array.
      for (let i = 0; i < panelIds.length; i++) {
        const panelId = panelIds[i],
          panelIdIndex = nextEnabledPanelIds.indexOf(panelId);

        if (panelIdIndex !== -1) {
          nextEnabledPanelIds.splice(panelIdIndex, 1);
        }
      }
      break;
    default:
      // If we don't recognize the action, ensure we return the same array that was passed in.
      nextEnabledPanelIds = enabledPanelIds;
      break;
  }

  return nextEnabledPanelIds;
};

export default panelEnablementReducer;