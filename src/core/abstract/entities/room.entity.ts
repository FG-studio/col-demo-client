import { GameEnitty } from './game.entity'

export enum MsgType {
  ROOM = 'room',
  GAME = 'game',
}

export enum RoomMsgType {
  USER_JOIN = 'user_join',
  USER_LEAVE = 'user_leave',
  GAME_STARTED = 'game_started',
}

export type RoomAttendeeData = {
  id: string
  name: string
}

export type RoomEntity = {
  id: string
  name: string
  attenddes: RoomAttendeeData[]
  game?: GameEnitty
}
