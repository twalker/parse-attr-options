import {assert} from 'chai'
import parse from '../dist/parse-attr-options'

describe('parse(sOptions)', ()=>{
  it('should parse a string into an vanilla object', ()=>{
    assert.deepEqual(parse('align: center; width: 600px'), {align: 'center', width: '600px'});
    assert.deepEqual(parse(''), {});
    assert.deepEqual(parse('foo:1; bar;'), {foo: 1});
    assert.deepEqual(parse('inline:true;preserve: false;'), {inline: true, preserve: false});
    assert.deepEqual(parse('height: 1'), {height: 1});
    assert.deepEqual(parse('height: 1.2'), {height: 1.2});
    assert.deepEqual(parse('height: 1px'), {height: '1px'});
    assert.deepEqual(parse('color: rgb(0,0,0)'), {color: 'rgb(0,0,0)'});
    assert.deepEqual(parse('bar: [1, foo, true]'), {bar: [1,'foo', true]});
  })
})

describe('parseValue(sVal)', ()=>{
  it('should parse a string value', ()=>{
    assert.equal(parse.parseValue('foo'), 'foo');
    assert.equal(parse.parseValue('foo bar baz'), 'foo bar baz');
    assert.isUndefined(parse.parseValue());
  })
  it('should parse a number value', ()=>{
    assert.equal(parse.parseValue('2.34'), 2.34);
  })
  it('should parse a boolean value', ()=>{
    assert.isFalse(parse.parseValue('false'));
    assert.isTrue(parse.parseValue('true'));
  })
  it('should parse arrays of primitives', ()=>{
    assert.deepEqual(parse.parseValue('[1,hello, false]'), [1, 'hello', false])
  })
  it('should handle problematic values', ()=>{
    assert.isNull(parse.parseValue('null'))
    assert.isUndefined(parse.parseValue());
  })
})

describe('stringify(options)', ()=>{
  it('should stringify an vanilla object of options', ()=>{
    var opts = {align: 'center', width: '600px'};
    assert.isFunction(parse.stringify);

    assert.equal(parse.stringify({align: 'center', width: '600px'}), 'align: center; width: 600px');
    assert.equal(parse.stringify(
      {b: false, n: 1, s: 'foo', ar: [1, 2, 3], bar: null}),
      'b: false; n: 1; s: foo; ar: [1,2,3]; bar: null');
  })
})

describe('stringifyValue(val)', ()=>{
  it('should stringify a string value', ()=>{
    assert.equal(parse.stringifyValue('foo'), 'foo');
    //assert.isUndefined(parse.stringifyValue());
  })
  it('should stringify a number value', ()=>{
    assert.equal(parse.stringifyValue(2.34), '2.34');
  })
  it('should stringify a boolean value', ()=>{
    assert.equal(parse.stringifyValue(false), 'false');
    assert.equal(parse.stringifyValue(true), 'true');
  })
  it('should stringify arrays of primitives', ()=>{
    assert.equal(parse.stringifyValue([1, 'hello', false]), '[1,hello,false]');
  })
  it('should handle problematic values', ()=>{
    assert.equal(parse.stringifyValue(null), 'null')
    assert.isUndefined(parse.stringifyValue());
    assert.equal(parse.stringifyValue(''), '');
    assert.equal(parse.stringifyValue([1, function(){}, {a:'foo'}]), '[1]');
  })
})
