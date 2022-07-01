import { parseDocument, Node, isSeq, isMap } from 'yaml'

import { Location, File } from './file'


export type MappedNode = {
  object: any
  location: Location
}


function process(node: Node, file: File): MappedNode {
  const range = {
    start: file.position(node.range![0]),
    end: file.position(node.range![1] - 1),
  }

  if (isSeq(node)) {
    return {
      object: node.items.map(item => process(item as Node, file)),
      location: { range, file }
    }
  } else if (isMap(node)) {
    return {
      object: node.items.reduce((acc, mapping) => {
        const key = process(mapping.key as Node, file)
        const value = process(mapping.value as Node, file)
        acc[key.object] = {
          object: value.object,
          location: {
            range: {
              start: key.location.range.start,
              end: value.location.range.end
            },
            file: key.location.file
          }
        }

        return acc
      }, {}),
      location: { range, file }
    }
  } else {
    return {
      object: node.toJSON(),
      location: { range, file }
    }
  }
}


export function parse(content: string, filename = '<inline>') {
  const file = new File(filename, content)
  const document = parseDocument(content)

  return process(document.contents!, file)
}
