import IAnnouncement from "@engine/announcer/interfaces/Announcement";
import { WizAnnouncementType } from "../enums/WizAnnouncementType";
import IPlayer from "../../engine/lobby/interfaces/Player";

export default interface IWizAnnouncement extends IAnnouncement {
    type: WizAnnouncementType
    player: IPlayer["id"]
}