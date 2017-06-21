import {
  clonePanels,
  _enableDisablePanels,
  _reconcilePanelProperties,
  _outputVoltageV,
  _outputCurrentA_to_inputRadianceWM2_ratio,
  updateInputRadiances
} from './panelsHelpers';

describe('clonePanels()', function () {

  let array, newArray;

  beforeEach(() => {
    array = [
      {a: 1},
      {b: 2}
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
      {id: '1', enabled: false},
      {id: '2', enabled: false},
      {id: '3', enabled: true},
      {id: '4', enabled: true},
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
    let panel = {id: '1', enabled: true, inputRadiance: 10, outputVoltage: null, outputCurrent: null};
    _reconcilePanelProperties(panel);
    expect(panel.outputVoltage).toBe(_outputVoltageV);
    expect(panel.outputCurrent).toBe(10 * _outputCurrentA_to_inputRadianceWM2_ratio);
  });

  test('sets the output voltage and output current of a disabled panel to 0', () => {
    let panel = {id: '1', enabled: false, inputRadiance: 10, outputVoltage: null, outputCurrent: null};
    _reconcilePanelProperties(panel);
    expect(panel.outputVoltage).toBe(0);
    expect(panel.outputCurrent).toBe(0);
  });

});

describe('updateInputRadiances()', function () {

  let array, newInputRadiancesByPanelId = [];

  beforeEach(() => {
    array = [
      {id: '1', enabled: true, inputRadiance: 2, outputVoltage: null, outputCurrent: null},
      {id: '2', enabled: false, inputRadiance: 4, outputVoltage: null, outputCurrent: null},
      {id: '3', enabled: false, inputRadiance: 6, outputVoltage: null, outputCurrent: null}
    ];
    newInputRadiancesByPanelId['1'] = 111;
    newInputRadiancesByPanelId['2'] = 222;
    newInputRadiancesByPanelId['4'] = 444;
    updateInputRadiances(array, newInputRadiancesByPanelId);
  });

  test('updates input radiances of specified panels to the values passed in', () => {
    expect(array[0].inputRadiance).toBe(111);
    expect(array[1].inputRadiance).toBe(222);
    expect(array[2].inputRadiance).toBe(6);
  });

});

