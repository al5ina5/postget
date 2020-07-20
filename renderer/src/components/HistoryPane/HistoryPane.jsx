import { useEffect, useState } from 'react'
import styles from './HistoryPane.module.scss'
import { Base64 } from 'js-base64'

export default function HistoryPane(props) {
    return <>
        <div className={`${styles.HistoryPane} pane padded`}>
            <button onClick={() => {
                alert(Base64.decode('IyBQb3N0Z2V0CgpQb3N0IGdldCBpcyBzaW1wbGUgdXRpbGl0eSBmb3Igd2Vi\nIGRldmVsb3BlcnMgdG8gdGVzdCBBUEkncyBlYXNpbHkgYW5kIHF1aWNrbHku\nCgpQb3N0Z2V0IGlzIGJ1aWx0IGVudGlyZWx5IGluIEphdmFTY3JpcHQsIHVz\naW5nIEVsZWN0cm9uLCBOZXh0SlMsIFJlYWN0LCBhbmQgbW9yZS4KCiFbUG9z\ndGdldF0oaHR0cHM6Ly9pLmltZ3VyLmNvbS9PdnFkVlg4LnBuZykKCiMgRG93\nbmxvYWRzCgpfY29taW5nIHNvb24uLi5fCg==\n'))
            }}>fsaad</button>
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