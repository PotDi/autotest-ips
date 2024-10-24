const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => resolve('resolve'), 2000)
})
console.log('test')
promise.then(result =>
    console.log('Fulfilled: ', result)
)