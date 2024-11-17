import { getRandomString } from "../../common/data/generateData"

type LabelModel = {
    name: string[],
    color: string,
    description: string,
}

const labelData: LabelModel = {
    name: ['bug', 'wontfix', 'duplicate', 'invalid'],
    color: '#d0b783',
    description: getRandomString(3)
}

export {
    LabelModel,
    labelData,
}