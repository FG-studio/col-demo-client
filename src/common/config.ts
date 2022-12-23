declare global {
  interface Window {
    WS_ENDPOINT: string
    API_ENDPOINT: string
    ENV: string
  }
}

export const Config = {
  WS_ENDPOINT: window.WS_ENDPOINT,
  API_ENDPOINT: window.API_ENDPOINT,
  ENV: window.ENV,
}
