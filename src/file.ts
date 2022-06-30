// TODO: this should be its own separate package

export interface Position {
  line: number
  character: number
}

export interface Range {
  start: Position
  end: Position
}

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
        return {
          line: i,
          character: offset - cursor
        }
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
    { surrounding, highlight }: { surrounding: number, highlight?: (c: string) => string} = { surrounding: 0 }
  ): string {
    highlight = highlight || (c => c)

    const start = range.start.line - surrounding
    const end = range.end.line + surrounding

    let pre = '', main = '', post = ''

    if (range.start.line < range.end.line) {
      main = [
        this.lines[range.start.line]!.slice(range.start.character),
        ...this.lines
          .slice(range.start.line + 1, range.end.line),
        this.lines[range.end.line]!.slice(0, range.end.character)
      ].join('\n')
    } else {
      main = this.lines[range.start.line]!.slice(range.start.character, range.end.character)
    }

    if (surrounding > 0) {
      if (range.start.line > 0) {
        pre += this.lines.slice(start, range.start.line).join('\n') + '\n'
      }

      if (range.start.character > 0) {
        pre += this.lines[range.start.line]!.slice(0, range.start.character)
      }

      if (range.end.character < this.lines[range.end.line]!.length) {
        post += this.lines[range.end.line]!.slice(range.end.character)
      }

      if (range.end.line < this.lines.length - 1) {
        post += '\n' + this.lines.slice(range.end.line + 1, end + 1).join('\n')
      }
    }

    return pre + highlight(main) + post
  }
}
