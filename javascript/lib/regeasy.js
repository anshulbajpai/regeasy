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

    var _Regeasy = function _Regeasy(){
      internal(this).regex = "";
    };

    _Regeasy.prototype.matchAnything = function matchAnything() {
      internal(this).regex += ".";
      return this;
    };

    _Regeasy.prototype.mayBe = function mayBe(input) {
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

    _Regeasy.prototype.exactly = function exactly(times) {
      internal(this).regex += "{" + times + "}";
      return this;
    };

    _Regeasy.prototype.times = function exactly(lower, upper) {
      internal(this).regex += "{" + lower + "," + upper + "}";
      return this;
    };

    _Regeasy.prototype.atleast = function atleast(lower) {
      internal(this).regex += "{" + lower + "," + "}";
      return this;
    };

    _Regeasy.prototype.match = function match(input) {
      internal(this).regex += input;
      return this;
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
