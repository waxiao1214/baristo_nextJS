import Page from '../components/page'
import { initializeStore } from '../store'
import axios from '../lib/axios'

const getSettings = async () => {
  try {
    const url = `/settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`
    const response = await axios.get(url);

    console.log('adding settings2');
    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export default function SSR() {
  return <Page />
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getServerSideProps() {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  const settings = await getSettings();

  dispatch({
    type: 'ADD_SETTINGS',
    payload: {
      settings
    }
  });

  return { props: { initialReduxState: reduxStore.getState() } }
}
