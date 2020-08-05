import DefaultLayout from '../../layouts/DefaultLayout';
import TheHeader from '../../components/header/TheHeader';
import TheFooter from '../../components/footer/TheFooter';
import PageSectionMenuShowcaseSection from '../../components/pageSection/menu/PageSectionMenuShowcaseSection';
import usePageOnLoad from '../../hooks/page/usePageOnLoad';
import axios from '../../lib/axios';
import i18n from '../../i18n/i18n';

/**
 * Get discounted meals
 *
 * @param {String|Number} branchId
 * @return {Array} array of products
 */
const getDiscountedMeals = async (branchId) => {
	try {
		const url = `customer/web/meals-service/discounted-meals?Sorting=Id&MaxResultCount=3&SkipCount=0&branchId=${branchId}&culture=${i18n.language}`;
		const response = await axios.get(url);

        return response.data.result.items;
	} catch (error) {
		console.error(error);

		return [];
	}
};

const getSettings = async () => {
	try {
		const url = `/settings?mediaTypeFilters=LOGO&mediaTypeFilters=FAVI_ICON&mediaTypeFilters=MOBILE_PROFILE_IMAGE&mediaTypeFilters=MOBILE_START_SCREEN&mediaTypeFilters=MOBILE_WELCOME_SCREEN`;
		const response = await axios.get(url);

		return response.data.result;
	} catch (error) {
		console.error(error);

		return [];
	}
};

export async function getServerSideProps(context) {
	const branchId = context.params.branch;
	const settings = await getSettings();

	// get current branch
	const { branches } = settings;
	const currentBranch = branches.filter(
		(branch) => branch.id.toString() === branchId
	)[0];

	// get sections data
	const popularMeals = await getPopularMeals(currentBranch.id);
	const discountedMeals = await getDiscountedMeals(currentBranch.id);

	return {
		props: {
			settings,
			currentBranch,
			discountedMeals,
		},
	};
}

export default function Gallery(props) {
	usePageOnLoad(props);

	return (
		<DefaultLayout>
			<TheHeader />
			<PageSectionMenuShowcaseSection
				discountedMeals={props.discountedMeals}
			/>
			<TheFooter />
		</DefaultLayout>
	);
}
