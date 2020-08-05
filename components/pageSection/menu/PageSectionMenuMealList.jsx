import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useBaseToggleLoader from '../../../hooks/base/useBaseToggleLoader';
import ProductChefItemCardV2 from '../../product/ProductChefItemCardV2';
import axios from '../../../lib/axios';

const PageSectionMenuMealList = ({ mealCategories, comboCategories }) => {
	const { t, i18n } = useTranslation(['common']);
	const { isLoading, toggleLoader } = useBaseToggleLoader();
	const currentBranch = useSelector((state) => state.root.currentBranch);
	const availableTabs = [
		{
			name: 'meal_list',
		},
		{
			name: 'combo',
		},
	];
	const [currentActiveTab, setCurrentActiveTab] = useState(
		availableTabs[0].name
	);
	const [currentActiveCategory, setCurrentActiveCategory] = useState({});
	const [categoriesToShow, setCategoriesToShow] = useState([]);
	const [mealsToShow, setMealsToShow] = useState([]);

	/**
	 * Get meals
	 *
	 * @return {Array} array of products
	 */
	const getMeals = async () => {
		try {
			const url = `customer/web/meals-service/category-meals?Sorting=Id&MaxResultCount=10&SkipCount=0&branchId=${currentBranch.id}&isDelivery=true&culture=${i18n.language}`;
			const response = await axios.get(url);

			setMealsToShow(response.data.result.items);
		} catch (error) {
			console.error(error);

			return [];
		}
	};

	/**
	 * Get combos
	 *
	 * @return {Array} array of products
	 */
	const getCombos = async () => {
		try {
			const url = `customer/web/meals-service/category-combo?Sorting=Id&MaxResultCount=10&SkipCount=0&categoryId=1&branchId=${currentBranch.id}&isDelivery=true&culture=${i18n.language}`;
			const response = await axios.get(url);

			setMealsToShow(response.data.result.items);
		} catch (error) {
			console.error(error);

			return [];
		}
	};

	useEffect(() => {
		if (currentActiveTab === 'meal_list') {
			setCategoriesToShow(mealCategories);
			setCurrentActiveCategory(mealCategories[0]);
			getMeals();
		} else if (currentActiveTab === 'combo') {
			setCategoriesToShow(comboCategories);
			setCurrentActiveCategory(comboCategories[0]);
			getCombos();
		}
	}, [currentActiveTab]);

	return (
		<section className="menu-list pd-100">
			<div className="container">
				<ul className="nav nav-tabs">
					{availableTabs.map(({ name }, index) => {
						return (
							<li
								className="nav-item"
								onClick={() => setCurrentActiveTab(name)}
								key={index}
							>
								<h2
									className={`title nav-link text-left ${
										currentActiveTab === name
											? 'active'
											: ''
									}`}
								>
									<span>{t(name)}</span>
								</h2>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="discovery relative">
				<div className="menu-abs">
					<h4>{t('discover')}</h4>
					<ul className="nav nav-tabs">
						{categoriesToShow.map((category, index) => {
							return (
								<li className="nav-item" key={index}>
									<h2
										className={`title nav-link text-left ${
											category.category ===
											currentActiveCategory.category
												? 'active'
												: ''
										}`}
										onClick={() =>
											setCurrentActiveCategory(category)
										}
									>
										<span>{category.category}</span>
									</h2>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="container">
					<div className="tab-content">
						<div
							role="tabpanel"
							className="tab-pane fade in show active"
							id="tab-1"
						>
							<div className="row">
								{mealsToShow.map((meal) => {
									return (
										<div className="col-md-4" key={meal.id}>
                                            <ProductChefItemCardV2 product={meal}/>
										</div>
									);
								})}
							</div>
							<div className="pagi">
								<ul className="flex-center-center">
									<li className="active">
										<a href="" title="">
											<i className="ti-angle-double-left"></i>{' '}
										</a>{' '}
									</li>
									<li className="active">
										<a href="" title="">
											<i className="ti-angle-left"></i>{' '}
										</a>{' '}
									</li>
									<li className="current">
										<a href="" title="">
											1
										</a>{' '}
									</li>
									<li className="">
										<a href="" title="">
											2
										</a>{' '}
									</li>
									<li className="">
										<a href="" title="">
											3
										</a>{' '}
									</li>
									<li className="">
										<a href="" title="">
											4
										</a>{' '}
									</li>
									<li className="">
										<a href="" title="">
											5
										</a>{' '}
									</li>
									<li className="">
										<a href="" title="">
											...
										</a>{' '}
									</li>
									<li className="active">
										<a href="" title="">
											<i className="ti-angle-right"></i>{' '}
										</a>{' '}
									</li>
									<li className="active">
										<a href="" title="">
											<i className="ti-angle-double-right"></i>{' '}
										</a>{' '}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PageSectionMenuMealList;
