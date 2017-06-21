/**
 * Returns a random number between `min` and `max`, including `min`, but not including `max`.
 *
 * @param min
 * @param max
 * @returns {*}
 */
const getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

/**
 * Returns a random number between `min` and `max`, including `min`, but not including `max`; where the number is
 * no further away from `nominal` than `margin` is.
 *
 * @param min
 * @param max
 * @param nominal
 * @param margin
 * @returns {*}
 */
export const getNearbyRandomNumber = function (min, max, nominal, margin) {
  let belowNominal,
    aboveNominal,
    rangeMin,
    rangeMax;

  belowNominal = nominal - margin;
  aboveNominal = nominal + margin;
  rangeMin = (belowNominal < min) ? min : belowNominal;
  rangeMax = aboveNominal > max ? max : aboveNominal;
  return getRandomNumber(rangeMin, rangeMax);
};