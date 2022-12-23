import { HttpClient } from '../../../lib'
import { ISessionService, SessionLoginInput } from '../../abstract'
import { SessionEntity } from '../../abstract/entities'

export class SessionService implements ISessionService {
  private _session: SessionEntity | undefined
  private _httpClient: HttpClient
  constructor() {
    this._httpClient = new HttpClient()
  }

  login = async (input: SessionLoginInput): Promise<SessionEntity> => {
    const res = await this._httpClient.post<{ name: string }, SessionEntity>(
      'user/login',
      {
        name: input.username,
      }
    )
    this._session = res
    return res
  }

  authGetter = (): { [key: string]: string } => {
    const retval: { [key: string]: string } = {}
    if (this._session) {
      retval['x-user-id'] = this._session.id
    }
    return retval
  }

  getSession(): SessionEntity | undefined {
    return this._session
  }
}
