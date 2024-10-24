const generateNumber = () => {
    const array = []
    for (let i = 1; i <= 100; i++) {
        array.push(i)
    }
    return array  //сделать через if else
}
console.log(generateNumber())

const calc = (n: number, func: () => void) => {
    return n % 2 !== 0
}