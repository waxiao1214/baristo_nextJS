/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next';
import { useStore } from '../store'
import '../assets/css/_main.css'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import i18n from '../i18n/i18n'
import 'swiper/components/navigation/navigation.scss';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nextProvider>
    </Provider>
  )
}
