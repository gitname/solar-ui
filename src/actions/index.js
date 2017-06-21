export const toggleSidebarVisibility = function () {
  // Note: I created this variable in an attempt to clarify for the reader, what--in terms of Redux concepts--this function returns.
  let action = {
    type: 'TOGGLE_SIDEBAR_VISIBILITY'
  };
  return action;
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