import { parse } from '../parse'


describe(parse, () => {
  test('parses a YAML document properly.', () => {
    const res = parse(`
foo: bar
baz:
  - qux
  - quux: quuuz
  - 42
  - false
  - bla:
      ladida: 2
      world: true
blabla:
  yo: sure
`
    )

    expect(res.object['foo'].object).toBe('bar')
    expect(res.object['baz'].object[0].object).toBe('qux')
    expect(res.object['baz'].object[1].object['quux'].object).toBe('quuuz')
    expect(res.object['baz'].object[2].object).toBe(42)
    expect(res.object['baz'].object[3].object).toBe(false)
    expect(res.object['baz'].object[4].object['bla'].object['ladida'].object).toBe(2)
    expect(res.object['baz'].object[4].object['bla'].object['world'].object).toBe(true)
    expect(res.object['blabla'].object['yo'].object).toBe('sure')

    expect(res.location.range).toEqual({
      start: { line: 1, character: 0 },
      end: { line: 11, character: 10 }
    })

    expect(res.object['baz'].location.range).toEqual({
      start: { line: 2, character: 0 },
      end: { line: 9, character: 17 }
    })

    expect(res.object['baz'].object[1].location.range).toEqual({
      start: { line: 4, character: 4 },
      end: { line: 4, character: 15 }
    })

    expect(res.object['baz'].object[1].location.file.range(res.object['baz'].object[1].location.range)).toEqual({
      4: { content: '  - quux: quuuz', surround: false },
    })
  })
})
