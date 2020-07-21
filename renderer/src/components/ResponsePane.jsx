import Axios from 'axios'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-twilight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function ResponsePane(props) {
    return <>
        <div className="pane padded">
            <p>
                <button id="sendRequest" onClick={(e) => {
                    e.preventDefault()

                    var errors = []
                    if (!props.requestURL) {
                        errors.push('You must enter an endpoint URL to send a request, or else we don\'t know where to deliver the request data.')
                    }

                    if (errors.length) {
                        alert(errors.join('\r\n'))
                        return
                    }

                    if (props.requestMethod == 'POST') {
                        console.log(props.parsedRequestContent)
                        Axios.post(props.requestURL, props.parsedRequestContent, {
                            headers: props.parsedRequestHeaders
                        })
                            .then((response) => {
                                props.setRequestResponse(response)
                                console.log(response)
                            })
                            .catch((error) => {
                                props.setRequestResponse({ error: error })
                                console.log(error)
                            })
                    } else if (props.requestMethod == 'GET') {
                        Axios.get(props.requestURL, props.parsedRequestContent, {
                            headers: props.parsedRequestHeaders
                        })
                            .then((response) => {
                                props.setRequestResponse(response)
                                console.log(response)
                            })
                            .catch((error) => {
                                props.setRequestResponse({ error: error })
                                console.log(error)
                            })
                    } else {
                        alert('Request method is not valid.')
                    }

                    global.db.get('requests')
                        .push({
                            requestURL: props.requestURL,
                            requestMethod: props.requestMethod,
                            requestData: props.requestData,
                            requestHeaders: props.requestHeaders,
                            parsedRequestContent: props.parsedRequestContent,
                            parsedRequestHeaders: props.parsedRequestHeaders,
                            requestResponse: props.requestResponse
                        })
                        .write()
                }}>Send Request &nbsp; <FontAwesomeIcon icon={faPaperPlane} /></button>
            </p>
            <h1>Response</h1>

            {props.requestURL && <>
                <h3>Your requests will be sent to... </h3>
                <pre style={{
                    textAlign: 'center'
                }}>{props.requestURL}</pre>
            </>}

            {!props.requestResponse && <>
                <h5>Your request's response data will appear here once you've sent a request. Firstly, use the pane to the left to modify the url, method, content, and headers of your request.</h5>
            </>}

            {props.requestResponse && <>
                <div className="response">
                    <AceEditor
                        mode="json"
                        theme="twilight"
                        showGutter={false}
                        width="100%"
                        readOnly={true}
                        value={JSON.stringify(props.requestResponse, null, 1)}
                        name="props.requestResponse"
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{ useWorker: false }}
                        wrapEnabled={true}
                        showPrintMargin={false}
                        fontSize="16px"
                        maxLines={Infinity}
                    // height="auto"
                    />
                </div>
            </>}
        </div>
    </>
}