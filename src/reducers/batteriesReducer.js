import {
  cloneBatteries,
  updateStoredEnergies
} from './lib/batteriesHelpers';

export const _initialBatteries = (function () {
  return [
    {
      id: '1',
      energyCapacityKWh: 13.5,
      storedEnergyKWh: 8.1
    },
    {
      id: '2',
      energyCapacityKWh: 13.5,
      storedEnergyKWh: 11.61
    },
    {
      id: '3',
      energyCapacityKWh: 6.4,
      storedEnergyKWh: 1.13
    }
  ];
})();

/**
 * Updates the `batteries` portion of the Redux state according to the action passed in.
 *
 * @param batteries
 * @param action
 * @returns {*}
 */
const batteriesReducer = function (batteries = _initialBatteries, action = {}) {
  let nextBatteries;

  switch (action.type) {

    case 'UPDATE_STORED_ENERGIES':
      nextBatteries = cloneBatteries(batteries);
      updateStoredEnergies(nextBatteries, action.payload.newStoredEnergiesByBatteryId);
      break;

    default:
      nextBatteries = batteries;
      break;
  }

  return nextBatteries;
};

export default batteriesReducer;