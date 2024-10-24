class Car {
    stateOn: boolean

    constructor() {
        this.stateOn = false
    }

    turnOn() {
        this.stateOn = true
        console.log(`Машина заведена`)
    }
    turnOff() {
        this.stateOn = false
        console.log(`Машина выключена`)
    }
    getState() {
        this.turnOff()
    }
}

const car: Car = new Car()
console.log(car.getState())