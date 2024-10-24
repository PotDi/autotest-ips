type Student = {
    name: string
    age: number
}

const student: Student[] = [
    {
        name: 'Вася',
        age: 19
    },
    {
        name: 'Миша',
        age: 20
    },
    {
        name: 'Юля',
        age: 18
    },
    {
        name: 'Света',
        age: 21
    }
]

// const result = student.map(item => item.name)
// console.log(result)

student.forEach(student => {
    console.log(`${student.name}, ${student.age}`)
})