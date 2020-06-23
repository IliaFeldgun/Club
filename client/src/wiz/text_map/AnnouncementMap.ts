import { WizAnnouncementType } from "../interfaces/WizAnnouncementType";

const ANNOUNCEMENT_MAP = {
    [WizAnnouncementType.PLACED_BET]: (playerName: string, bet: number) => {
        return `${playerName} thinks he can take ${bet}`
    },
    [WizAnnouncementType.PLAYED_CARD]: (playerName: string) => {
        return `${playerName} played card`
    },
    [WizAnnouncementType.WON_TAKE]: (playerName: string) => {
        return `${playerName} took this one`
    },
    [WizAnnouncementType.WON_GAME]: (playerName: string) => {
        return `That's it, ${playerName} won`
    }
}

export default ANNOUNCEMENT_MAP