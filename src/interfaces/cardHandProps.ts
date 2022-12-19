import ICard from './card'
import ICharacter from './character'

export default interface ICardHandProps {
  arena: { name: string; type: string }
  cardsInHand: Array<ICard>
  ownedCards: Array<ICard>
  arenaBoostHandler: () => void
  setPlayerHandler: (params: any) => void
  setMonsterHandler: (params: (params: ICharacter) => void) => void
  stopMonsterTimersHandler: () => void
  startMonsterTimersHandler: () => void
  cardsDisabled: boolean
  cardsUsed: Array<ICard>
  setCardsUsedHandler: (params: any) => void
  player: ICharacter
}
