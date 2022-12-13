import ICard from './card'
import ICharacter from './character'

export default interface ICardHandProps {
  cardsInHand: Array<ICard>
  setPlayerHandler: (params: any) => void
  cardsDisabled: boolean
  cardsUsed: Array<ICard>
  setCardsUsedHandler: (params: Function) => void
  player: ICharacter
}
