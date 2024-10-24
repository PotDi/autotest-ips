const sum = (a: number, b: number) => {
    console.log('sum is: ', a + b)
}

const substract = (a: number, b: number) => {
    console.log('substract is: ', a - b)
}

const multiply = (a: number, b: number) => {
    console.log('multiply is: ', a * b)
}

const seg = (a: number, b: number) => {
    console.log('seg is: ', a / b)
}


function calc(
    c: number,
    d: number,
    func: (a: number, b: number) => void
): void {
    func(c, d)
}

calc(5, 4, multiply)
