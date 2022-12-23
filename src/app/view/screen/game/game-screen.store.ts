import { makeAutoObservable, observable } from 'mobx'

import {
  IRoomService,
  ISystem,
  ServiceAlias,
  StoreAlias,
  System,
} from '../../../../core'
import { RoomStore } from '../../../store/room.store'

export class GameScreenStore {
  private _system: ISystem
  @observable roomStore: RoomStore | undefined
  constructor() {
    this._system = System.Instance
    makeAutoObservable(this)
  }

  fetchRoom = async (id: string) => {
    const store = this._system.getStore<RoomStore>(StoreAlias.ROOM)
    if (store) {
      console.log('room store found')
      this.roomStore = store
      this._system.removeStore(StoreAlias.ROOM)
      return
    }

    const roomService = this._system.getService<IRoomService>(ServiceAlias.ROOM)
    const entity = await roomService.get(id)
    this.roomStore = new RoomStore(entity)
  }
}
