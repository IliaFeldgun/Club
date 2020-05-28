import IWizBet from "../interfaces/WizBet"

export default class WizBet implements IWizBet {
    takes: number

    constructor(takes: number) {
        this.takes = takes
    }
}