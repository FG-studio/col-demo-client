export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export function positionToAlias(pos: Position): string {
  return `${pos.x}-${pos.y}`
}

export function positionFromAlias(alias: string): Position {
  const payload = alias.split('-')
  if (payload.length !== 2) {
    throw new Error('INVALID_POSITION_ALIAS')
  }
  const x = parseInt(payload[0])
  const y = parseInt(payload[1])
  if (isNaN(x) || isNaN(y)) {
    throw new Error('INVALID_POSITION_ALIAS')
  }
  return {
    x,
    y,
  }
}
