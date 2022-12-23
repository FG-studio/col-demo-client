import { action, makeAutoObservable, observable } from 'mobx'

import {
  IRoomService,
  ISystem,
  ServiceAlias,
  StoreAlias,
  System,
} from '../../../../core'
import { RoomEntity } from '../../../../core/abstract/entities'
import { SessionStore } from '../../../store'
import { IRoomStoreDelegate, RoomStore } from '../../../store/room.store'

export class LobbyStore implements IRoomStoreDelegate {
  private _system: ISystem
  sessionStore: SessionStore
  @observable roomStore: RoomStore | undefined
  constructor() {
    this._system = System.Instance
    this.sessionStore = this._system.getStore(StoreAlias.SESSION)
    makeAutoObservable(this)
  }

  onLeave = (): void => {
    this.removeRoom()
  }

  createRoom = async () => {
    const roomService = this._system.getService<IRoomService>(ServiceAlias.ROOM)
    const session = this.sessionStore.user_id
    if (!session) {
      console.warn('user not loged in')
      return
    }
    try {
      const room = await roomService.create()
      this.setRoom(room)
    } catch (e) {
      console.error('error when create room', e)
    }
  }

  joinRoom = async (id: string) => {
    const roomService = this._system.getService<IRoomService>(ServiceAlias.ROOM)
    const session = this.sessionStore.user_id
    if (!session) {
      console.warn('user not loged in')
      return
    }
    try {
      const room = await roomService.join(id)
      this.setRoom(room)
    } catch (e) {
      console.error('error when join room', e)
    }
  }

  @action setRoom = (room: RoomEntity) => {
    this.roomStore = new RoomStore(room, this)
  }

  @action removeRoom = () => {
    this.roomStore = undefined
  }
}
