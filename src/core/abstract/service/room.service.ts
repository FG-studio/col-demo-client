import { RoomEntity } from '../entities'

export interface IRoomService {
  create(): Promise<RoomEntity>
  get(id: string): Promise<RoomEntity>
  join(id: string): Promise<RoomEntity>
  leave(id: string): Promise<boolean>
  start(id: string): Promise<boolean>
}
