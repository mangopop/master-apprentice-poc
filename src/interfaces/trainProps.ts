import ICharacter from './character'

export default interface ITrainProps {
  train: (params: string) => void
  player: ICharacter
  trainingDisabled: boolean
}
