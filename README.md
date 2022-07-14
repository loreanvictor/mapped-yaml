# mapped-yaml


[![tests](https://github.com/loreanvictor/mapped-yaml/actions/workflows/test.yml/badge.svg)](https://github.com/loreanvictor/mapped-yaml/actions/workflows/test.yml)
[![coverage](https://github.com/loreanvictor/mapped-yaml/actions/workflows/coverage.yml/badge.svg)](https://github.com/loreanvictor/mapped-yaml/actions/workflows/coverage.yml)
[![version](https://img.shields.io/npm/v/mapped-yaml?logo=npm)](https://www.npmjs.com/package/mapped-yaml)

A simple yaml parser providing source map as well.

```bash
npm i mapped-yaml
```

<br>

## Usage

```ts
import { readFile } from 'fs/promises'
import { parse } from 'mapped-yaml'


async main() {
  const content = await readFile('./stuff.yml', 'utf8')
  const parsed = parse(content, './stuff.yml')

  // 👉 access parsed contents of each node using `.object` property
  assert(parsed.object['hellow'].object === 'world')
  assert(parsed.object['stuff'].object[0].object === 42)
  assert(parsed.object['stuff'].object[1].object['foo'].object === 'bar')
  
  // 👉 access location of each node using `.location` property
  console.log(parsed.object['stuff'].object[1].location)

  // {
  //   file: File { ... },
  //   range: {
  //     start: { line: 4, character: 4 },
  //     end: { line: 4, character: 11 }
  //   }
  // }
  
  // 👉 get the contents of the file maybe with some surrounding lines even
  console.log(
    parsed.location.file.range(                          // --> returns the contents of the file for given range
      parsed.object['stuff'].object[0].location.range,   // --> the range of '- 42'
      { surrounding: 1 }                                 // --> also return 1 surrounding line.
    )
  )
  
  // {
  //   2: { content: 'stuff:', surround: true },
  //   3: { content: '  - 42', surround: false },
  //   4: { content: '  - foo: bar', surround: true }
  // }
}
```
```yaml
# stuff.yml
hellow: world
stuff:
  - 42
  - foo: bar
```

<br>

> ⚠️ Line and character indexes are _ZERO-BASED_. ⚠️

<br>

## Acknowledgement

This is a simple wrapper over [yaml](https://eemeli.org/yaml/#yaml). If you don't need source mapping, most probably you should just use that package.

<br><br>
