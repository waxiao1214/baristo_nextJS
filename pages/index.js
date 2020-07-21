import TheHeader from '../components/header/TheHeader'
import TheFooter from '../components/footer/TheFooter'
import PageSectionIndexChefsChoices from '../components/pageSection/index/PageSectionIndexChefsChoices'
import PageSectionIndexSpecialCruise from '../components/pageSection/index/PageSectionIndexSpecialCruise'
import PageSectionIndexDeliveryAvailability from '../components/pageSection/index/PageSectionIndexDeliveryAvailability'

export default function Index() {
  return (
    <div>
      <TheHeader />
      <PageSectionIndexSpecialCruise />
      <PageSectionIndexDeliveryAvailability />
      <PageSectionIndexChefsChoices />
      <TheFooter />
    </div>
  )
}
