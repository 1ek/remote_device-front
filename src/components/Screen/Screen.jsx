import { useRef, useReducer, useState } from 'react'

import RFB from '../../../noVNC/core/rfb'

import './Screen.scss'
import '../Buttons/Buttons.scss'




const Screen = ({ url }) => {
   

    const [loading, setLoading] = useState(false)
    const [connected, setConnected] = useState(false)

    const screen = useRef(null)
    const rfb = useRef(null)




    const setRfb = (_rfb) => {
        rfb.current = _rfb;
    }

    const getRfb = () => {
        return rfb.current;
    };

    const connect = () => {
        setLoading(true)
        const _rfb = new RFB(screen.current, url)
        _rfb.clipViewport = true
        _rfb.scaleViewport = true
        _rfb.qualityLevel = 6
        setRfb(_rfb)

        _rfb.background = '#000'

        _rfb.addEventListener('connect', () => {
            console.log('CONNECTED')
            setLoading(false)
            setConnected(true)
        })

        _rfb.addEventListener('disconnect', () => {
            console.log('DISCONNECTED')
            setLoading(false)
            setConnected(false)
        })

        _rfb.addEventListener('credentialsrequired', () => {
            const pass = prompt('PASSWORD REQUIRED:')
            _rfb.sendCredentials({password: pass})
        })
    }

    const disconnect = () => {
        const session = getRfb()
        session.disconnect()
    }

    
    
    
    return (
        <>
        <div className="screens__container">
            <div className="dashboard">
                {connected ? <h3 className='connected'>CONNECTED</h3> : null}
                {loading ? <h3 className='loading'>Loading...</h3> : null}
                <button className='device__button button__dark' onClick={disconnect}>DISCONNECT</button>
            </div>
            <div ref={screen} className="novnc_canvas">
                {!loading && !connected ? 
                    <div className="screen_placeholder">
                        <button disabled={loading} className='device__button button__unique' onClick={connect}>CONNECT</button>
                    </div> 
                : null}
            </div>
            
        </div>
        </>
    )
}

export default Screen