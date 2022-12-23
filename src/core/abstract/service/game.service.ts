export interface IGameService {
  submitPiece(id: string, pieces: { [key: string]: string }): Promise<boolean>
  loaded(id: string): Promise<boolean>
}
