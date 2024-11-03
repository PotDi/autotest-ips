function getRandomString(len: number) {
    let result = ''
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLen = char.length;
    let counter = 0
    while (counter < len) {
        result += char.charAt(Math.floor(Math.random() * charLen));
        counter += 1;
    }
    return result
}
export {
    getRandomString,
}