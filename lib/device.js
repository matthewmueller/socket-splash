/**
 * Module dependencies
 */

var domify = require('domify'),
    classes = require('classes'),
    parse = require('user-agent-parser'),
    html = require('../templates/device');

/**
 * Window.location
 */

var location = window.location;

/**
 * Export `Device`
 */

module.exports = Device;

/**
 * All Devices
 */

var devices = [];

/**
 * Initialize `Device`
 */

function Device(name, type, uid) {
  if(!(this instanceof Device)) return new Device(name, type, uid);
  this.name = name;
  this.type = type || name;
  this.uid = uid;
  this.el = domify(html)[0];

  this.el.querySelector('.title').innerHTML = name;

  var url = location.origin + location.pathname + '#' + uid;
  this.el.querySelector('.url').innerHTML = url

  this.classes = classes(this.el);
  devices.push(this);
}

/**
 * Ready
 */

Device.ready = function() {
  var ua = parse(window.navigator.userAgent),
      type = ua.device.type || 'desktop',
      device;

  for (var i = 0, len = devices.length; i < len; i++) {
    device = devices[i];
    if(type == device.type) device.classes.add('ready');
  };
};
