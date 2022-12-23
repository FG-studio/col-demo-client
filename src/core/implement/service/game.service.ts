import { Config } from '../../../common'
import { HttpClient } from '../../../lib'
import {
  IGameService,
  ISessionService,
  ISystem,
  ServiceAlias,
} from '../../abstract'
import { System } from '../base'

export class GameService implements IGameService {
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

  submitPiece = async (
    id: string,
    pieces: { [key: string]: string }
  ): Promise<boolean> => {
    const res = await this._httpClient.post<
      { [key: string]: string },
      { status: boolean }
    >(`room/${id}/game/submit-piece`, pieces)
    return res.status
  }

  loaded = async (id: string): Promise<boolean> => {
    const res = await this._httpClient.post<undefined, { status: boolean }>(
      `room/${id}/game/player-loaded`,
      undefined
    )
    return res.status
  }
}
