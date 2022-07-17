import { Location } from 'mapped-file'


export type MappedPrimitive<T extends string | number | boolean>= {
  object: T
  location: Location
}


export type MappedArray = {
  object: MappedNode[]
  location: Location
}


export type MappedObject = {
  object: { [key: string]: MappedNode }
  location: Location
}

export type MappedNode =
  | MappedPrimitive<number>
  | MappedPrimitive<boolean>
  | MappedPrimitive<string>
  | MappedArray
  | MappedObject


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


export type MappedObjectWithSchema<T extends {[key: string]: MappedNode}> = MappedObject & { object: T }
export type MappedArrayWithSchema<T extends MappedNode> = {
  object: T[]
  location: Location
}
