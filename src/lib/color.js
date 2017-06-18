/**
 * Initializes a Color instance with the RGBA (i.e. red, green, blue, alpha) values in the array passed in.
 *
 * If any of those RGBA values are undefined, the corresponding property of the Color instance will be initialized to
 * either 255 (for R, G, B) or to 1 (for A).
 *
 * Returns the initialized Color instance.
 *
 * @param rgbaValues
 * @returns {Color}
 * @constructor
 */
const Color = function (rgbaValues) {
  this.red = (rgbaValues[0] !== undefined) ? rgbaValues[0] : 255;
  this.green = (rgbaValues[1] !== undefined) ? rgbaValues[1] : 255;
  this.blue = (rgbaValues[2] !== undefined) ? rgbaValues[2] : 255;
  this.alpha = (rgbaValues[3] !== undefined) ? rgbaValues[3] : 1;
  return this;
};

/**
 * Returns a string representing the calling Color instance, formatted according to the format descriptor passed in.
 *
 * @param formatDescriptor
 * @returns {string}
 */
Color.prototype.toString = function (formatDescriptor) {
  let string = '';

  switch (formatDescriptor) {
    case 'rgb':
      string = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
      break;
    case 'rgba':
      string = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.alpha + ')';
      break;
    default:
      string = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.alpha + ')';
      break;
  }
  return string;
};

/**
 * Returns a new Color instance whose RGB values equal those of the calling color instance, and whose alpha value equals
 * the alpha value passed in.
 *
 * @param alpha
 * @returns {Color}
 */
Color.prototype.setAlpha = function (alpha) {
  return new Color([this.red, this.green, this.blue, alpha]);
};

// Define some colors.
const palette = {
  lightGray: new Color([163, 163, 163]),
  midGray: new Color([118, 118, 118]),
  darkGray: new Color([66, 66, 66]),
  lightGreen: new Color([65, 198, 94]),
  midGreen: new Color([33, 186, 67]),
  darkGreen: new Color([7, 159, 41]),
  lightRed: new Color([236, 81, 81]),
  midRed: new Color([219, 40, 40]),
  darkRed: new Color([177, 18, 18])
};

export default palette;