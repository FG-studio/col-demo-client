import { SessionEntity } from '../entities'

export type SessionLoginInput = {
  username: string
}

export interface ISessionService {
  login(input: SessionLoginInput): Promise<SessionEntity>
  authGetter(): { [key: string]: string }
  getSession(): SessionEntity | undefined
}
