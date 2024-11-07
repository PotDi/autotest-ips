function print(): void {
    const promise: Promise<string> = new Promise((resolve, reject) => {
        setTimeout(() => resolve('resolve'), 1000)
        setTimeout(() => reject('reject'), 100)
    })

    promise
        .then(result => console.log(`'Fullfield: ${result}'`))
        .catch(err => console.log(`'Rejected: ${err}'`))
}
print()
