type Cat = {
    name: string,
    color: string,
    age: number,
}

const cat: Cat = {
    name: 'Busya',
    color: 'white',
    age: 4,
}

console.log(`Имя: ${cat.name}`)
console.log(`Цвет: ${cat.color}`)
console.log(`Возвраст: ${cat.age}`)





// function printCats(pet: Pet): string {
//     return `Кошка по имени ${pet.name}`
// }

// const pet: Pet = { name: 'Dusya', color: 'white' }
// // const cat: Cat = { name: 'Busya', color: 'black' }

// console.log(printCats(pet))