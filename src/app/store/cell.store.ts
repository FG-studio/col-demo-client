import { computed, makeAutoObservable, observable } from 'mobx'

import {
  convertOffset2Cube,
  HexagonCubeCoordinate,
  Position,
  positionToAlias,
} from '../../lib'

export class CellStore {
  private _cube: HexagonCubeCoordinate
  @observable id: string
  constructor(private _pos: Position) {
    this._cube = convertOffset2Cube(this._pos)
    this.id = positionToAlias(this._pos)
    makeAutoObservable(this)
  }

  @computed get Q(): number {
    return this._cube.q
  }

  @computed get R(): number {
    return this._cube.r
  }

  @computed get S(): number {
    return this._cube.s
  }
}
