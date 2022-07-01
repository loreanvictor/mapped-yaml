import { File } from '../file'


describe(File, () => {
  test('can read given range from the file.', () => {
    const file = new File('file.ts', 'line1\nline2\nline3\nline4\nline5')

    expect(file.range({
      start: { line: 1, character: 2 },
      end: { line: 3, character: 3 }
    })).toEqual({
      1: { content: 'line2', surround: false },
      2: { content: 'line3', surround: false },
      3: { content: 'line4', surround: false }
    })

    expect(file.range({
      start: { line: 0, character: 2 },
      end: { line: 2, character: 3 }
    }, { surrounding: 1 })).toEqual({
      0: { content: 'line1', surround: false },
      1: { content: 'line2', surround: false },
      2: { content: 'line3', surround: false },
      3: { content: 'line4', surround: true },
    })

    const highlight = jest.fn(c => c)
    expect(file.range({
      start: { line: 3, character: 1 },
      end: { line: 3, character: 4 }
    }, { surrounding: 1, highlight })).toEqual({
      2: { content: 'line3', surround: true },
      3: { content: 'line4', surround: false },
      4: { content: 'line5', surround: true },
    })

    expect(highlight).toHaveBeenCalledWith('ine')
  })

  test('.position() gives a position from an index.', () => {
    const file = new File('file.ts', 'line1\nline2\nline3\nline4\nline5')

    expect(file.position(0)).toEqual({ line: 0, character: 0 })
    expect(file.position(1)).toEqual({ line: 0, character: 1 })
    expect(file.position(8)).toEqual({ line: 1, character: 2 })

    expect(() => file.position(30)).toThrow()
  })

  test('.offset() gives an index from a position.', () => {
    const file = new File('file.ts', 'line1\nline2\nline3\nline4\nline5')

    expect(file.offset({ line: 0, character: 0 })).toBe(0)
    expect(file.offset({ line: 0, character: 1 })).toBe(1)
    expect(file.offset({ line: 1, character: 2 })).toBe(8)
  })

  test('handles new lines properly.', () => {
    const file = new File('file.ts', `foo: bar
baz:
  - qux
  - quux: quuuz
  - 42
  - false`)

    expect(file.position(8)).toEqual({ line: 0, character: 8 })
    expect(file.position(37)).toEqual({ line: 3, character: 15 })
    expect(file.range({ start: file.position(22), end: file.position(37) })).toEqual({
      3: { content: '  - quux: quuuz', surround: false },
    })
  })
})
