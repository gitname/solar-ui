import {
  clonePanelCollection,
  _enableDisablePanels,
  _reconcilePanelProperties,
  _outputVoltageVSetting,
  _outputCurrentA_to_inputRadianceKWM2_ratio,
  getIdentifiedPanelsDescription,
  _containsAllPanelIds,
  updateInputRadiances
} from './panelCollectionHelpers';

describe('clonePanelCollection()', function () {

  let panelCollection, newPanelCollection;

  beforeEach(() => {
    panelCollection = {
      panels: [
        {id: '1', enabled: false, inputRadianceKWM2: 1, outputVoltageV: null, outputCurrentA: null},
        {id: '2', enabled: false, inputRadianceKWM2: 2, outputVoltageV: null, outputCurrentA: null},
        {id: '3', enabled: true, inputRadianceKWM2: 3, outputVoltageV: null, outputCurrentA: null}
      ],
      events: [
        {timestamp: null, summary: 'You disabled panel 1.'},
        {timestamp: null, summary: 'You disabled panel 2.'},
        {timestamp: null, summary: 'You enabled panel 3.'}
      ]
    };
    newPanelCollection = clonePanelCollection(panelCollection);
  });

  test('new panel collection is distinct from original panel collection', () => {
    expect(newPanelCollection).not.toBe(panelCollection);
  });

  test('new panel collection matches original panel collection', () => {
    expect(newPanelCollection).toMatchObject(panelCollection);
  });

});

describe('_enableDisablePanels()', function () {

  let panels;

  beforeEach(() => {
    panels = [
      {id: '1', enabled: false, inputRadianceKWM2: 1, outputVoltageV: null, outputCurrentA: null},
      {id: '2', enabled: false, inputRadianceKWM2: 2, outputVoltageV: null, outputCurrentA: null},
      {id: '3', enabled: true, inputRadianceKWM2: 3, outputVoltageV: null, outputCurrentA: null},
      {id: '4', enabled: true, inputRadianceKWM2: 4, outputVoltageV: null, outputCurrentA: null}
    ];
  });

  test('enables the specified panels', () => {
    _enableDisablePanels(panels, ['2', '3'], true);
    expect(panels[0].enabled).toBe(false);
    expect(panels[1].enabled).toBe(true);
    expect(panels[2].enabled).toBe(true);
    expect(panels[3].enabled).toBe(true);
  });

  test('disables the specified panels', () => {
    _enableDisablePanels(panels, ['2', '3'], false);
    expect(panels[0].enabled).toBe(false);
    expect(panels[1].enabled).toBe(false);
    expect(panels[2].enabled).toBe(false);
    expect(panels[3].enabled).toBe(true);
  });

});

describe('_reconcilePanelProperties()', function () {

  test('calculates the output voltage and output current of an enabled panel', () => {
    let panel = {id: '1', enabled: true, inputRadianceKWM2: 10, outputVoltageV: null, outputCurrentA: null};
    _reconcilePanelProperties(panel);
    expect(panel.outputVoltageV).toBe(_outputVoltageVSetting);
    expect(panel.outputCurrentA).toBe(10 * _outputCurrentA_to_inputRadianceKWM2_ratio);
  });

  test('sets the output voltage and output current of a disabled panel to 0', () => {
    let panel = {id: '1', enabled: false, inputRadianceKWM2: 10, outputVoltageV: null, outputCurrentA: null};
    _reconcilePanelProperties(panel);
    expect(panel.outputVoltageV).toBe(0);
    expect(panel.outputCurrentA).toBe(0);
  });

});

describe('_containsAllPanelIds()', function () {

  let panels;

  beforeEach(() => {
    panels = [
      {id: '1', enabled: true, inputRadianceKWM2: 2, outputVoltageV: null, outputCurrentA: null},
      {id: '2', enabled: false, inputRadianceKWM2: 4, outputVoltageV: null, outputCurrentA: null},
      {id: '3', enabled: false, inputRadianceKWM2: 6, outputVoltageV: null, outputCurrentA: null}
    ];
  });

  test('detects the inclusion of all panel IDs', () => {
    expect(_containsAllPanelIds(panels, ['1', '2', '3'])).toBe(true);
  });

  test('detects the exclusion of some panel IDs', () => {
    expect(_containsAllPanelIds(panels, ['1', '3'])).toBe(false);
  });

});

describe('getIdentifiedPanelsDescription()', function () {

  let panels;

  beforeEach(() => {
    panels = [
      {id: '1', enabled: true, inputRadianceKWM2: 2, outputVoltageV: null, outputCurrentA: null},
      {id: '2', enabled: false, inputRadianceKWM2: 4, outputVoltageV: null, outputCurrentA: null},
      {id: '3', enabled: false, inputRadianceKWM2: 6, outputVoltageV: null, outputCurrentA: null}
    ];
  });

  test('describes the identification of all panels', () => {
    expect(getIdentifiedPanelsDescription(panels, ['1', '2', '3'])).toBe('all panels');
  });

  test('describes the identification of multiple panels', () => {
    expect(getIdentifiedPanelsDescription(panels, ['1', '3'])).toBe('panels 1, 3');
  });

  test('describes the identification of a single panel', () => {
    expect(getIdentifiedPanelsDescription(panels, ['3'])).toBe('panel 3');
  });

});

describe('updateInputRadiances()', function () {

  let panels, newInputRadiancesByPanelId = [];

  beforeEach(() => {
    panels = [
      {id: '1', enabled: true, inputRadianceKWM2: 2, outputVoltageV: null, outputCurrentA: null},
      {id: '2', enabled: false, inputRadianceKWM2: 4, outputVoltageV: null, outputCurrentA: null},
      {id: '3', enabled: false, inputRadianceKWM2: 6, outputVoltageV: null, outputCurrentA: null}
    ];
    newInputRadiancesByPanelId['1'] = 111;
    newInputRadiancesByPanelId['2'] = 222;
    newInputRadiancesByPanelId['4'] = 444;
    updateInputRadiances(panels, newInputRadiancesByPanelId);
  });

  test('updates input radiances of specified panels to the values passed in', () => {
    expect(panels[0].inputRadianceKWM2).toBe(111);
    expect(panels[1].inputRadianceKWM2).toBe(222);
    expect(panels[2].inputRadianceKWM2).toBe(6);
  });

});