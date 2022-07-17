import { type } from 'ts-inference-check'
import { File } from 'mapped-file'

import {
  isNumberNode, isBooleanNode, isStringNode, isArrayNode, isObjectNode,
  MappedNode, MappedPrimitive,
  MappedObjectWithSchema,
  MappedArrayWithSchema
} from '../typings'


describe(isNumberNode, () => {
  it('should return true if node is a number', () => {
    const node: MappedNode = {
      object: 1,
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: new File('', '')
      }
    }
    expect(isNumberNode(node)).toBe(true)
  })

  it('should return false if node is not a number', () => {
    const node: MappedNode = {
      object: '1',
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: new File('', '')
      }
    }
    expect(isNumberNode(node)).toBe(false)
  })
})


describe(isBooleanNode, () => {
  it('should return true if node is a boolean', () => {
    const node: MappedNode = {
      object: true,
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: new File('', '')
      }
    }
    expect(isBooleanNode(node)).toBe(true)
  })

  it('should return false if node is not a boolean', () => {
    const node: MappedNode = {
      object: 'true',
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: new File('', '')
      }
    }
    expect(isBooleanNode(node)).toBe(false)
  })
})


describe(isStringNode, () => {
  it('should return true if node is a string', () => {
    const node: MappedNode = {
      object: '1',
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: new File('', '')
      }
    }
    expect(isStringNode(node)).toBe(true)
  })

  it('should return false if node is not a string', () => {
    const node: MappedNode = {
      object: 1,
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: new File('', '')
      }
    }
    expect(isStringNode(node)).toBe(false)
  })
})


describe(isArrayNode, () => {
  it('should return true if node is an array', () => {
    const location = {
      range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
      file: new File('', '')
    }

    const primitive = { object: 1, location }

    const node: MappedNode = {
      object: [primitive],
      location,
    }

    expect(isArrayNode(node)).toBe(true)
  })

  it('should return false if node is not an array', () => {
    const node: MappedNode = {
      object: {},
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: new File('', '')
      }
    }
    expect(isArrayNode(node)).toBe(false)
  })
})


describe(isObjectNode, () => {
  it('should return true if node is an object', () => {
    const location = {
      range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
      file: new File('', '')
    }

    const primitive = { object: 1, location }

    const node: MappedNode = {
      object: { primitive },
      location,
    }

    expect(isObjectNode(node)).toBe(true)
  })

  it('should return false if node is not an object', () => {
    const node: MappedNode = {
      object: [],
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: new File('', '')
      }
    }
    expect(isObjectNode(node)).toBe(false)
  })
})


describe('schema', () => {
  test('it provides a nice way of schema testing.', () => {
    function f(node: MappedObjectWithSchema<{
      a: MappedPrimitive<string>,
      b?: MappedArrayWithSchema<MappedPrimitive<number>>
    }>) {
      expect(type(node.object.a.object).is<string>(true)).toBe(true)

      if (node.object.b) {
        node.object.b.object.forEach(child => {
          expect(type(child.object).is<number>(true)).toBe(true)
        })
      }
    }

    const file = new File('', '')
    const location = { range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } }, file }

    f({
      object: {
        a: { object: 'halo', location },
        b: { object: [{ object: 42, location }], location }
      },
      location
    })
  })
})
