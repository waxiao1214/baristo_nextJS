import { useState, useEffect } from 'react'
import usePageOnLoad from '../hooks/page/usePageOnLoad';
import i18n from '../i18n/i18n'
import DefaultLayout from '../layouts/DefaultLayout'
import useUserFetchCurrentUser from '../hooks/user/useUserFetchCurrentUser'
import TheHeader from '../components/header/TheHeader'
import TheFooter from '../components/footer/TheFooter'
import PageSectionIndexChefsChoices from '../components/pageSection/index/PageSectionIndexChefsChoices'
import PageSectionIndexSpecialCruise from '../components/pageSection/index/PageSectionIndexSpecialCruise'
import PageSectionIndexDeliveryAvailability from '../components/pageSection/index/PageSectionIndexDeliveryAvailability'
import PageSectionIndexOurRestaurant from '../components/pageSection/index/PageSectionIndexOurRestaurant'
import PageSectionIndexOurResource from '../components/pageSection/index/PageSectionIndexOurResource'
import PageSectionIndexOurChef from '../components/pageSection/index/PageSectionIndexOurChef'
import PageSectionIndexOurLocation from '../components/pageSection/index/PageSectionIndexOurLocation'
import PageSectionIndexHero from '../components/pageSection/index/PageSectionIndexHero'
import AuthenticationContainer from '../containers/authentication/AuthenticationContainer'
import axios from '../lib/axios'
import _ from 'lodash';

const getSpecialCruises = async () => {
  try {
    const url = `customer/web/home-service/special-cruise?branchId=1&culture=${i18n.language}&deliveryType=Delivery`
    const response = await axios.get(url);

    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getChefChoices = async () => {
  try {
    const url = `customer/web/home-service/chef-choice?branchId=1&culture=${i18n.language}`
    const response = await axios.get(url);

    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

const getAppResources = async () => {
  try {
    const url = `customer/web/home-service/app-resources?branchId=1`
    const response = await axios.get(url);

    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

const getSubBanner = async () => {
  try {
    const url = `customer/web/home-service/sub-banner?branchId=1`
    const response = await axios.get(url);

    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

const getChefStory = async () => {
  try {
    const url = `customer/web/home-service/chef-story?branchId=1&culture=${i18n.language}`
    const response = await axios.get(url);

    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

const getSettings = async () => {
  try {
    const url = `/settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`
    const response = await axios.get(url);

    console.log('adding settings');
    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function getServerSideProps(context) {
  const settings = await getSettings();

  // get current branch 
  const { branches } = settings;
  const currentBranch = branches.filter(branch => branch.primaryBranch)[0];

  const specialCruises = await getSpecialCruises();
  const chefChoices = await getChefChoices();
  const appResources = await getAppResources();
  const subBanner = await getSubBanner();
  const chefStory = await getChefStory();

  return {
    props: {
      specialCruises,
      chefChoices,
      appResources,
      subBanner,
      chefStory,
      settings,
      currentBranch
    },
  }
}

export default function Index(props) {
  useUserFetchCurrentUser();
  usePageOnLoad(props);
  const { currentBranch } = props;
  const [contentWidgets, setContentWidgets] = useState({});
  const [isDeliveryAvailabilitySectionVisible, setIsDeliveryAvailabilitySectionVisible] = useState(true);

  // set which section to show and hide
  useEffect(() => {
    if (!currentBranch.contentWidgets) return;

    const contentWidgets = {};

    currentBranch.contentWidgets.forEach(({ name, isActive }) => {
      contentWidgets[name] = isActive;
    });

    setContentWidgets(contentWidgets);
  }, [currentBranch]);

  // set if delivery availability section is visible
  useEffect(() => {
    if (!currentBranch.contentWidgets) return;

    const { deliveryOption } = currentBranch.deliverySetting;
    setIsDeliveryAvailabilitySectionVisible(deliveryOption === 'DeliveryOnly' || deliveryOption === 'DeliveryAndPickup');
  }, [currentBranch]);

  return (
    <DefaultLayout>
      <TheHeader />
      {contentWidgets.CAROUSEL &&
        <PageSectionIndexHero />
      }
      {contentWidgets.SPECIALCRUISE &&
        <PageSectionIndexSpecialCruise specialCruises={props.specialCruises} />
      }
      {isDeliveryAvailabilitySectionVisible &&
        <PageSectionIndexDeliveryAvailability />
      }
      {contentWidgets.CHEFSCHOICE &&
        <PageSectionIndexChefsChoices chefChoices={props.chefChoices} />
      }
      {contentWidgets.SUBBANNER &&
        <PageSectionIndexOurRestaurant subBanner={props.subBanner} />
      }
      {contentWidgets.CHEFSSTORY &&
        <PageSectionIndexOurChef chefStory={props.chefStory} />
      }
      <PageSectionIndexOurLocation />
      {
        contentWidgets.APPRESOURCES &&
        <PageSectionIndexOurResource appResources={props.appResources} />
      }
      <TheFooter />
      <AuthenticationContainer />
    </DefaultLayout>
  )
}
