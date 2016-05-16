
# parse-attr-options

Parses a string of semi-colon delimited options into a plain object. Stringify provides the reverse.

```javascript
import { parse, stringify } from 'parse-attr-options'

parse('align: center; width: 300; neat: true; yagni: [1,2,3]')
>> {align: 'center', width: 300, neat: true, yagni: [1,2,3]}

stringify({align: 'center', width: 300, neat: true, yagni: [1,2,3]})
>> 'align: center; width: 300; neat: true; yagni: [1,2,3]'
```

Useful for options in html `data-`attributes:

```html
<section data-options="stamp: 1422377357359; go: hawks">content</section>
<script>
  let el = document.querySelector('section')
  let opts = parse(el.getAttribute('data-options'))
  console.info(`section last updated on ${opts.stamp}`)
</script>
```

## Why?!

Serializing and deserializing JSON in dom `data-` attributes can become a knot of single/double quotes.   This module provides a small quote-less alternative for a shallow set of options.  

Supports `string`, `boolean`, and `number` values, and arrays composed of the same.  
Does not support Objects, quotes, or nesting.  

---------------------

Inspired by: https://github.com/dfcreative/parse-attr
