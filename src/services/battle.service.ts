export function getTypeBonus(types: string[]): {
  strength?: number
  attack?: number
  agility?: number
} {
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
        return {}
    }
  }

  return {}
}
