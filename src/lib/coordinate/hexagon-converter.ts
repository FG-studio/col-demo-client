import { Position } from './decartes-coordinate'

export type HexagonCubeCoordinate = {
  q: number
  r: number
  s: number
}

function validHexCubeCoordinates(cube: HexagonCubeCoordinate): boolean {
  return Math.round(cube.q + cube.r + cube.s) === 0
}

export function convertOffset2Cube(pos: Position): HexagonCubeCoordinate {
  const q = pos.x - (pos.y - (pos.y & 1)) / 2
  const r = pos.y
  const retval = {
    q,
    r,
    s: -q - r,
  }
  if (!validHexCubeCoordinates(retval)) {
    throw new Error('INVALID_HEXGON_COORDINATE')
  }
  return retval
}

export function convertCube2Offset(cube: HexagonCubeCoordinate): Position {
  const column = cube.q + (cube.r - (cube.r & 1)) / 2
  const row = cube.r
  return {
    y: row,
    x: column,
  }
}
