(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "module"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module);
  }
})(function (exports, module) {
  "use strict";

  exports = module.exports = parse;
  exports.stringify = stringify;
  exports.stringifyValue = stringifyValue;
  exports.parseValue = parseValue;
  /**
  * parseAttrOptions
  * Parses a string of semi-colon delimited options into a plain object.
  *
  * @example
  * parseAttrOptions('align: center; width: 300; neat: true; yagni: [1,2,3]');
  * >> {align: 'center', width: 300, neat: true, yagni: [1,2,3]}
  */
  function parse(sOptions) {
    var opts = {};
    if (!sOptions) return opts;
    sOptions.split(/;/).filter(function (pair) {
      return /.+:.+/.test(pair);
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

  function filterValue(val) {
    if ("string boolean number".indexOf(typeof val) > 1) return true;
    if (Array.isArray(val)) return true;
    if (val === null) return true;
    return false;
  }

  function stringify(options) {
    var sOptions = Object.keys(options)
    // TOREVISIT
    .filter(function (key) {
      return filterValue.bind(null, options);
    })
    // .filter(key => {
    //   return filterValue(options[key])
    // })
    .map(function (key) {
      return "" + key + ": " + stringifyValue(options[key]);
    });
    return sOptions.join("; ");
  }

  function stringifyValue(val) {
    if (Array.isArray(val)) return "[" + val.map(stringifyValue).join(",") + "]";
    if (val === null) return "null";
    return val.toString();
  }

  function parseValue(s) {
    if (/^true$/i.test(s)) return true;
    if (/^false$/i.test(s)) return false;
    if (/^null$/i.test(s)) return null;
    if (!isNaN(s)) return parseFloat(s);
    // array values
    if (/^\[(.*)\]$/.test(s)) {
      return s.substring(1, s.length - 1).split(",").map(function (v) {
        return v.trim();
      }).map(parseValue);
    }
    return s;
  }
});
