import 'antd/dist/antd.css'

import { observer } from 'mobx-react'
import { useLayoutEffect, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'

import { GameScreen, LobbyScreen } from './app'
import { RouterStore } from './app/store/router.store'
import { StoreAlias, System } from './core'
import { Routers } from './router'

const App = observer(() => {
  const router = System.Instance.getStore<RouterStore>(StoreAlias.ROUTER)
  const { location, push, back, query, hashValue, pathValue } = router
  let [state, setState] = useState({
    action: router.history.action,
    location: router.history.location,
  })
  useLayoutEffect(() => router.subscribe(setState), [])
  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={router.history}
    >
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/game/:id" element={<GameScreen />} />
      </Routes>
    </Router>
  )
})

export default App
