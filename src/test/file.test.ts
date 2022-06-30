import { File } from '../file'


describe(File, () => {
  test('can read given range from the file.', () => {
    const file = new File('file.ts', 'line1\nline2\nline3\nline4\nline5')

    expect(file.range({
      start: { line: 1, character: 2 },
      end: { line: 3, character: 3 }
    })).toBe('ne2\nline3\nlin')

    expect(file.range({
      start: { line: 1, character: 0 },
      end: { line: 2, character: 4 }
    })).toBe('line2\nline')

    expect(file.range({
      start: { line: 2, character: 1 },
      end: { line: 2, character: 5 }
    })).toBe('ine3')

    expect(file.range({
      start: { line: 2, character: 1 },
      end: { line: 4, character: 3 }
    })).toBe('ine3\nline4\nlin')

    expect(file.range({
      start: { line: 1, character: 2 },
      end: { line: 3, character: 3 }
    }, { surrounding: 1 })).toBe('line1\nline2\nline3\nline4\nline5')

    expect(file.range({
      start: { line: 2, character: 0 },
      end: { line: 3, character: 3 }
    }, { surrounding: 1 })).toBe('line2\nline3\nline4\nline5')

    expect(file.range({
      start: { line: 3, character: 2 },
      end: { line: 3, character: 6 }
    }, { surrounding: 1 })).toBe('line3\nline4\nline5')

    expect(file.range({
      start: { line: 3, character: 2 },
      end: { line: 4, character: 6 }
    }, { surrounding: 1 })).toBe('line3\nline4\nline5')


    const highlight = jest.fn(c => c)

    expect(file.range({
      start: { line: 3, character: 2 },
      end: { line: 4, character: 3 }
    }, { surrounding: 1, highlight })).toBe('line3\nline4\nline5')

    expect(highlight).toHaveBeenCalledWith('ne4\nlin')
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
})
