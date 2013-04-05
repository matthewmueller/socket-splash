/**
 * Module dependencies
 */

var uid = require('uid'),
    domify = require('domify'),
    IO = require('io'),
    html = require('./templates/splash'),
    device = require('./lib/device');

/**
 * Get the current hash
 */

var hash = window.location.hash;

/**
 * Export `Splash`
 */

module.exports = Splash;

/**
 * Initialize `Splash`
 *
 * @param {IO} io
 * @return {Splash}
 * @api public
 */

function Splash() {
  if(!(this instanceof Splash)) return new Splash(io);
  this.el = domify(html)[0];

  if(hash) {
    this.uid = hash.slice(1);
  } else {
    this.uid = uid(4);
  }
}

/**
 * Add a device
 *
 * @param {String} name
 * @return {Splash}
 * @api public
 */

Splash.prototype.device = function(name, type) {
  var d = device(name, type, this.uid);
  this.el.appendChild(d.el);
  return this;
};

/**
 * Ready
 *
 * @param {Function} fn
 * @return {Splash}
 * @api public
 */

Splash.prototype.ready = function(fn) {
  device.ready();
  document.body.appendChild(this.el);
  return this;
};
