function checkAccess(age: number): void {
  if (age >= 18) {
    console.log("Страница доступна")
  } else console.log("Страница недоступна")
}

checkAccess(17)
