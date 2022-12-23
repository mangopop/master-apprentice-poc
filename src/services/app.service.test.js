import { randAttackModifier } from './app.service'

let playerStartStats = {
  name: 'player',
  attack: 7,
  defence: 7,
  strength: 7,
  agility: 2000,
  magic: 7,
  life: 100,
  armour: 1.0,
  weapon: 1.0,
  stamina: 100,
  count: 0,
}

test('returns number from 0 - 100', () => {
  expect(randAttackModifier(playerStartStats)).toBe(true)
})

playerStartStats.stamina = 0

test('returns number from 0 - 100', () => {
  expect(randAttackModifier(playerStartStats)).toBe(false)
})
