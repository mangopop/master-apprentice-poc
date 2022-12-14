export default interface ICard {
  name: string
  description: string
  attack: number
  defence: number
  strength: number
  agility: number
  life: number
  armour: number
  weapon: number
  stamina: number
  disabled: boolean
  init: Function
  type: string
  element: string
}
