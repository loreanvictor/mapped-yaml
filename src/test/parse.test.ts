import { parse } from '../parse'


describe(parse, () => {
  test('parses a YAML document properly.', () => {
    const res = parse(`foo: bar
baz:
  - qux
  - quux: quuuz
  - 42
  - false`
    )

    expect(res.object['foo'].object).toBe('bar')
    expect(res.object['baz'].object[0].object).toBe('qux')
    expect(res.object['baz'].object[1].object['quux'].object).toBe('quuuz')
    expect(res.object['baz'].object[2].object).toBe(42)
    expect(res.object['baz'].object[3].object).toBe(false)

    expect(res.location.range).toEqual({
      start: { line: 0, character: 0 },
      end: { line: 5, character: 8 }
    })

    expect(res.object['baz'].location.range).toEqual({
      start: { line: 1, character: 0 },
      end: { line: 5, character: 8 }
    })

    expect(res.object['baz'].object[1].location.range).toEqual({
      start: { line: 3, character: 4 },
      end: { line: 3, character: 15 }
    })

    expect(res.object['baz'].object[1].location.file.range(res.object['baz'].object[1].location.range)).toEqual({
      3: { content: '  - quux: quuuz', surround: false },
    })
  })
})
