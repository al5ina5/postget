import '../reset.css'
import '../global.scss'

export default function App({ Component, pageProps }) {
    return <>
        <Component {...pageProps} />
    </>
}