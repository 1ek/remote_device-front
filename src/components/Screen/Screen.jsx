import { useRef, useReducer, useState } from 'react'

import RFB from '../../../noVNC/core/rfb'

import './Screen.scss'
import '../Buttons/Buttons.scss'


const Screen = ({ url }) => {
    const [loading, setLoading] = useState(false)
    const [connected, setConnected] = useState(false)

    
    const screen = useRef(null)
    const rfb = useRef(null)
    const device_url = useRef(null)
    // const eventListeners = useRef({})


    const setRfb = (_rfb) => {
        rfb.current = _rfb;
    }

    const getRfb = () => {
        return rfb.current;
    }


    const onConnect = () => {
        console.log('CONNECTED')
        setLoading(false)
        setConnected(true)
    }

    const onDisconnect = () => {
        console.log('DISCONNECTED')
        setLoading(false)
        setConnected(false)
    }

    const onCredentialsrequired = () => {
        const session = getRfb()
        const pass = prompt('PASSWORD REQUIRED:')
        session.sendCredentials({password: pass})
    }

    const events = {
        connect: onConnect,
        disconnect: onDisconnect,
        credentialsrequired: onCredentialsrequired
    }


    const connect = (device_url) => {
        if (!device_url) { throw 'URL is required' }
        const res_url = `ws://${device_url}:6080/websockify?token=SA1`
        const _rfb = new RFB(screen.current, res_url)

        _rfb.clipViewport = true
        _rfb.scaleViewport = true
        _rfb.qualityLevel = 6
        _rfb.compressionLevel = 2
        _rfb.background = '#000'
        setRfb(_rfb)

        const addEventListeners = (_rfb) => {
            Object.keys(events).forEach(event => {
                _rfb.addEventListener(event, events[event])
            })
        }

        addEventListeners(_rfb)

        setLoading(true)
    }

    const disconnect = () => {
        const session = getRfb()
        if (!session) {
            console.error('There is no session to disconnect from')
            return
        }

        const removeEventListeners = (_rfb) => {
            Object.keys(events).forEach(event => {
                _rfb.removeEventListener(event, events[event])
            })
        }

        removeEventListeners(session)
      
        session.disconnect()
        setRfb(null)
        setConnected(false)
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
                        <input className='device__ip' type="text" ref={device_url}/>
                        <button disabled={loading} className='device__button button__unique' onClick={() => connect(device_url.current.value)}>CONNECT</button>
                    </div> 
                : null}
            </div>
            
        </div>
        </>
    )
}

export default Screen