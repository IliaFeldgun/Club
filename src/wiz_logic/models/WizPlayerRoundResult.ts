export default interface IWizPlayerRoundResult {
    totalCards: number
    successfulTakes: number

    addTake: () => void
}