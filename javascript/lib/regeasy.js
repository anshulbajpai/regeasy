(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.regeasy = factory();
    }
}(this, function () {
    'use strict';

    var map = new WeakMap();

    var internal = function internal(object) {
      if (!map.has(object)){
          map.set(object, {});
      }
      return map.get(object);
    };

    var _RegOr = function _RegOr(regeasy){
      internal(this).regeasy = regeasy;
    };

    _RegOr.prototype.or = function or(input) {
      var regeasy = internal(this).regeasy;
      internal(regeasy).regex += "|" + input + ")";
      return regeasy;
    };

    var _RegeasyX = function _RegeasyX(regeasy){
      internal(this).regeasy = regeasy;
    };

    _RegeasyX.prototype.anyTimes = function anyTimes() {
      return internal(this).regeasy.anyTimes("");
    };

    _RegeasyX.prototype.atleastOnce = function atleastOnce() {
      return internal(this).regeasy.atleastOnce("");
    };

    _RegeasyX.prototype.atmostOnce = function atmostOnce() {
      return internal(this).regeasy.atmostOnce("");
    };

    _RegeasyX.prototype.exactly = function exactly(times) {
      var regeasy = internal(this).regeasy;
      internal(regeasy).regex += "{" + times + "}";
      return regeasy;
    };

    _RegeasyX.prototype.times = function times(lower, upper) {
      var regeasy = internal(this).regeasy;
      internal(regeasy).regex += "{" + lower + "," + upper + "}";
      return regeasy;
    };

    _RegeasyX.prototype.atleast = function atleast(lower) {
      var regeasy = internal(this).regeasy;
      internal(regeasy).regex += "{" + lower + "," + "}";
      return regeasy;
    };

    _RegeasyX.prototype.test = function test(testString) {
      return internal(this).regeasy.test(testString);
    };

    _RegeasyX.prototype.match = function match(input) {
      return internal(this).regeasy.match(input);
    };

    _RegeasyX.prototype.toString = function toString() {
      var regeasy = internal(this).regeasy;
      return internal(regeasy).regex;
    };

    var _Regeasy = function _Regeasy(){
      internal(this).regex = "";
    };

    _Regeasy.prototype.anything = function anything() {
      internal(this).regex += ".";
      return new _RegeasyX(this);
    };

    _Regeasy.prototype.anyTimes = function anyTimes(input) {
      internal(this).regex += input + "*";
      return this;
    };

    _Regeasy.prototype.atleastOnce = function atleastOnce(input) {
      internal(this).regex += input + "+";
      return this;
    };

    _Regeasy.prototype.atmostOnce = function atleastOnce(input) {
      internal(this).regex += input + "?";
      return this;
    };

    _Regeasy.prototype.match = function match(input) {
      internal(this).regex += input;
      return new _RegeasyX(this);
    };

    _Regeasy.prototype.either = function either(input) {
      internal(this).regex += "(" + input;
      return new _RegOr(this);
    };

    _Regeasy.prototype.test = function test(testString) {
      return new RegExp(this.toString()).test(testString);
    };

    _Regeasy.prototype.toString = function toString() {
      return internal(this).regex;
    };

    var Regeasy = function Regeasy() {
        return new _Regeasy();
    };

    return Regeasy;
}));
