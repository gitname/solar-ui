/**
 * Clones an array of `battery` objects.
 *
 * @param batteries - The array you want to clone.
 * @returns [] - The new array.
 */
export const cloneBatteries = function (batteries = []) {
  return batteries.map((battery) => ({...battery}));
};

/**
 * Updates the `storedEnergyKWh` property value of each `battery` object for which a new value is provided.
 *
 * @param batteries - Array containing the `battery` objects.
 * @param newStoredEnergiesByBatteryId - Array containing `storedEnergyKWh` values, indexed by battery ID.
 */
export const updateStoredEnergies = function (batteries, newStoredEnergiesByBatteryId) {
  const batteryIds = Object.keys(newStoredEnergiesByBatteryId);
  batteries.forEach((battery) => {
    if (batteryIds.indexOf(battery.id) !== -1) {
      battery.storedEnergyKWh = newStoredEnergiesByBatteryId[battery.id];
    }
  });
};