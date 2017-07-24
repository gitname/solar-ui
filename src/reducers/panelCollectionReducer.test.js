import {_initialPanelCollection} from './panelCollectionReducer';

describe('_initialPanelCollection', function () {

  test('panels are initialized', () => {
    const panels = _initialPanelCollection.panels;
    expect(panels.length).toBe(8);
    expect(panels[2].enabled).toBe(false); // Panel with ID of '3'
    expect(panels[3].enabled).toBe(true); // Panel with ID of '4'
    expect(panels[6].inputRadianceKWM2).toBe(0.13); // Panel with ID of '7'
  });

});