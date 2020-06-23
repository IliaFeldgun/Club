import React from "react";
import IWizAnnouncement from "../interfaces/WizAnnouncement";
import ANNOUNCEMENT_MAP from "../text_map/AnnouncementMap";
import { WizAnnouncementType } from "../interfaces/WizAnnouncementType";
import IWizPlayer from "../interfaces/WizPlayer";
import { getPlayerId } from "../../utils/Cookie";

interface IAnnouncementProps {
    announcement: IWizAnnouncement
    players: IWizPlayer[]
}
interface IAnnouncementState {
    show: boolean
    previousVersion: number
}
export default class Announcement extends React.PureComponent
    <IAnnouncementProps, IAnnouncementState> {
    constructor(props: IAnnouncementProps) {
        super(props)
        this.state = {
            show: false,
            previousVersion: 0
        }
    }
    componentDidUpdate() {
        if (
            this.props.announcement.player !== getPlayerId() &&
            this.props.announcement &&
            this.props.announcement.type !== WizAnnouncementType.NONE &&
            this.props.announcement.version > this.state.previousVersion
        ) { 
            this.displayAnnouncement(3000)
        }
    }
    render() {
        const text = this.getText()
        let classes = "grey-popup" 
        classes += this.state.show ? " show" : ""
        
        return (
            <span className={classes}>
                {text}
            </span>
        )
    }
    displayAnnouncement(time: number) {
        this.setState({
            show: true
        })
        setTimeout(() => { 
            this.setState({
                show: false,
                previousVersion: this.props.announcement.version
            })
         }, time);
    }
    getText() {
        let text: string = ""
        const type = this.props.announcement.type
        const player = this.props.players.find((player) => {
            return player.id === this.props.announcement.player
        })
        if (player) {
            switch (type) {
                case WizAnnouncementType.PLACED_BET:
                    text = ANNOUNCEMENT_MAP[WizAnnouncementType.PLACED_BET](
                        player.name,
                        player.bet
                    )
                    break
                case WizAnnouncementType.PLAYED_CARD:
                    text = ANNOUNCEMENT_MAP[WizAnnouncementType.PLAYED_CARD](
                        player.name
                    )
                    break
                case WizAnnouncementType.WON_TAKE:
                    text = ANNOUNCEMENT_MAP[WizAnnouncementType.WON_GAME](
                        player.name
                    )
                    break
                case WizAnnouncementType.WON_GAME:
                    text = ANNOUNCEMENT_MAP[WizAnnouncementType.PLAYED_CARD](
                        player.name
                    )
                    break
                default:
                    break
            }
        }

        return text
    }
}