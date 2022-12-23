import { Size } from '../../../lib'

export enum GameMsgType {
  COMMAND = 'command',
  EVENT = 'event',
}

export enum GameState {
  ERROR = -1,
  STAND_BY = 0,
  BATTLE = 1,
  ENDED = 2,
}

export enum PieceElement {
  FIRE = 0,
  WIND,
  THUNDER,
  EARTH,
  WATER,
}

export type PieceStats = {
  hp: number
  atk: number
  def: number
  accurate: number
  resistance: number
  speed: number
  missPercent: number
  dodgePercent: number
  resistancePercent: number
  critRate: number
  critDamage: number
  moveSpeed: number
}

export type PieceEntity = {
  id: string
  stats: PieceStats
  element: PieceElement
  hpLeft: number
  position?: string
}

export type PlayerEntity = {
  id: string
  pieces: PieceEntity[]
  team: number
}

export type FieldEntity = {
  size: Size
}

export type GameEnitty = {
  id: string
  state: GameState
  players: PlayerEntity[]
  field: FieldEntity
}
