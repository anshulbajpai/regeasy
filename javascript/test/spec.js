'use strict'

var assert = require('assert'),
chai = require('chai'),
Regeasy = require('../lib/regeasy').regeasy;

chai.should();

describe('regeasy test', function() {

  it('should match anything', function() {
    Regeasy().matchAnything().test('a').should.be.true;
    Regeasy().matchAnything().test('ab123').should.be.true;
  });

  it('should match characters', function() {
    Regeasy().match('a').test('a').should.be.true;
    Regeasy().match('ab').test('a').should.be.false;
    Regeasy().match('ab').test('ab').should.be.true;

    Regeasy().match(Regeasy().match('foo')).test('foo').should.be.true;
    Regeasy().match(Regeasy().match('foo')).test('boo').should.be.false;
  });

  it('should match either characters', function() {
    Regeasy().either('a').or('b').test('a').should.be.true;
    Regeasy().either('a').or('b').test('b').should.be.true;
    Regeasy().either('a').or('b').test('c').should.be.false;

    Regeasy().either(Regeasy().match('12')).or('b').test('1234').should.be.true;
    Regeasy().either(Regeasy().match('12')).or(Regeasy().match('xy')).test('xyz').should.be.true;
    Regeasy().either(Regeasy().match('12')).or(Regeasy().match('xy')).test('4567').should.be.false;

  });

  it('should match a character one or more times', function(){
    Regeasy().mayBe('z').test('z').should.be.true;
    Regeasy().mayBe('z').test('zzz').should.be.true;
    Regeasy().mayBe('z').test('a').should.be.true;

    Regeasy().mayBe(Regeasy().match('z')).test('z').should.be.true;
    Regeasy().mayBe(Regeasy().match('z')).test('zzz').should.be.true;
    Regeasy().mayBe(Regeasy().match('z')).test('a').should.be.true;
  });

  it('should match a regex zero or more times', function(){
    Regeasy().mayBe(Regeasy().match('z')).test('z').should.be.true;
    Regeasy().mayBe(Regeasy().match('z')).match('a').test('zzz').should.be.false;
    Regeasy().match('abc').mayBe(Regeasy().match('z')).match('a').test('abca').should.be.true;
  });

  it('should match one or more times', function(){
    Regeasy().atleastOnce('z').test('z').should.be.true;
    Regeasy().atleastOnce('z').test('zz').should.be.true;
    Regeasy().atleastOnce('z').test('a').should.be.false;

    Regeasy().atleastOnce(Regeasy().match('z')).test('z').should.be.true;
    Regeasy().atleastOnce(Regeasy().match('z')).test('zz').should.be.true;
    Regeasy().atleastOnce(Regeasy().match('z')).test('a').should.be.false;
  });

  it('should match atmost one times', function(){
    Regeasy().atmostOnce('z').test('z').should.be.true;
    Regeasy().atmostOnce('z').match('a').test('zz').should.be.false;
    Regeasy().atmostOnce('z').test('a').should.be.true;

    Regeasy().atmostOnce(Regeasy().match('z')).test('z').should.be.true;
    Regeasy().atmostOnce(Regeasy().match('z')).match('a').test('zz').should.be.false;
    Regeasy().atmostOnce(Regeasy().match('z')).test('a').should.be.true;
  });

  it('should match given number of times', function(){
    Regeasy().match('z').exactly(2).test('zz').should.be.true;
    Regeasy().match('b').match('z').exactly(2).match('a').test('zzza').should.be.false;
    Regeasy().match('z').times(2,3).match('a').test('zza').should.be.true;
    Regeasy().match('z').times(2,3).match('a').test('zzza').should.be.true;
    Regeasy().match('b').match('z').times(2,3).match('a').test('zzzza').should.be.false;
    Regeasy().match('z').atleast(2).match('a').test('zza').should.be.true;
    Regeasy().match('z').atleast(2).match('a').test('zzza').should.be.true;
    Regeasy().match('z').atleast(2).match('a').test('za').should.be.false;
  });

})
