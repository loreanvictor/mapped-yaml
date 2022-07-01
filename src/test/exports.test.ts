import { parse, File, MappedNode, Range, Location, Position } from '../index'


test('everything is properly exported.', () => {
  expect(parse).not.toBe(undefined)
  expect(File).not.toBe(undefined)
  expect(<MappedNode>{}).not.toBe(undefined)
  expect(<Range>{}).not.toBe(undefined)
  expect(<Location>{}).not.toBe(undefined)
  expect(<Position>{}).not.toBe(undefined)
})

