import ICard from './card'
import ICharacter from './character'

export default interface ITrainProps {
  player: ICharacter
  playerBeforeCardsPlayed: ICharacter
  setPlayerHandler: (params: (params: ICharacter) => void) => void
}
