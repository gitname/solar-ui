import {
  clonePanels,
  _enableDisablePanels,
  _reconcilePanelProperties,
  _outputVoltageVSetting,
  _outputCurrentA_to_inputRadianceKWM2_ratio,
  updateInputRadiances
} from './panelsHelpers';

describe('clonePanels()', function () {

  let array, newArray;

  beforeEach(() => {
    array = [
      {id: '1', enabled: true, inputRadianceKWM2: 1, outputVoltageV: null, outputCurrentA: null},
      {id: '2', enabled: false, inputRadianceKWM2: 2, outputVoltageV: null, outputCurrentA: null}
    ];
    newArray = clonePanels(array);
  });

  test('new array is distinct from original array', () => {
    expect(newArray).not.toBe(array);
  });

  test('elements of new array are distinct copies of elements of original array', () => {
    newArray.forEach(function (element, index) {
      expect(newArray[index]).toEqual(array[index]);
      expect(newArray[index]).not.toBe(array[index]);
    });
  });

});

describe('_enableDisablePanels()', function () {

  let array;

  beforeEach(() => {
    array = [
      {id: '1', enabled: false, inputRadianceKWM2: 1, outputVoltageV: null, outputCurrentA: null},
      {id: '2', enabled: false, inputRadianceKWM2: 2, outputVoltageV: null, outputCurrentA: null},
      {id: '3', enabled: true, inputRadianceKWM2: 3, outputVoltageV: null, outputCurrentA: null},
      {id: '4', enabled: true, inputRadianceKWM2: 4, outputVoltageV: null, outputCurrentA: null}
    ];
  });

  test('enables the specified panels', () => {
    _enableDisablePanels(array, ['2', '3'], true);
    expect(array[0].enabled).toBe(false);
    expect(array[1].enabled).toBe(true);
    expect(array[2].enabled).toBe(true);
    expect(array[3].enabled).toBe(true);
  });

  test('disables the specified panels', () => {
    _enableDisablePanels(array, ['2', '3'], false);
    expect(array[0].enabled).toBe(false);
    expect(array[1].enabled).toBe(false);
    expect(array[2].enabled).toBe(false);
    expect(array[3].enabled).toBe(true);
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

describe('updateInputRadiances()', function () {

  let array, newInputRadiancesByPanelId = [];

  beforeEach(() => {
    array = [
      {id: '1', enabled: true, inputRadianceKWM2: 2, outputVoltageV: null, outputCurrentA: null},
      {id: '2', enabled: false, inputRadianceKWM2: 4, outputVoltageV: null, outputCurrentA: null},
      {id: '3', enabled: false, inputRadianceKWM2: 6, outputVoltageV: null, outputCurrentA: null}
    ];
    newInputRadiancesByPanelId['1'] = 111;
    newInputRadiancesByPanelId['2'] = 222;
    newInputRadiancesByPanelId['4'] = 444;
    updateInputRadiances(array, newInputRadiancesByPanelId);
  });

  test('updates input radiances of specified panels to the values passed in', () => {
    expect(array[0].inputRadianceKWM2).toBe(111);
    expect(array[1].inputRadianceKWM2).toBe(222);
    expect(array[2].inputRadianceKWM2).toBe(6);
  });

});

