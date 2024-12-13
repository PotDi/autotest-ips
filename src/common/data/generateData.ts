function getRandomString(len: number, options?: { desc?: boolean, title?: boolean, label?: boolean }) {
    let result = ''
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLen = char.length;
    let counter = 0
    while (counter < len) {
        result += char.charAt(Math.floor(Math.random() * charLen));
        counter += 1;
    }

    if (options?.desc) {
        result += '_description_issue'
    }

    if (options?.title) {
        result += '_title_issue'
    }

    if (options?.label) {
        result += '_label_issue'
    }

    return result
}

export {
    getRandomString,
}