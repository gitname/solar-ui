import {_initialPanels} from './panelsReducer';

describe('_initialPanels', function () {

  test('panels are initialized', () => {
    expect(_initialPanels.length).toBe(8);
    expect(_initialPanels[2].enabled).toBe(false); // Panel with ID of '3'
    expect(_initialPanels[3].enabled).toBe(true); // Panel with ID of '4'
    expect(_initialPanels[6].inputRadiance).toBe(0.13); // Panel with ID of '7'
  });

});