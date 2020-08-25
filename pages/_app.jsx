/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import '../assets/css/_main.css'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import { appWithTranslation } from '../i18n/i18n';
import 'swiper/components/navigation/navigation.scss';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })

export default appWithTranslation(MyApp)