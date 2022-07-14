import { MappedNode } from '../parse'
import { isNumberNode, isBooleanNode, isStringNode, isArrayNode, isObjectNode } from '../typings'


describe(isNumberNode, () => {
  it('should return true if node is a number', () => {
    const node: MappedNode = {
      object: 1,
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
      }
    }
    expect(isNumberNode(node)).toBe(true)
  })

  it('should return false if node is not a number', () => {
    const node: MappedNode = {
      object: '1',
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
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
        file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
      }
    }
    expect(isBooleanNode(node)).toBe(true)
  })

  it('should return false if node is not a boolean', () => {
    const node: MappedNode = {
      object: 'true',
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
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
        file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
      }
    }
    expect(isStringNode(node)).toBe(true)
  })

  it('should return false if node is not a string', () => {
    const node: MappedNode = {
      object: 1,
      location: {
        range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
        file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
      }
    }
    expect(isStringNode(node)).toBe(false)
  })
})


describe(isArrayNode, () => {
  it('should return true if node is an array', () => {
    const location = {
      range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
      file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
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
        file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
      }
    }
    expect(isArrayNode(node)).toBe(false)
  })
})


describe(isObjectNode, () => {
  it('should return true if node is an object', () => {
    const location = {
      range: { start: { line: 0, character: 0}, end: { line: 0, character: 0 } },
      file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
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
        file: { name: '', contents: '', lines: [], position: jest.fn(), offset: jest.fn(), range: jest.fn() }
      }
    }
    expect(isObjectNode(node)).toBe(false)
  })
})
