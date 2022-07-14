import {
  parse, File, MappedNode, MappedArray, MappedObject, MappedPrimitive,
  isNumberNode, isBooleanNode, isStringNode, isArrayNode, isObjectNode,
  Range, Location, Position
} from '../index'


test('everything is properly exported.', () => {
  expect(parse).not.toBe(undefined)
  expect(File).not.toBe(undefined)
  expect(<MappedNode>{}).not.toBe(undefined)
  expect(<Range>{}).not.toBe(undefined)
  expect(<Location>{}).not.toBe(undefined)
  expect(<Position>{}).not.toBe(undefined)
  expect(<MappedArray>{}).not.toBe(undefined)
  expect(<MappedObject>{}).not.toBe(undefined)
  expect(<MappedPrimitive<number>>{}).not.toBe(undefined)
  expect(<MappedPrimitive<boolean>>{}).not.toBe(undefined)
  expect(<MappedPrimitive<string>>{}).not.toBe(undefined)
  expect(isNumberNode).not.toBe(undefined)
  expect(isBooleanNode).not.toBe(undefined)
  expect(isStringNode).not.toBe(undefined)
  expect(isArrayNode).not.toBe(undefined)
  expect(isObjectNode).not.toBe(undefined)
})

