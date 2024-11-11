function getRandomString(len: number): string {
    var num = ' '
    while (num.length < len)
        num += Math.random()
    return num.toString()
}

function getRandomElement(array: string[]): string {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

const elements: string[] = [
    'documentation',
    'bug',
    'duplicate',
    'wontfix',
    'question',
    'invalid',

]
const randomElement = getRandomElement(elements)

console.log(getRandomString(2))
console.log(randomElement)