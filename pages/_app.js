import { Provider } from 'react-redux'
import { useStore } from '../store'
import '../assets/css/_main.css'
import 'swiper/swiper.scss'
import '../i18n/i18n'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
