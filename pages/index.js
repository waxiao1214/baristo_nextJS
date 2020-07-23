import { useState, useEffect } from 'react'
import i18n from '../i18n/i18n'
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
import axios from '../lib/axios'

const getSpecialCruises = async () => {
  try {
    const url = `customer/web/home-service/special-cruise?branchId=1&culture=${i18n.language}&deliveryType=Delivery`
    const response = await axios.get(url);
    console.log('re', response)

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
    console.log('re', response)

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
    console.log('re', response)

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
    console.log('re', response)

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
    console.log('re', response)

    return response.data.result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function getServerSideProps(context) {
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
      chefStory
    }, // will be passed to the page component as props
  }
}

export default function Index(props) {

  useEffect(() => getSpecialCruises, [])

  return (
    <div>
      <TheHeader />
      <PageSectionIndexHero />
      <PageSectionIndexSpecialCruise specialCruises={props.specialCruises} />
      <PageSectionIndexDeliveryAvailability />
      <PageSectionIndexChefsChoices chefChoices={props.chefChoices}/>
      <PageSectionIndexOurRestaurant subBanner={props.subBanner}/>
      <PageSectionIndexOurChef />
      <PageSectionIndexOurLocation />
      <PageSectionIndexOurResource appResources={props.appResources}/>
      <TheFooter />
    </div>
  )
}
