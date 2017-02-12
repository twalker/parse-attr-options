'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.parse = parse;
exports.parseValue = parseValue;
exports.stringify = stringify;
exports.stringifyValue = stringifyValue;
function parse(sOptions) {
  var opts = {};
  if (!sOptions) return opts;
  sOptions.split(/;/).filter(function (pair) {
    return (/.+:.+/.test(pair)
    );
  }).map(function (pair) {
    return pair.split(/:/).map(function (p) {
      return p.trim();
    });
  }).filter(function (pair) {
    return pair.length === 2;
  }).forEach(function (pair) {
    return opts[pair[0]] = parseValue(pair[1]);
  });

  return opts;
}

function parseValue(s) {
  if (/^true$/i.test(s)) return true;
  if (/^false$/i.test(s)) return false;
  if (/^null$/i.test(s)) return null;
  if (!isNaN(s)) return parseFloat(s);
  // array values
  if (/^\[(.*)\]$/.test(s)) {
    return s.substring(1, s.length - 1).split(',').map(function (v) {
      return v.trim();
    }).map(parseValue);
  }
  return s;
}

function stringify(options) {
  var sOptions = Object.keys(options).filter(function (key) {
    return isPrimitive(options[key]);
  }).map(function (key) {
    return key + ': ' + stringifyValue(options[key]);
  });
  return sOptions.join('; ');
}

function stringifyValue(val) {
  if (Array.isArray(val)) return '[' + val.filter(isPrimitive).map(stringifyValue).join(',') + ']';
  if (val === null) return 'null';
  if (val === undefined) return val;
  return val.toString();
}

function isPrimitive(val) {
  if ('string boolean number'.indexOf(typeof val === 'undefined' ? 'undefined' : _typeof(val)) > -1) return true;
  if (Array.isArray(val)) return true;
  if (val === null) return true;
  return false;
}
