import { Config } from '../../../common'
import { HttpClient } from '../../../lib'
import {
  IRoomService,
  ISessionService,
  ISystem,
  ServiceAlias,
} from '../../abstract'
import { RoomEntity } from '../../abstract/entities'
import { System } from '../base'

export class RoomService implements IRoomService {
  private _httpClient: HttpClient
  private _system: ISystem
  constructor() {
    this._system = System.Instance
    const sessionService = this._system.getService<ISessionService>(
      ServiceAlias.SESSION
    )
    this._httpClient = new HttpClient(
      Config.API_ENDPOINT,
      sessionService.authGetter
    )
  }

  create = async (): Promise<RoomEntity> => {
    const res = await this._httpClient.post<undefined, RoomEntity>(
      'room',
      undefined
    )
    return res
  }

  get = async (id: string): Promise<RoomEntity> => {
    const res = await this._httpClient.get<undefined, RoomEntity>(
      `room/${id}`,
      undefined
    )
    return res
  }

  join = async (id: string): Promise<RoomEntity> => {
    const res = await this._httpClient.put<undefined, RoomEntity>(
      `room/${id}/join`,
      undefined
    )
    return res
  }

  start = async (id: string): Promise<boolean> => {
    const res = await this._httpClient.put<undefined, { status: boolean }>(
      `room/${id}/start`,
      undefined
    )
    return res.status
  }

  leave = async (id: string): Promise<boolean> => {
    const res = await this._httpClient.delete<undefined, { status: boolean }>(
      `room/${id}/leave`,
      undefined
    )
    return res.status
  }
}
