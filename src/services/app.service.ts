import ICharacter from '../interfaces/character'
import { getRandomArbitrary } from './utilities.service'
// uses player weapon, stamina and attack to determine hit chance
// the better the weapon and stamina, the better the chance.
// ? doesn't take into account the monster
// s10 * w1 (10) + (10+10) = 30
// s20 * w1 (10) + (10+10) = 40
// s30 * w1 (10) + (10+10) = 50
// s30 * w1.2 (10) + (10+10) = 36
// s10 * w1.3 (13) + (10+10) = 33
// s10 * w1.8 (18) + (10+10) = 38
// bit stuck around this make
// s50 * w1.2 (60) + (10+10) = 80
// s70 * w1 (70) + (10+10) = 90

// s90 * w1 (90) + (10+10) = > 100
export function randAttackModifier(character: ICharacter) {
  const weapon = character.weapon ? character.weapon : 1
  const chanceToHit = Math.min(
    Math.max(character.stamina * weapon + (character.attack + 10), 1),
    100
  )

  const randomHitChance = getRandomArbitrary(0, 100)
  const hit = randomHitChance < chanceToHit

  console.log(
    `${character.name} - randomHitChance: ${randomHitChance}, chance to hit: ${chanceToHit} - ${hit}`
  )

  return hit
}

// uses player attack, weapon and strength to determine damage.
// uses monster defence, armour
export function getStrikeDamage(
  attacker: ICharacter,
  defender: ICharacter,
  attackerCallback: (params: (params: ICharacter) => void) => void,
  defenderCallback: (params: (params: ICharacter) => void) => void
) {
  // eg 10 * 1.2 = 12 | 20 * 1.2 = 14 | 10 * 1.8 = 18 | 20 * 1.8 = 36
  const finalAttack = attacker.attack * attacker.weapon
  console.log('ATTACK')

  const finalDefence = defender.defence * defender.armour
  // if strength higher will always get max attack plus strength (from critical)
  let attackMove = getRandomArbitrary(attacker.strength, finalAttack)
  if (attackMove === attacker.attack) {
    console.log('critical attack!')
    // TODO this still might not do damage
    attackMove += attacker.strength
    defenderCallback((defender) => {
      return {
        ...defender,
        critical: true,
      }
    })
  } else {
    defenderCallback((defender) => {
      return {
        ...defender,
        critical: false,
      }
    })
  }

  let blockMove = getRandomArbitrary(finalDefence / 2, finalDefence)
  if (blockMove === defender.defence) {
    console.log('critical block!')

    blockMove *= defender.armour
  }
  // console.log('attack move', attackMove)
  // console.log('block move', blockMove)
  attackerCallback((attacker) => {
    return { ...attacker, count: attacker.count + 1 }
  })

  // console.log('damage', strike)
  return Math.max(0, attackMove - blockMove)
}
