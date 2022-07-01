// TODO: this should be its own separate package

export interface Position {
  line: number
  character: number
}


export interface Range {
  start: Position
  end: Position
}


// TODO: add some range / position / offset validation as well
export class File {
  readonly lines: string[]

  constructor(
    readonly name: string,
    readonly contents: string
  ) {
    this.lines = contents.split('\n')
  }

  position(offset: number): Position {
    let cursor = 0

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i]!
      if (cursor + line.length > offset) {
        const res = {
          line: i,
          character: offset - cursor
        }

        // CORRECTION FOR NEWLINE CHARACTERS
        if (res.character === -1 && i !== 0) {
          res.line -= 1
          res.character = this.lines[res.line]!.length
        }

        return res
      }

      cursor += line.length + 1
    }

    throw new RangeError(`Offset ${offset} is out of range`)
  }

  offset(position: Position): number {
    return this.lines
      .slice(0, position.line)
      .reduce((acc, l) => acc + l.length + 1, 0) + position.character
  }

  range(
    range: Range,
    { surrounding, highlight }: { surrounding?: number, highlight?: (c: string) => string} = {}
  ) {
    surrounding = surrounding || 0
    highlight = highlight || (c => c)

    const start = range.start.line - surrounding
    const end = range.end.line + surrounding

    const result: {[lineno: number]: {content: string, surround: boolean}} = {}

    for (let i = Math.max(0, start); i <= Math.min(end, this.lines.length - 1); i++) {
      const line = this.lines[i]!
      const lineno = i
      const surround = i < range.start.line || i > range.end.line
      let content = ''

      if (lineno === range.start.line && lineno === range.end.line) {
        content =
          line.slice(0, range.start.character) +
          highlight(line.slice(range.start.character, range.end.character)) +
          line.slice(range.end.character)
      } else if (lineno === range.start.line) {
        content = line.slice(0, range.start.character) + highlight(line.slice(range.start.character))
      } else if (lineno === range.end.line) {
        content = highlight(line.slice(0, range.end.character)) + line.slice(range.end.character)
      } else if (lineno > range.start.line && lineno < range.end.line) {
        content = highlight(line)
      } else {
        content = line
      }

      result[lineno] = { content, surround }
    }

    return result
  }
}


export interface Location {
  file: File
  range: Range
}
