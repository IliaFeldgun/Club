import IAnnouncement from "../interfaces/Announcement"

export default class Announcement implements IAnnouncement {
    type: string
    message: string
    version: number
}