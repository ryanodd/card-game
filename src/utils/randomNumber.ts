export const getRandomSeed = () => {
  return (Math.random() * 2 ** 32) >>> 0
}

// Splitmix32 algorithm
export const random = (seed: number) => {
  seed |= 0
  seed = (seed + 0x9e3779b9) | 0
  let t = seed ^ (seed >>> 16)
  t = Math.imul(t, 0x21f0aaad)
  t = t ^ (t >>> 15)
  t = Math.imul(t, 0x735a2d97)
  return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296
}

// For generating seed from string
export const cyrb128 = (str: string) => {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i)
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067)
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233)
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213)
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179)
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067)
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233)
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213)
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179)
  ;(h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1)
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0]
}

export const getSeedFromString = (str: string) => {
  return cyrb128(str)[0]
}

// Generates a random int from 0 to max-1
export const getRandomInt = (max: number, seed: number): number => {
  return Math.floor(random(seed) * max)
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
// needs N seeds? get a better algorithm?
export const shuffleArray = (array: any[]) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(random(getRandomSeed()) * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

export function getRandomItemFromArray<T>(list: T[], seed: number): T | undefined {
  if (list.length === 0) {
    return undefined
  }
  return list[getRandomInt(list.length, seed)]
}

export const getDateString = () => {
  return new Date().toISOString().slice(0, 10) // Changes each day. Always UTC time zone.
}
