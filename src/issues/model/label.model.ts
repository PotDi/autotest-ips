import { getRandomString } from "../../common/data/generateData"

type LabelModel = {
    name: string,
    color?: string,
    description?: string,
}

const labelData: LabelModel = { //написать функцию по типу issue.model
    name: 'baguly',
    color: 'd0b783',
    description: getRandomString(3)
}

function createLabelModel(entities?: Partial<LabelModel>): LabelModel {
    return {
        name: entities?.name ?? getRandomString(6, { label: true }),
        color: entities?.color,
        description: entities?.description
    }
}

export {
    LabelModel,
    labelData,
    createLabelModel,

}