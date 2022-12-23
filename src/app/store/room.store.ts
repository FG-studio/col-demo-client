import { action, computed, makeAutoObservable, observable } from 'mobx'
import { MsgBusCallback } from 'shadow-event-bus/lib/abstract'

import {
  IHub,
  IRoomService,
  ISystem,
  RegistryAlias,
  ServiceAlias,
  StoreAlias,
  System,
} from '../../core'
import {
  GameEnitty,
  MsgType,
  RoomAttendeeData,
  RoomEntity,
  RoomMsgType,
} from '../../core/abstract/entities'
import { GameStore } from './game.store'
import { PlayerStore } from './player.store'
import { RouterStore } from './router.store'

export interface IRoomStoreDelegate {
  onLeave(): void
}

export class RoomStore {
  @observable id: string
  @observable name: string
  @observable attendees: Map<string, PlayerStore> = new Map()
  @observable game?: GameStore
  private _system: ISystem
  private _roomService: IRoomService
  private _channelMap: Map<string, string> = new Map()
  private _actionMap: Map<RoomMsgType, <T>(data: T) => void> = new Map()
  constructor(entity: RoomEntity, private _delegate?: IRoomStoreDelegate) {
    this._system = System.Instance
    this._roomService = this._system.getService<IRoomService>(ServiceAlias.ROOM)

    this.id = entity.id
    this.name = entity.name
    makeAutoObservable(this)
    this.initRoom(entity)
  }

  @action addPlayer = (attendee: RoomAttendeeData) => {
    const store = new PlayerStore(attendee)
    this.attendees.set(store.id, store)
  }

  @action removePlayer = (id: string) => {
    this.attendees.delete(id)
  }

  @computed get players() {
    return [...this.attendees.values()]
  }

  leave = async () => {
    try {
      const res = await this._roomService.leave(this.id)
      if (res) {
        if (this._delegate) {
          this._delegate.onLeave()
        }
      }
    } catch (e) {
      console.error('error when leave room', e)
    }
  }

  start = async () => {
    try {
      const status = await this._roomService.start(this.id)
      console.log('start game', status)
    } catch (e) {
      console.error('error when start room', e)
    }
  }

  private initRoom = (entity: RoomEntity) => {
    entity.attenddes.forEach((a) => this.addPlayer(a))
    this._actionMap.set(RoomMsgType.USER_JOIN, this.addPlayer as any)
    this._actionMap.set(RoomMsgType.USER_LEAVE, this.removePlayer as any)
    this._actionMap.set(RoomMsgType.GAME_STARTED, this.onStartGame as any)
    this.subcribeRoomEvent()
  }

  private subcribeRoomEvent = () => {
    const eventBus = this._system.getRegistry<IHub>(RegistryAlias.HUB)
    this._channelMap.set(
      `${MsgType.ROOM}.${this.id}`,
      eventBus.register(
        `${MsgType.ROOM}.${this.id}`,
        this.onRoomEvent as MsgBusCallback
      )
    )
  }

  private onRoomEvent = (data: { type: RoomMsgType; payload: any }) => {
    const { type, payload } = data
    const action = this._actionMap.get(type)
    if (action) {
      action(payload)
    }
  }

  @action onStartGame = (game: GameEnitty) => {
    const routerStore = this._system.getStore<RouterStore>(StoreAlias.ROUTER)
    this.game = new GameStore(this.id, this.attendees, game)
    console.log(routerStore.location)

    this._system.setStore(StoreAlias.ROOM, this)
    const url = `/game/${this.id}`
    routerStore.push(url)
  }
}
