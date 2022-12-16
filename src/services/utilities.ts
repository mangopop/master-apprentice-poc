
export function shuffle(array: any[]): any[] {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export function getRandomArbitrary(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min)
}

export function getRandom(value: number): number {
  return Math.round(Math.random() * value)
}

export function getTypeBonus(types: string[]) {
  const matching = types.every((type) => {
    return type === types[0]
  })

  if (matching) {
    switch (types[0]) {
      case 'dwarf':
        // 3 matching dwarf items - give 20 strength bonus
        return { strength: 10 }
      case 'human':
        // 3 matching human items - give 20 attack bonus
        return { attack: 10 }
      case 'elf':
        // 3 matching elf items - give 20 agility bonus
        return { agility: -500 }
      default:
        return false
    }
  }
}