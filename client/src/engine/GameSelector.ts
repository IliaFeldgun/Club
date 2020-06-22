import { WizApi } from "../wiz/api/WizApi";

export default function createGame(name: string) {
    switch (name.toLowerCase()){
        case "wizard":
            return WizApi.newGame
        default:
            return undefined
    }
}