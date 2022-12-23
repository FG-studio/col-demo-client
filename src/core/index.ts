import { Config } from '../common'
import { RegistryAlias, ServiceAlias } from './abstract'
import {
  GameService,
  Hub,
  RoomService,
  SessionService,
  System,
} from './implement'

export * from './abstract'
export * from './implement/base/system'

const serviceMap: Map<ServiceAlias, any> = new Map()
serviceMap.set(ServiceAlias.SESSION, SessionService)
serviceMap.set(ServiceAlias.ROOM, RoomService)
serviceMap.set(ServiceAlias.GAME, GameService)

export function coreBoot() {
  if (Config.ENV === 'debug') (window as any).system = System.Instance
  System.Instance.setRegistry(RegistryAlias.HUB, new Hub())
  ;[...serviceMap.entries()].forEach(([a, s]) => {
    System.Instance.registService(a, new s())
  })
}
