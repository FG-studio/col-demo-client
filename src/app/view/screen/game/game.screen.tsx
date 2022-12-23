import { Layout } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { observer } from 'mobx-react'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { StoreAlias, System } from '../../../../core'
import { RouterStore } from '../../../store/router.store'
import { HexagonBoardContainer } from '../../container'
import { GameScreenStore } from './game-screen.store'

export const GameScreen = observer(() => {
  const { id } = useParams()
  const [store] = useState(() => new GameScreenStore())
  useEffect(() => {
    const data = async () => {
      const routerStore = System.Instance.getStore<RouterStore>(
        StoreAlias.ROUTER
      )
      if (id) {
        try {
          await store.fetchRoom(id)
          if (store.roomStore && store.roomStore.game) {
            store.roomStore.game.loaded()
          }
        } catch (e) {
          if (!store.roomStore) routerStore.push('/')
        }
      } else {
        routerStore.push('/')
      }
    }
    data()
  }, [])
  return (
    <Layout>
      <Header>Header...</Header>
      <Content style={{ height: '100vh' }}>
        {store.roomStore && store.roomStore.game ? (
          <HexagonBoardContainer store={store.roomStore.game} />
        ) : null}
      </Content>
    </Layout>
  )
})
