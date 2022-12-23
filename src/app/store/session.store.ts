import { action, makeAutoObservable, observable } from 'mobx'

import { ISessionService, ISystem, ServiceAlias, System } from '../../core'
import { WsClient } from '../../lib'

export class SessionStore {
  private _system: ISystem
  private _sessionService: ISessionService
  @observable user_id?: string | undefined
  constructor() {
    this._system = System.Instance
    this._sessionService = this._system.getService<ISessionService>(
      ServiceAlias.SESSION
    )
    makeAutoObservable(this)
  }

  @action login = async (username: string) => {
    try {
      const res = await this._sessionService.login({ username })
      this.user_id = res.id
      WsClient.Instance.setToken(this.user_id)
      WsClient.Instance.start()
    } catch (e) {
      console.error('error when login', e)
    }
  }

  isMe = (id: string) => {
    return !!this.user_id && this.user_id === id
  }
}
