import { AnnouncementType } from "../enums/AnnouncementType";
import IWizAnnouncement from "../interfaces/WizAnnouncement";
import IPlayer from "../../engine/lobby/interfaces/Player";

export default class WizAnnouncement implements IWizAnnouncement {
    version: number
    type: AnnouncementType
    player: IPlayer["id"]
    clientMessage?: string

    constructor(
        version: number,
        type: AnnouncementType,
        player: IPlayer["id"],
        clientMessage?: string) {
        this.version = version
        this.type = type
        this.player = player
        this.clientMessage = clientMessage
    }
}