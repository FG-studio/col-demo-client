import { Config } from '../common'

export type WsMessage<T> = {
  type: string
  id?: string
  data: T
}

export interface IWsClientDelegate {
  onWsData<T>(channel: string, data: T): void
}

export class WsClient {
  private static _instance: WsClient | undefined
  public static get Instance(): WsClient {
    if (!this._instance) {
      this._instance = new WsClient()
    }
    return this._instance
  }
  private _cli: WebSocket | undefined
  private _delegates: IWsClientDelegate[]
  private _forceDelete: boolean = false
  private _pingInterval: any
  private _token?: string
  private constructor() {
    this._delegates = []
  }

  setToken(token: string) {
    this._token = token
  }

  addDelegates = (delegate: IWsClientDelegate) => {
    this._delegates.push(delegate)
  }

  removeDelegate = (delegate: IWsClientDelegate) => {
    this._delegates = this._delegates.filter((d) => d !== delegate)
  }

  start() {
    this._forceDelete = false
    this.connect()
  }

  stop() {
    this._forceDelete = true
    if (this._cli) {
      this._cli.close()
    }
    this.onDestroyed()
  }

  private connect() {
    let url = Config.WS_ENDPOINT
    if (this._token) {
      url += `?token=${this._token}`
    }
    this._cli = new WebSocket(url)
    this._cli.onclose = this.onClose
    this._cli.onerror = this.onError
    this._cli.onopen = this.onOpen
    this._cli.onmessage = this.onMessage
  }

  private onOpen = () => {
    console.log('on websocket connected')
    if (!this._pingInterval)
      this._pingInterval = setInterval(this.sendPing, 5000)
  }

  private onClose = (e: any) => {
    console.log('ws client disconnected ', e)
    this.onDestroyed()
    if (!this._forceDelete) {
      this.reconnect()
    }
  }

  private onError = (e: any) => {
    console.log('ws client error ', e)
    this.onDestroyed()
    if (!this._forceDelete) {
      this.reconnect()
    }
  }

  private onDestroyed = () => {
    this._cli = undefined
    if (this._pingInterval) {
      clearInterval(this._pingInterval)
      this._pingInterval = undefined
    }
  }

  private reconnect = () => {
    setTimeout(this.connect, 5000)
  }

  private sendPing = () => {
    if (this._cli) {
      this._cli.send('ping')
    }
  }

  private onMessage = (ev: any) => {
    if (ev.data === 'pong') return
    try {
      const msg: WsMessage<any> = JSON.parse(ev.data)
      if (this._delegates) {
        const channelId = msg.id ? `${msg.type}.${msg.id}` : `${msg.type}`
        this._delegates.forEach((d) => {
          d.onWsData(channelId, msg.data)
        })
      }
    } catch (e) {
      console.error('parser message error ', e)
    }
  }
}
