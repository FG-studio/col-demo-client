import axios from 'axios'

import { Config } from '../common'

export class HttpClient {
  constructor(
    private _baseUrl: string = Config.API_ENDPOINT,
    private _authGetter?: () => { [key: string]: string }
  ) {}

  get<Request, Response>(path: string, data: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.buildPath(path), {
          data,
          headers: {
            ...this.authHeader(),
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => reject(err))
    })
  }

  post<Request, Response>(path: string, data: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.buildPath(path), data, {
          headers: {
            ...this.authHeader(),
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => reject(err))
    })
  }

  put<Request, Response>(path: string, data: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      axios
        .put(this.buildPath(path), data, {
          headers: {
            ...this.authHeader(),
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => reject(err))
    })
  }

  delete<Request, Response>(path: string, data: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      axios
        .delete(this.buildPath(path), {
          data,
          headers: {
            ...this.authHeader(),
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => reject(err))
    })
  }

  private buildPath(path: string): string {
    return `${this._baseUrl}/${path}`
  }

  private authHeader = (): { [key: string]: string } => {
    let retval: { [key: string]: string } = {}
    if (this._authGetter) {
      const authData = this._authGetter()
      retval = { ...retval, ...authData }
    }
    return retval
  }
}
