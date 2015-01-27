/**
* parseAttrOptions
* Parses a string of semi-colon delimited options into a plain object.
* Stringify provides the reverse.
*
* @example
* parse('align: center; width: 300; neat: true; yagni: [1,2,3]');
* >> {align: 'center', width: 300, neat: true, yagni: [1,2,3]}
*
* stringify({align: 'center', width: 300, neat: true, yagni: [1,2,3]});
* >> 'align: center; width: 300; neat: true; yagni: [1,2,3]'
*
*/
export default function parse(sOptions){
  let opts = {};
  if(!sOptions) return opts;
  sOptions
    .split(/;/)
    .filter( pair => /.+:.+/.test(pair))
    .map( pair => pair.split(/:/).map( p => p.trim()))
    .filter( pair => pair.length === 2)
    .forEach( pair => opts[pair[0]] = parseValue(pair[1]));

  return opts
}

export function parseValue(s){
  if(/^true$/i.test(s)) return true;
  if(/^false$/i.test(s)) return false;
  if(/^null$/i.test(s)) return null;
  if(!isNaN(s)) return parseFloat(s);
  // array values
  if(/^\[(.*)\]$/.test(s)){
    return s
      .substring(1, s.length -1)
      .split(',')
      .map(v => v.trim())
      .map(parseValue);
  }
  return s;
}

export function stringify(options){
  let sOptions = Object.keys(options)
    .filter(key => isPrimitive(options[key]))
    .map(key => `${key}: ${stringifyValue(options[key])}`);
  return sOptions.join('; ');
}

export function stringifyValue(val){
  if(Array.isArray(val)) return `[${val.filter(isPrimitive).map(stringifyValue).join(',')}]`;
  if(val === null) return 'null';
  if(val === undefined) return val;
  return val.toString();
}

function isPrimitive(val){
  if('string boolean number'.indexOf(typeof(val)) > -1) return true;
  if(Array.isArray(val)) return true;
  if(val === null) return true;
  return false;
}
