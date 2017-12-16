//
// Utilities
//


/**
 * Replace all instances of a pattern
 *
 * @param  {String} search           Search pattern
 * @param  {String} [replacement=''] Replace pattern with this
 * @return {String}                  Modified string
 */
String.prototype.replaceAll = function(search, replacement = '') {
  return this.replace(new RegExp(search, 'g'), replacement);
};

/**
 * Removes a single leading slash and one or more trailing slashes
 *
 * @return {String}
 */
String.prototype.trimSlashes = function() {
  return this.replace(/^\/|\/+$/g, '');
};
