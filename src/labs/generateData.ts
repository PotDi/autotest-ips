function getRandomString(len: number): string { //вынести в отдельный файл(поправлено)
    var num = ' '
    while (num.length < len)
        num += Math.random()
    return num.toString()
}

export {
    getRandomString,
}