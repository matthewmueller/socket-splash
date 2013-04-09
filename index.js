/**
 * Module dependencies
 */

var uid = require('uid'),
    domify = require('domify'),
    classes = require('classes'),
    html = require('./templates/splash'),
    deviceTemplate = domify(require('./templates/device'))[0];

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
 * @return {Splash}
 * @api public
 */

function Splash(title) {
  if(!(this instanceof Splash)) return new Splash(title);
  this.el = domify(html)[0];
  this.title(title);
  this.devices = [];

  if(hash) {
    this.uid = hash.slice(1);
  } else {
    this.uid = uid(4);
  }
}

/**
 * Add a title to the splash screen
 *
 * @param {String} title
 * @return {Splash}
 * @api public
 */

Splash.prototype.title = function(title) {
  title = title || ''
  this.el.querySelector('.title').innerHTML = title;
  return this;
};

/**
 * Add a description to the splash screen
 *
 * @param {String} desc
 * @return {Splash}
 * @api public
 */

Splash.prototype.desc = function(desc) {
  desc = desc || '';
  this.el.querySelector('.desc').innerHTML = desc;
  return this;
}

/**
 * Add a device
 *
 * @param {Device} d
 * @return {Splash}
 * @api public
 */

Splash.prototype.add = function(device) {
  var self = this,
      template = deviceTemplate.cloneNode(true),
      name = device.name,
      type = device.type;

  // normalize with ligature
  type = ('desktop' == type) ? 'computer' : type;

  // Add template to frontend
  template.querySelector('.type').innerHTML = type;
  template.querySelector('.title').innerHTML = name;
  classes(template).add(name);
  this.el.appendChild(template);

  // Add to devices array
  this.devices.push(name);

  // message between all clients, when ready emit ready to other clients
  // each client that recieves it, should send a non-propagating ready
  // event back to the device that just became ready, so it can update
  // it's view
  device.ready(function() {
    classes(template).add('ready');
    ready(device.name);
    device.emit('ready', device.name, true);

    device.io.socket.on('close', function() {
      var template = self.el.querySelector('.device.' + name);
      classes(template).remove('ready');
      self.devices.push(name);
    });
  });

  device.on('ready', function(name, propagate) {
    var template = self.el.querySelector('.device.' + name);
    classes(template).add('ready');
    ready(name);
    if(propagate) this.emit('ready', device.name, false);
  });

  function ready(name) {
    var i = self.devices.indexOf(name);
    if(~i) self.devices.splice(i, 1);
    if(!self.devices.length) self.onready();
  }

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
  this.fn = fn || function() {};

  var devices = this.el.querySelectorAll('.device');

  for (var i = 0, len = devices.length; i < len; i++) {
    classes(devices[i]).add('col-1-' + len);
  };

  document.body.appendChild(this.el);
  return this;
};

/**
 * When ready
 */

Splash.prototype.onready = function() {
  classes(this.el).add('hide');
  this.fn();
};
