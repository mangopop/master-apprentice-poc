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
export function randAttackModifier(
  weapon: number,
  stamina: number,
  attack: number
) {
  const weaponStat = weapon ? weapon : 1
  const chanceToHit = Math.min(
    Math.max(stamina * weaponStat + (attack + 10), 1),
    100
  )

  const randomHitChance = getRandomArbitrary(0, 100)
  const hit = randomHitChance < chanceToHit

  // console.log(
  //   `${character.name} - randomHitChance: ${randomHitChance}, chance to hit: ${chanceToHit} - ${hit}`
  // )

  return hit
}

// TODO armour does very little, we could use it to determine chance of block.
function randDefenceModifier() {

}

// uses player attack, weapon and strength to determine damage.
// uses monster defence, armour
export function getStrikeDamage(
  aAttack: number,
  aWeapon: number,
  aStrength: number,
  dDefence: number,
  dArmour: number,
  attackerCallback: (params: (params: ICharacter) => void) => void,
  defenderCallback: (params: (params: ICharacter) => void) => void
) {
  // eg 10 * 1.2 = 12 | 20 * 1.2 = 14 | 10 * 1.8 = 18 | 20 * 1.8 = 36
  const finalAttack = aAttack * aWeapon
  console.log('ATTACK')

  const finalDefence = dDefence * dArmour
  // if strength higher will always get max attack plus strength (from critical)
  let attackMove = getRandomArbitrary(aStrength, finalAttack)
  // console.log(attackMove)
  if (attackMove === aAttack) {
    console.log('critical attack!')
    // TODO this still might not do damage
    attackMove += aStrength / 2
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

  // TODO can we tie in agility here? Could give an inverse percentage boost?
  // 2.5 - 5 | 5 - 10
  let blockMove = getRandomArbitrary(finalDefence / 2, finalDefence)
  // console.log(blockMove)
  if (blockMove === dDefence) {
    console.log('critical block!')

    blockMove *= dArmour
  }
  // console.log('attack move', attackMove)
  // console.log('block move', blockMove)
  attackerCallback((attacker) => {
    return { ...attacker, count: attacker.count + 1 }
  })

  // console.log('damage', attackMove - blockMove)
  return Math.max(0, attackMove - blockMove)
}
