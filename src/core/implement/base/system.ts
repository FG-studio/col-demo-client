import { ISystem } from '../../abstract'

export class System implements ISystem {
  private static _ins: System | undefined
  public static get Instance(): System {
    if (!this._ins) {
      this._ins = new System()
    }
    return this._ins
  }

  private _serviceMap: Map<string, any>
  private _registryMap: Map<string, any>
  private _storeMap: Map<string, any>

  private constructor() {
    this._registryMap = new Map()
    this._serviceMap = new Map()
    this._storeMap = new Map()
  }

  setRegistry<T>(alias: string, registry: T): void {
    this._registryMap.set(alias, registry)
  }

  getRegistry<T>(alias: string): T {
    const instance = this._registryMap.get(alias)
    if (!instance) {
      throw new Error('REGISTRY_NOT_FOUND')
    }
    return instance
  }

  registService<T>(alias: string, service: T): void {
    this._serviceMap.set(alias, service)
  }

  getService<T>(alias: string): T {
    const instance = this._serviceMap.get(alias)
    if (!instance) {
      throw new Error('SERVICE_NOT_FOUND')
    }
    return instance
  }

  getStore<T>(alias: string): T {
    const instance = this._storeMap.get(alias)
    if (!instance) {
      throw new Error('STORE_NOT_FOUND')
    }
    return instance
  }

  setStore<T>(alias: string, store: T): void {
    console.log('set store', alias, store)
    this._storeMap.set(alias, store)
  }

  removeStore(alias: string): boolean {
    return this._storeMap.delete(alias)
  }
}
