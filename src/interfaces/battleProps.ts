import ICard from './card'
import ICharacter from './character'

export default interface IBattleProps {
  level: number
  player: ICharacter
  monster: ICharacter
  ownedCards: Array<ICard>
  setPlayerHandler: (params: (params: ICharacter) => void) => void
  setMonsterHandler: (params: (params: ICharacter) => void) => void
  startGameHandler: () => void
  stopGameHandler: () => void
  stopMonsterTimersHandler: () => void
  startMonsterTimersHandler: () => void
  started: Boolean
}
