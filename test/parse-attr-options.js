

var assert = require('chai').assert;

var parse = require('../dist/parse-attr-options');

describe('parse(sOptions)', function(){
  it('should parse a string into an vanilla object', function(){
    assert.deepEqual(parse('align: center; width: 600px'), {align: 'center', width: '600px'});
    assert.deepEqual(parse(''), {});
    assert.deepEqual(parse('foo:1; bar;'), {foo: 1});
    assert.deepEqual(parse('inline:true;preserve: false;'), {inline: true, preserve: false});
    assert.deepEqual(parse('height: 1'), {height: 1});
    assert.deepEqual(parse('height: 1.2'), {height: 1.2});
    assert.deepEqual(parse('height: 1px'), {height: '1px'});
    assert.deepEqual(parse('color: rgb(0,0,0)'), {color: 'rgb(0,0,0)'});
    assert.deepEqual(parse('bar: [1, foo, true]'), {bar: [1,'foo', true]});
  });
});

describe('stringify(options)', function(){
  it('should stringify an vanilla object of options', function(){
    var opts = {align: 'center', width: '600px'};
    assert.isFunction(parse.stringify);

    assert.equal(parse.stringify({align: 'center', width: '600px'}), 'align: center; width: 600px');
    assert.equal(parse.stringify(
      {b: false, n: 1, s: 'foo', ar: [1, 2, 3], bar: null}),
      'b: false; n: 1; s: foo; ar: [1,2,3]; bar: null');
  });
});

describe.skip('parseValue(sVal)', function(){
  it('should parse a string value', function(){
    assert.isFunction(parse.parseValue);
  });
});
