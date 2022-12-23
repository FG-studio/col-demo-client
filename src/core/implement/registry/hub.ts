import { eventBusBuild } from 'shadow-event-bus'
import {
  EventBusType,
  IEventBus,
  MsgBusCallback,
} from 'shadow-event-bus/lib/abstract'

import { IWsClientDelegate, WsClient } from '../../../lib'
import { IHub } from '../../abstract'

export class Hub implements IHub, IWsClientDelegate {
  private _eventBus: IEventBus
  constructor() {
    this._eventBus = eventBusBuild({
      type: EventBusType.LOCAL,
    })
    WsClient.Instance.addDelegates(this)
  }

  onWsData = <T>(channel: string, data: T): void => {
    console.log('on ws data', channel, data)
    this.publish(channel, data)
  }

  register = (channel: string, callback: MsgBusCallback): string => {
    return this._eventBus.register(channel, callback)
  }

  unregister = (channel: string, listenerId: string): void => {
    return this._eventBus.unregister(channel, listenerId)
  }

  publish = <T>(channel: string, data: T): void => {
    return this._eventBus.publish(channel, data)
  }
}
