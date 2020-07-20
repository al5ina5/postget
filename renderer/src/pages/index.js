import { useState, useRef, useEffect } from 'react'
import Axios from 'axios'
import AceEditor, { split as SplitEditor } from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-twilight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPaperPlane, faHistory } from '@fortawesome/free-solid-svg-icons'
import Typist from 'react-typist'
import { parseHeaders, parseData } from '../utils'

import HistoryPane from '../components/HistoryPane/HistoryPane'

export default function Index() {

	var initialContent = '' + JSON.stringify({ data: "replace with your data!" }, null, 1)

	var initialHeaders = '' + 'Content-Type: application/json'

	var [historyPaneStatus, setHistoryPaneStatus] = useState(false)

	var [requestMethod, setRequestMethod] = useState('GET')
	var [requestURL, setRequestURL] = useState('https://official-joke-api.appspot.com/jokes/ten')
	var [requestContent, setRequestContent] = useState(initialContent)
	var [requestHeaders, setRequestHeaders] = useState(initialHeaders)

	var [parsedRequestContent, setParsedRequestContent] = useState(JSON.parse(initialContent))
	var [parsedRequestHeaders, setParsedRequestHeaders] = useState()

	var [requestResponse, setRequestResponse] = useState()

	var [electronWindow, setElectronWindow] = useState()
	useEffect(() => {
		const remote = window.require('electron').remote
		setElectronWindow(remote.getCurrentWindow())
	}, [])

	return <>
		<div className="window">
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
						setHistoryPaneStatus(historyPaneStatus ? false : true)
					}}
					style={{
						marginLeft: 'auto'
					}}>
					<FontAwesomeIcon className="icon" color="grey" icon={faHistory} />
				</div>
			</div>
			<div className='app'>
				<div className="pane" id="requestInputs">
					<input type="text" id="requestURL" value={requestURL} placeholder="http://localhost:3000/endpoint" onChange={(e) => {
						setRequestURL(e.target.value)
					}} />
					<div id="requestOptions">
						<div>
							<button className={(requestMethod == 'POST') ? 'active' : ''} onClick={(e) => {
								setRequestMethod('POST')
							}}>
								POST
							</button>
						</div>
						<div>
							<button className={(requestMethod == 'GET') ? 'active' : ''} onClick={(e) => {
								setRequestMethod('GET')
							}}>
								GET
							</button>
						</div>
						<div></div>
						<div>
							<button onClick={(e) => {
								setRequestURL()
							}}>
								RANDOM API
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
						value={requestContent}
						fontSize="16px"
						onChange={(e) => {
							setRequestContent(e)
							setParsedRequestContent(parseData(e))
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
						value={requestHeaders}
						fontSize="16px"
						onChange={(e) => {
							setRequestHeaders(e)
							setParsedRequestHeaders(parseHeaders(e))
						}}
					/>
				</div>
				<div className="pane padded">
					<p>
						<button id="sendRequest" onClick={(e) => {
							e.preventDefault()

							var errors = []
							if (!requestURL) {
								errors.push('You must enter an endpoint URL to send a request, or else we don\'t know where to deliver the request data.')
							}

							if (errors.length) {
								alert(errors.join('\r\n'))
								return
							}

							if (requestMethod == 'POST') {
								console.log(parsedRequestContent)
								window.localStorage.setItem('one', 'two')
								Axios.post(requestURL, parsedRequestContent, {
									headers: parsedRequestHeaders
								})
									.then((response) => {
										setRequestResponse(response)
										console.log(response)
									})
									.catch((error) => {
										setRequestResponse({ error: error })
										console.log(error)
									})
							} else if (requestMethod == 'GET') {
								Axios.get(requestURL, parsedRequestContent, {
									headers: parsedRequestHeaders
								})
									.then((response) => {
										setRequestResponse(response)
										console.log(response)
									})
									.catch((error) => {
										setRequestResponse({ error: error })
										console.log(error)
									})
							} else {
								alert('Request method is not valid.')
							}

							global.db.get('requests')
								.push({
									requestURL,
									requestMethod,
									requestContent,
									requestHeaders,
									parsedRequestContent,
									parsedRequestHeaders,
									requestResponse
								})
								.write()
						}}>Send Request &nbsp; <FontAwesomeIcon icon={faPaperPlane} /></button>
					</p>
					<h1>Response</h1>

					{requestURL && <>
						<h3>Your requests will be sent to... </h3>
						<pre style={{
							textAlign: 'center'
						}}>{requestURL}</pre>
					</>}

					{!requestResponse && <>
						<h5>Your request's response data will appear here once you've sent a request. Firstly, use the pane to the left to modify the url, method, content, and headers of your request.</h5>
					</>}

					{requestResponse && <>
						<div className="response">
							<AceEditor
								mode="json"
								theme="twilight"
								showGutter={false}
								onChange={(e) => {
									console.log(e)
									console.log('12312')
								}}
								width="100%"
								readOnly={true}
								value={JSON.stringify(requestResponse, null, 1)}
								name="requestResponse"
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
				{historyPaneStatus && <>
					<HistoryPane
						setRequestURL={setRequestURL}
						setRequestMethod={setRequestMethod} setRequestContent={setRequestContent} setRequestHeaders={setRequestHeaders} setRequestResponse={setRequestResponse}
					/>
				</>}
			</div>
			<div className="footer">
				<p>
					POSTGET &copy; {new Date().getFullYear()}
					&nbsp;&nbsp;
					<a href="">Help</a>
					&nbsp;&nbsp;
					<a href="">GitHub</a>
					&nbsp;&nbsp;
					<a href="">Support</a>
				</p>
			</div>
		</div>
	</>
}