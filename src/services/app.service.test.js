import { randAttackModifier, getStrikeDamage } from './app.service'
// import { getRandomArbitrary } from './utilities.service'
import * as utilitiesModule from '../services/utilities.service'
describe('app tests', () => {
  beforeEach(() => jest.clearAllMocks())
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks()
  })

  test.each([
    [7, 1.0, 100, true],
    [7, 1.0, 0, false],
  ])('.randAttackModifier(%i, %i, %i)', (a, b, c, expected) => {
    expect(randAttackModifier(a, b, c)).toBe(expected)
  })

  test('get strike damage', () => {
    // const getRandomArbitraryMock = (utilitiesModule.getRandomArbitrary = jest.fn())
    // getRandomArbitraryMock.mockReturnValue(5)

    // these callbacks might able to be called as blank - as they update stuff not testing
    const attackerCallback = jest.fn()
    const defenderCallback = jest.fn()
    jest
      .spyOn(utilitiesModule, 'getRandomArbitrary')
      .mockReturnValueOnce(50) // attack move
      .mockReturnValueOnce(10) // defence move
    expect(
      getStrikeDamage(7, 1.0, 5, 5, 1, attackerCallback, defenderCallback, 3)
    ).toBe(40) // 50-10
  })
})
