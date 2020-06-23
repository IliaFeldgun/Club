import IAnnouncement from "../../engine/interfaces/Announcement";
import IPlayer from "../../engine/interfaces/Player";
import { WizAnnouncementType } from "./WizAnnouncementType";


export default interface IWizAnnouncement extends IAnnouncement {
    type: WizAnnouncementType
    player: IPlayer["id"]
}