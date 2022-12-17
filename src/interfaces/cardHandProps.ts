import ICard from './card'
import ICharacter from './character'

export default interface ICardHandProps {
  arena: { name: string; type: string }
  cardsInHand: Array<ICard>
  ownedCards: Array<ICard>
  setPlayerHandler: (params: any) => void
  cardsDisabled: boolean
  cardsUsed: Array<ICard>
  setCardsUsedHandler: (params: Function) => void
  player: ICharacter
}
