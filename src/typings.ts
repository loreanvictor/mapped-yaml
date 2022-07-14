import { MappedPrimitive, MappedArray, MappedObject, MappedNode } from './parse'


export function isNumberNode(node: MappedNode): node is MappedPrimitive<number> {
  return typeof node.object === 'number'
}


export function isBooleanNode(node: MappedNode): node is MappedPrimitive<boolean> {
  return typeof node.object === 'boolean'
}


export function isStringNode(node: MappedNode): node is MappedPrimitive<string> {
  return typeof node.object === 'string'
}


export function isArrayNode(node: MappedNode): node is MappedArray {
  return Array.isArray(node.object)
}


export function isObjectNode(node: MappedNode): node is MappedObject {
  return typeof node.object === 'object' && !Array.isArray(node.object)
}
