import ICharacter from './character'

export default interface ITrainProps {
  train: (params: string) => void
  player: ICharacter
  playerBeforeCardsPlayed: ICharacter
  trainingDisabled: boolean
  setPlayerHandler: (params: (params: ICharacter) => void) => void
}
