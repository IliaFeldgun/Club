import React from "react"
import CookieConsent from 'react-cookie-consent'

export default class Footer extends React.PureComponent{
    render() {
        return (
            <footer>
                <CookieConsent 
                    location="bottom" 
                    sameSite="strict"
                >
                    This site depends on using cookies to provide you the experience.
                </CookieConsent>
            </footer>
        )
    }
}