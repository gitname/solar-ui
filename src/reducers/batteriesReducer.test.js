import {_initialBatteries} from './batteriesReducer';

describe('_initialBatteries', function () {

  test('batteries are initialized', () => {
    expect(_initialBatteries.length).toBe(3);
    expect(_initialBatteries[0].energyCapacityKWh).toBe(13.5);
    expect(_initialBatteries[2].energyCapacityKWh).toBe(6.4);
  });

});