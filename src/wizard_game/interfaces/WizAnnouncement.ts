import IAnnouncement from "@engine/announcer/interfaces/Announcement";
import { AnnouncementType } from "../enums/AnnouncementType";
import IPlayer from "../../engine/lobby/interfaces/Player";

export default interface IWizAnnouncement extends IAnnouncement {
    type: AnnouncementType
    player: IPlayer["id"]
}