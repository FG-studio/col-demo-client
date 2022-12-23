import { createBrowserRouter } from 'react-router-dom'

import { GameScreen, LobbyScreen } from './app'

export const Routers = createBrowserRouter([
  { path: '/', element: <LobbyScreen /> },
  { path: '/game/:id', element: <GameScreen /> },
])
