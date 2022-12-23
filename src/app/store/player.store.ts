import { action, computed, makeAutoObservable, observable } from 'mobx'

import { ISessionService, ISystem, ServiceAlias, System } from '../../core'
import { PlayerEntity, RoomAttendeeData } from '../../core/abstract/entities'
import { PieceStore } from './piece.store'

export class PlayerStore {
  @observable id: string
  @observable name: string
  @observable team: number = -1
  @observable pieces: PieceStore[] = []
  private _system: ISystem
  private _sessionService: ISessionService
  constructor(entity: RoomAttendeeData) {
    this.id = entity.id
    this.name = entity.name
    this._system = System.Instance
    this._sessionService = this._system.getService<ISessionService>(
      ServiceAlias.SESSION
    )
    makeAutoObservable(this)
  }

  @computed get isMe() {
    const session = this._sessionService.getSession()
    return !!session && session.id === this.id
  }

  @action updatePlayerInfo = (p: PlayerEntity) => {
    this.team = p.team
  }

  @action initPieces = (p: PieceStore[]) => {
    this.pieces = p
  }
}
