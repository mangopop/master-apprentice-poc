
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
  if (min > max) {
    min = max
  }
  return Math.round(Math.random() * (max - min) + min)
}

export function getRandom(value: number): number {
  return Math.round(Math.random() * value)
}