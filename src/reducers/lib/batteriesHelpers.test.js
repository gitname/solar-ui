import {
  cloneBatteries,
  updateStoredEnergies
} from './batteriesHelpers';

describe('cloneBatteries()', function () {

  let array, newArray;

  beforeEach(() => {
    array = [
      {id: '1', enabled: true, storedEnergyKWh: 2, energyCapacityKWh: 5},
      {id: '2', enabled: false, storedEnergyKWh: 4, energyCapacityKWh: 6}
    ];
    newArray = cloneBatteries(array);
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

describe('updateStoredEnergies()', function () {

  let array, newStoredEnergiesByBatteryId = [];

  beforeEach(() => {
    array = [
      {id: '1', enabled: true, storedEnergyKWh: 2, energyCapacityKWh: 5},
      {id: '2', enabled: false, storedEnergyKWh: 4, energyCapacityKWh: 6},
      {id: '3', enabled: false, storedEnergyKWh: 6, energyCapacityKWh: 7}
    ];
    newStoredEnergiesByBatteryId['1'] = 3;
    newStoredEnergiesByBatteryId['3'] = 7;
    updateStoredEnergies(array, newStoredEnergiesByBatteryId);
  });

  test('updates stored energies of specified batteries to the values passed in', () => {
    expect(array[0].storedEnergyKWh).toBe(3);
    expect(array[1].storedEnergyKWh).toBe(4);
    expect(array[2].storedEnergyKWh).toBe(7);
  });

});

