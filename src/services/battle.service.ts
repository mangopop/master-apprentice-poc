import { Dispatch, SetStateAction } from 'react'
import ICard from '../interfaces/card'
import ICharacter from '../interfaces/character'

export function getTypeBonus(types: string[]):
  | {
      strength?: number
      attack?: number
      agility?: number
    }
  | false {
  const matching = types.every((type) => {
    return type === types[0]
  })

  if (matching) {
    switch (types[0]) {
      case 'dwarf':
        // 3 matching dwarf items - give 10 strength bonus
        return { strength: 10 }
      case 'human':
        // 3 matching human items - give 10 attack bonus
        return { attack: 10 }
      case 'elf':
        // 3 matching elf items - give 500 agility bonus
        return { agility: -500 }
      default:
        return false
    }
  }

  return false
}

export function setBonuses(
  player: ICharacter,
  cardsUsed: ICard[],
  setFolkLoreBonusCallback: Dispatch<SetStateAction<boolean>>,
  setPlayerHandlerCallback: (param: (param: ICharacter) => void) => void
) {
  let typeMatch: Array<string> = []
  cardsUsed.forEach((element) => {
    if (element.type) {
      typeMatch.push(element.type)
    }
  })

  let bonus: false | {} = false

  if (typeMatch.length === 3) {
    bonus = getTypeBonus(typeMatch)
  }

  // TODO this will need to reset??
  type PlayerKey = keyof typeof player
  type BonusKey = keyof typeof bonus
  if (bonus) {
    setFolkLoreBonusCallback(true)
    let modifier = Object.keys(bonus)[0]
    bonus = {
      [modifier]: player[modifier as PlayerKey] + bonus[modifier as BonusKey],
    }
    setPlayerHandlerCallback((player) => {
      return {
        ...player,
        ...bonus,
      }
    })
  }
}
