import { Button, Col, Input, Layout, Row } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { useCallback, useState } from 'react'

import { LobbyStore } from './lobby.store'

export const LobbyScreen = observer(() => {
  const [store] = useState(() => new LobbyStore())
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [roomId, setRoomId] = useState<string | undefined>(undefined)
  const startGame = useCallback(() => {
    if (store.roomStore) {
      store.roomStore.start()
    }
  }, [store])
  return (
    <Layout>
      <Header>Header...</Header>
      <Content style={{ height: '100vh' }}>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={3}></Col>
              <Col span={18}>
                <Row style={{ margin: '10px 0' }}>
                  <Input
                    placeholder="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.currentTarget.value)
                    }}
                  />
                </Row>
                <Row style={{ margin: '10px 0' }}>
                  <Input
                    placeholder="room id"
                    value={roomId}
                    onChange={(e) => {
                      setRoomId(e.currentTarget.value)
                    }}
                  />
                </Row>
                <Row style={{ margin: '10px 0' }}>
                  <Button
                    style={{ margin: '0 5px' }}
                    onClick={() => {
                      if (!username) {
                        return
                      }
                      store.sessionStore.login(username)
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    style={{ margin: '0 5px' }}
                    onClick={() => {
                      store.createRoom()
                    }}
                  >
                    Create Room
                  </Button>
                  <Button
                    style={{ margin: '0 5px' }}
                    onClick={() => {
                      if (!roomId) {
                        return
                      }
                      store.joinRoom(roomId)
                    }}
                  >
                    Join Room
                  </Button>
                </Row>
              </Col>
              <Col span={3}></Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={3}></Col>
              <Col span={18}>
                {store.roomStore ? (
                  <>
                    <Row>Room Id: {store.roomStore.id}</Row>
                    <Row>Room name: {store.roomStore.name}</Row>
                    <Row>Member</Row>
                    {store.roomStore.players.map((s) => {
                      return (
                        <Row key={s.id}>
                          <Col span={8}>Id: {s.id}</Col>
                          <Col span={8}>Name: {s.name}</Col>
                          <Col span={8}>Is me: {`${s.isMe}`}</Col>
                        </Row>
                      )
                    })}
                    <Row>
                      <Button onClick={() => store.roomStore?.leave()}>
                        Leave
                      </Button>
                      <Button onClick={() => startGame()}>Start</Button>
                    </Row>
                  </>
                ) : null}
              </Col>
              <Col span={3}></Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
})
