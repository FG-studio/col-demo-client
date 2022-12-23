import './styles.css'

import { observer } from 'mobx-react'
import { HexGrid, Layout } from 'react-hexgrid'

import { GameStore } from '../../../store/game.store'
import { HexagonCellComponent } from '../../components'

export type HexagonBoardProps = {
  store: GameStore
}

export const HexagonBoardContainer = observer((props: HexagonBoardProps) => {
  const { store } = props
  return (
    <HexGrid
      id="game-board"
      width={1280}
      height={720}
      viewBox="-50 -10 210 210"
    >
      <Layout
        size={{ x: store.size.width, y: store.size.height }}
        flat={true}
        spacing={1.1}
        origin={{ x: 0, y: 0 }}
      >
        {store.cells.map((c) => {
          return <HexagonCellComponent key={c.id} store={c} />
        })}
      </Layout>
    </HexGrid>
  )
})
