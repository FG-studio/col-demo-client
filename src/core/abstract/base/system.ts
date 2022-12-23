export interface ISystem {
  setRegistry<T>(alias: string, registry: T): void
  getRegistry<T>(alias: string): T
  registService<T>(alias: string, service: T): void
  getService<T>(alias: string): T
  getStore<T>(alias: string): T
  setStore<T>(alias: string, store: T): void
  removeStore(alias: string): boolean
}
