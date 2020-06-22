import IWizScore from "../interfaces/WizScore"

export default class WizScore implements IWizScore {
    total: number

    constructor() {
        this.total = 0
    }
}