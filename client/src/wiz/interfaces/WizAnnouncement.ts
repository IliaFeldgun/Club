import IAnnouncement from "../../engine/interfaces/Announcement";
import IPlayer from "../../engine/interfaces/Player";
import { AnnouncementType } from "./AnnouncementType";


export default interface IWizAnnouncement extends IAnnouncement {
    type: AnnouncementType
    player: IPlayer["id"]
}