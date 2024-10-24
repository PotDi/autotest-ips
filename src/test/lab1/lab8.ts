function getRandomString(len: number): string {
    var num = ' '
    while (num.length < len)
        num += Math.random()
    return num.toString()
}

console.log(getRandomString(2))