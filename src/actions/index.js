// Each of these functions returns a Redux action.

export const toggleSidebarVisibility = function () {
  return {
    type: 'TOGGLE_SIDEBAR_VISIBILITY'
  };
};

export const enablePanels = function (panelIds) {
  return {
    type: 'ENABLE_PANELS',
    payload: {
      panelIds: panelIds
    }
  };
};

export const disablePanels = function (panelIds) {
  return {
    type: 'DISABLE_PANELS',
    payload: {
      panelIds: panelIds
    }
  };
};

export const updateInputRadiances = function (newInputRadiances) {
  return {
    type: 'UPDATE_INPUT_RADIANCES',
    payload: {
      newInputRadiances: newInputRadiances
    }
  };
};

export const updateStoredEnergies = function (newStoredEnergiesByBatteryId) {
  return {
    type: 'UPDATE_STORED_ENERGIES',
    payload: {
      newStoredEnergiesByBatteryId: newStoredEnergiesByBatteryId
    }
  };
};