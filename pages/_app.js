import { Provider } from 'react-redux'
import { useStore } from '../store'
import '../assets/css/_main.css'
import 'swiper/swiper.scss'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
