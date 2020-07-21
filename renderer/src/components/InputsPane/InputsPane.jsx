
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-twilight'
import { parseHeaders, parseData } from '../../utils'

export default function InputsPane(props) {
    return <>
        <div className="pane" id="requestInputs">
            <input type="text" id="requestURL" value={props.requestURL} placeholder="http://localhost:3000/endpoint" onChange={(e) => {
                props.setRequestURL(e.target.value)
            }} />
            <div id="requestOptions">
                <div>
                    <button className={(props.requestMethod == 'POST') ? 'active' : ''} onClick={(e) => {
                        props.setRequestMethod('POST')
                    }}>
                        POST
							</button>
                </div>
                <div>
                    <button className={(props.requestMethod == 'GET') ? 'active' : ''} onClick={(e) => {
                        props.setRequestMethod('GET')
                    }}>
                        GET
							</button>
                </div>
            </div>
            <AceEditor
                mode="json"
                theme="twilight"
                name="requestDataInput"
                width="100%"
                height="100%"
                editorProps={{ $blockScrolling: true }}
                setOptions={{ useWorker: false }}
                wrapEnabled={true}
                showPrintMargin={false}
                value={props.requestData}
                fontSize="16px"
                onChange={(e) => {
                    props.setRequestData(e)
                    props.setParsedRequestContent(parseData(e))
                }}
            // className={parsedRequestContent ? '' : 'error'}
            />
            <AceEditor
                mode="json"
                theme="twilight"
                name="requestHeadersInput"
                width="100%"
                height="40%"
                editorProps={{ $blockScrolling: true }}
                setOptions={{ useWorker: false }}
                wrapEnabled={true}
                showPrintMargin={false}
                value={props.requestHeaders}
                fontSize="16px"
                onChange={(e) => {
                    props.setRequestHeaders(e)
                    props.setParsedRequestHeaders(parseHeaders(e))
                }}
            />
        </div>
    </>
}