import { AnyMxRecord } from 'dns'
import { ReactComponentElement, ReactElement } from 'react'
import ICard from './card'
import ICharacter from './character'
import ITalismanCard from './talismanCard'

export default interface IBattleProps {
  battleLog: ReactElement
  arena: {
    name: string
    description: string
    type: string
  }
  level: number
  player: ICharacter
  monster: ICharacter
  ownedCards: Array<ICard>
  ownedTalismanCards: Array<ITalismanCard>
  setArenaHandler: (params: string) => void
  setPlayerHandler: (params: (params: ICharacter) => void) => void
  setMonsterHandler: (params: (params: ICharacter) => void) => void
  startGameHandler: () => void
  stopGameHandler: () => void
  stopMonsterTimersHandler: () => void
  startMonsterTimersHandler: () => void
  started: Boolean
}
