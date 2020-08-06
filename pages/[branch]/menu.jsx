import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import TheHeader from '../../components/header/TheHeader';
import TheFooter from '../../components/footer/TheFooter';
import PageSectionMenuShowcaseSection from '../../components/pageSection/menu/PageSectionMenuShowcaseSection';
import PageSectionMenuDealOfToday from '../../components/pageSection/menu/PageSectionMenuDealOfToday';
import PageSectionMenuMealList from '../../components/pageSection/menu/PageSectionMenuMealList';
import usePageOnLoad from '../../hooks/page/usePageOnLoad';
import axios from '../../lib/axios';
import i18n from '../../i18n/i18n';
import { useRouter } from 'next/router';
import _ from 'lodash';

/**
 * Get popular meals
 *
 * @param {String|Number} branchId
 * @return {Array} array of products
 */
const getPopularMeals = async (branchId) => {
	try {
		const url = `customer/web/meals-service/popular-meals?Sorting=Id&MaxResultCount=2&SkipCount=0&branchId=${branchId}&isDelivery=true&culture=${i18n.language}`;
		const response = await axios.get(url);

		return response.data.result.items;
	} catch (error) {
		console.error(error);

		return [];
	}
};

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

/**
 * Get meal categories
 *
 * @param {String|Number} branchId
 * @return {Array} array of products
 */
const getMealCategories = async (branchId) => {
	try {
		const url = `customer/web/meals-service/meal-categories?branchId=${branchId}&culture=${i18n.language}`;
		const response = await axios.get(url);

		return response.data.result.items;
	} catch (error) {
		console.error(error);

		return [];
	}
};

/**
 * Get combo categories
 *
 * @param {String|Number} branchId
 * @return {Array} array of products
 */
const getComboCategories = async (branchId) => {
	try {
		const url = `customer/web/meals-service/combo-categories?branchId=${branchId}&culture=${i18n.language}`;
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

	// get categories
	const mealCategories = await getMealCategories(currentBranch.id);
	const comboCategories = await getComboCategories(currentBranch.id);

	return {
		props: {
			settings,
			currentBranch,
			discountedMeals,
			mealCategories,
			comboCategories,
			popularMeals,
		},
	};
}

export default function Gallery(props) {
	usePageOnLoad(props);
	const router = useRouter();
	const { category, searchText, priceFrom, priceTo } = router.query;
	let initialIsSearching = false
	if (
		!_.isEmpty(category) ||
		!_.isNil(searchText) ||
		!_.isNil(priceFrom) ||
		!_.isNil(priceTo)
	) {
		initialIsSearching = true;
	}
	// search
	const [isSearching, setIsSearching] = useState(initialIsSearching);


	return (
		<DefaultLayout>
			<TheHeader />
			<div className={isSearching ? 'd-flex flex-column-reverse align-items-stretch pt-5 mt-5' : ''}>
				<PageSectionMenuShowcaseSection
					discountedMeals={props.discountedMeals}
				/>
				<PageSectionMenuDealOfToday products={props.popularMeals} />
				<PageSectionMenuMealList
					mealCategories={props.mealCategories}
					comboCategories={props.comboCategories}
					isSearching={isSearching}
				/>
			</div>
			<TheFooter />
		</DefaultLayout>
	);
}
