import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faHistory } from '@fortawesome/free-solid-svg-icons'

export default function Header(props) {
    var [electronWindow, setElectronWindow] = useState()
    useEffect(() => {
        const remote = window.require('electron').remote
        setElectronWindow(remote.getCurrentWindow())
    }, [])

    return <>
        <div className="controls">
            <div>
                <FontAwesomeIcon className="icon" color="red" icon={faCircle} onClick={() => {
                    electronWindow.close()
                }} />
            </div>
            <div>
                <FontAwesomeIcon className="icon" color="yellow" icon={faCircle} onClick={() => {
                    electronWindow.minimize()
                }} />
            </div>
            <div>
                <FontAwesomeIcon className="icon" color="lime" icon={faCircle} onClick={() => {
                    electronWindow.isFullScreen() ? electronWindow.setFullScreen(false) : electronWindow.setFullScreen(true)
                }} />
            </div>
            <div
                onClick={() => {
                    props.setHistoryPaneStatus(props.historyPaneStatus ? false : true)
                }}
                style={{
                    marginLeft: 'auto'
                }}>
                <FontAwesomeIcon className="icon" color="grey" icon={faHistory} />
            </div>
        </div>
    </>
}