/**
 * Helpers and tools to ease your JavaScript day.
 *
 * @author Mattias Eriksson (g10mater@student.his.se)
 */
window.en4fil = (function(window, document, undefined ) {

  var en4fil = {};
  /**
   * Generate a random number.
   * @param min the smallest possible number
   * @param max the largest possible number
   * @returns a random number where min >= number <= max
   */
  en4fil.random = function (min, max) {
    return Math.floor(Math.random()*(max+1-min)+min);
  };

  return en4fil;
  
})(window, window.document);
