import ICard from '../interfaces/card'

// this should apply the card.weapon update to the player.weapon update
export function updateWeapon(
  card: ICard,
  cardsUsed: ICard[],
  arenaBoost: number,
  playerWeapon: number,
  cardWeapon?: number,
  cardWeaponBonus?: number
) {
  let weaponUpdate = 1 // act as base player weapon

  // played item and have existing card weapon add to player.weapon
  // should not be able to arena boost and play item
  if (card.requirements.weapon && cardWeaponBonus) {
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
    weaponUpdate = playerWeapon * cardWeapon
  }

  return weaponUpdate
}
