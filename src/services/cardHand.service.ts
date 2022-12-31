import ICard from '../interfaces/card'

// this should apply the card.weapon update to the player.weapon update
export function updateWeapon(
  weaponRequirements: number,
  cardsUsed: ICard[],
  arenaBoost: number,
  playerWeapon: number,
  cardWeapon?: number,
  cardWeaponBonus?: number
) {
  let weaponUpdate = 1 // act as base player weapon

  if (!cardWeapon) {
    return weaponUpdate
  }

  // played item and have existing card weapon add to player.weapon
  // should not be able to arena boost and play item
  if (weaponRequirements && cardWeaponBonus) {
    cardsUsed.forEach((cardUsed) => {
      if (cardUsed.weapon) {
        // this assumes that playerWeapon was already updated by the cardWeapon
        weaponUpdate = playerWeapon * cardWeaponBonus // 1 * 1.2(1.2) // 1.3 * 1.2(1.52)
      }
    })
  }

  // if we have card weapon and arena boost apply to weapon
  if (cardWeapon && arenaBoost) {
    weaponUpdate = cardWeapon * arenaBoost // 1.5 * 1.25(1.875)
  }

  if (cardWeapon && !arenaBoost) {
    weaponUpdate = playerWeapon * cardWeapon // check this
  }

  return weaponUpdate
}

export function calculateSkills(
  cardSkill: any,
  playerSkill: any,
  monsterElements: string[], // break out the characters to help here
  playerElements: string[], // break out the characters to help here
  arenaBoost: { agility: number; other: number },
  arenaBoostType = 'other'
) {
  let arenaBoostSkill =
    arenaBoostType === 'agility' ? arenaBoost.agility : arenaBoost.other

  return Math.round((playerSkill + cardSkill) * arenaBoostSkill)
}

export function getElementBonus(
  playerSkill: any | number,
  cardElements: string[],
  monsterElements: string[]
): number {
  let result = playerSkill
  // upgrade the attack skill by 20% if player has element that monster doesn't
  if (cardElements.length > 0) {
    const intersection = cardElements.filter((element) =>
      monsterElements.includes(element)
    )

    if (intersection.length < 1) {
      result = playerSkill *= 1.2
    }
  }

  return result
}