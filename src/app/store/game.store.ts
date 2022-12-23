import { action, computed, makeAutoObservable, observable } from 'mobx'
import { MsgBusCallback } from 'shadow-event-bus/lib/abstract'

import {
  IGameService,
  IHub,
  ISystem,
  RegistryAlias,
  ServiceAlias,
  System,
} from '../../core'
import {
  FieldEntity,
  GameEnitty,
  GameMsgType,
  GameState,
  MsgType,
  PieceEntity,
  PlayerEntity,
} from '../../core/abstract/entities'
import { CellStore } from './cell.store'
import { PieceStore } from './piece.store'
import { PlayerStore } from './player.store'

export class GameStore {
  @observable cellMap: Map<string, CellStore> = new Map()
  @observable pieceMap: Map<string, PieceStore> = new Map()
  @observable playerPieceMap: Map<string, string[]> = new Map()
  @observable state: GameState
  @observable size
  private _channelMap: Map<string, string> = new Map()
  private _actionMap: Map<string, <T>(data: T) => void> = new Map()
  private _system: ISystem
  private _gameService: IGameService
  constructor(
    private _id: string,
    private _players: Map<string, PlayerStore>,
    private _entity: GameEnitty
  ) {
    this._system = System.Instance
    this._gameService = this._system.getService<IGameService>(ServiceAlias.GAME)
    this.state = this._entity.state
    this.size = this._entity.field.size
    this.initField(this._entity.field)
    this.initPlayerPiece(this._entity.players)
    this.subscribeGameEvent()
    makeAutoObservable(this)
  }

  private initPlayerPiece = (players: PlayerEntity[]) => {
    for (let player of players) {
      const pieceIds = player.pieces.map((p) => p.id)
      this.playerPieceMap.set(player.id, pieceIds)
      const pieces = this.initPiece(player.pieces)
      const pStore = this._players.get(player.id)
      if (pStore) {
        pStore.updatePlayerInfo(player)
        pStore.initPieces(pieces)
      }
    }
  }

  @action private initPiece = (pieces: PieceEntity[]): PieceStore[] => {
    const retval: PieceStore[] = []
    for (let p of pieces) {
      const piece = new PieceStore(p)
      this.pieceMap.set(piece.id, piece)
      retval.push(piece)
    }

    return retval
  }

  loaded = () => {
    return this._gameService.loaded(this._id)
  }

  @action private initField = (field: FieldEntity) => {
    const size = field.size
    for (let i = 0; i < size.width; i++)
      for (let j = 0; j < size.height; j++) {
        const cell = new CellStore({
          x: j,
          y: i,
        })
        this.cellMap.set(cell.id, cell)
      }
  }

  @computed get cells(): CellStore[] {
    return [...this.cellMap.values()]
  }

  private subscribeGameEvent = () => {
    this._actionMap.set(GameMsgType.EVENT, this.onGameEvent)
    this._actionMap.set(GameMsgType.COMMAND, this.onGameCmd)
    const eventBus = this._system.getRegistry<IHub>(RegistryAlias.HUB)
    this._channelMap.set(
      `${MsgType.GAME}.${this._id}`,
      eventBus.register(
        `${MsgType.GAME}.${this._id}`,
        this.onGameMsg as MsgBusCallback
      )
    )
  }

  private onGameMsg = (data: { type: GameMsgType; payload: any }) => {
    const { type, payload } = data
    const action = this._actionMap.get(type)
    if (action) {
      action(payload)
    }
  }

  private onGameEvent = (data: any) => {
    console.log(data)
  }

  private onGameCmd = (data: any) => {
    console.log(data)
  }
}
