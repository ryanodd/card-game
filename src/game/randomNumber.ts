export const random = () => {
  return Math.random()
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray = (array: any[]) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
