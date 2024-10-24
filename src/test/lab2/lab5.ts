async function print(): Promise<void> {
    const promise: Promise<string> = new Promise((resolve) => {
        setTimeout(() => resolve('resolve'), 2000)
    })

    const result = await promise
    console.log(result)
}

print()
