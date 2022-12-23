import { makeAutoObservable, observable } from 'mobx'

import { PieceElement, PieceEntity } from '../../core/abstract/entities'

export class PieceStore {
  @observable id: string
  @observable stats: Map<string, number> = new Map()
  @observable pos?: string
  @observable element: PieceElement
  @observable hpLeft: number
  constructor(piece: PieceEntity) {
    this.id = piece.id
    this.element = piece.element
    this.pos = piece.position
    this.hpLeft = piece.hpLeft
    ;[...Object.entries(piece.stats)].forEach(([k, v]) => {
      this.stats.set(k, v)
    })
    makeAutoObservable(this)
  }
}
