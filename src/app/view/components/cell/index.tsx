import { observer } from 'mobx-react'
import { Hexagon, Text } from 'react-hexgrid'

import { CellStore } from '../../../store/cell.store'

export type HexagonCellProps = {
  store: CellStore
}

export const HexagonCellComponent = observer((props: HexagonCellProps) => {
  const { store } = props
  return (
    <Hexagon key={store.id} q={store.Q} r={store.R} s={store.S}>
      <Text>{store.id}</Text>
    </Hexagon>
  )
})
