import './index.css'

import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { SessionStore } from './app'
import { RouterStore } from './app/store/router.store'
import { coreBoot, StoreAlias, System } from './core'
import App from './entrypoint'

coreBoot()
System.Instance.setStore(
  StoreAlias.ROUTER,
  new RouterStore(createBrowserHistory())
)
System.Instance.setStore(StoreAlias.SESSION, new SessionStore())
console.log('init core completed...')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
