import { useRef, useEffect } from 'react'

import RFB from '../../../noVNC/core/rfb'

import './Screen.scss'
import '../Buttons/Buttons.scss'
const Screen = ({ url }) => {

    const screen = useRef(null)
    const rfb = useRef(null)

    // useEffect(() => {
        
    // }, [])

    const setRfb = (_rfb) => {
        rfb.current = _rfb;
    }

    const getRfb = () => {
        return rfb.current;
    };

    const connect = () => {
        // screen.current.innerHTML = ''
        const _rfb = new RFB(screen.current, url)
        _rfb.background = '#000'

        _rfb.addEventListener("credentialsrequired", () => {
            const pass = prompt("PASSWORD:")
            _rfb.sendCredentials({password: pass})
        })

        

    }

    
    
    
    return (
        <>
        <div className="screens__container">
            <div className="dashboard">
                <button className='device__button button__unique' onClick={connect}>CONNECT</button>
            </div>
            <div ref={screen} className="novnc_canvas">

            </div>
        </div>
        </>
    )
}

export default Screen