import { useEffect, useState } from 'react'
import styles from './HistoryPane.module.scss'

export default function HistoryPane(props) {
    return <>
        <div className={`${styles.HistoryPane} pane padded`}>
            <div className={styles.History}>
                <h2>History</h2>
                {global.db && <>
                    {global.db.get('requests').value().slice(0).reverse().map((request, index) => <>
                        <pre key={index} onClick={(e) => {
                            props.setRequestURL(request.requestURL)
                            props.setRequestMethod(request.requestMethod)
                            props.setRequestContent(request.requestContent)
                            props.setRequestHeaders(request.requestHeaders)
                            props.setRequestResponse(request.requestResponse)
                        }}>
                            {request.requestURL}
                        </pre>
                    </>)}
                </>}
                <h5>Your request history will appear here.</h5>
            </div>
        </div>
    </>
}