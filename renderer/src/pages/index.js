import { useState } from 'react'

import Header from '../components/Header/Header'
import InputsPane from '../components/InputsPane/InputsPane'
import ResponsePane from '../components/ResponsePane'
import HistoryPane from '../components/HistoryPane/HistoryPane'
import Footer from '../components/Footer/Footer'

export default function Index() {
	var [historyPaneStatus, setHistoryPaneStatus] = useState(false)

	var initialContent = JSON.stringify({ example: "This is just an example. Replace it with your data!" }, null, 1)
	var initialHeaders = 'Example-Header-Key: example-header-value'

	var [requestMethod, setRequestMethod] = useState('GET')
	var [requestURL, setRequestURL] = useState('https://official-joke-api.appspot.com/jokes/ten')
	var [requestContent, setRequestContent] = useState(initialContent)
	var [requestHeaders, setRequestHeaders] = useState(initialHeaders)
	var [parsedRequestContent, setParsedRequestContent] = useState(JSON.parse(initialContent))
	var [parsedRequestHeaders, setParsedRequestHeaders] = useState()
	var [requestResponse, setRequestResponse] = useState()

	return <>
		<div className="window">
			<Header historyPaneStatus={historyPaneStatus} setHistoryPaneStatus={setHistoryPaneStatus} />
			<div className="app">
				<InputsPane
					requestMethod={requestMethod}
					setRequestMethod={setRequestMethod}
					requestURL={requestURL}
					setRequestURL={setRequestURL}
					requestContent={requestContent}
					setRequestContent={setRequestContent}
					setParsedRequestContent={setParsedRequestContent}
					requestHeaders={requestHeaders}
					setRequestHeaders={setRequestHeaders}
					setParsedRequestHeaders={setParsedRequestHeaders}
				/>
				<ResponsePane
					requestURL={requestURL}
					requestMethod={requestMethod}
					requestResponse={requestResponse}
					parsedRequestContent={parsedRequestContent}
					parsedRequestHeaders={parsedRequestHeaders}
					setRequestResponse={setRequestResponse}
				/>
				{historyPaneStatus && <>
					<HistoryPane
						setRequestURL={setRequestURL}
						setRequestMethod={setRequestMethod} setRequestContent={setRequestContent} setRequestHeaders={setRequestHeaders} setRequestResponse={setRequestResponse}
					/>
				</>}
			</div>

			<Footer />
		</div>
	</>
}