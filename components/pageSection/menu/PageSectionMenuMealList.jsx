import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import ProductChefItemCardV2 from '../../product/ProductChefItemCardV2';
import axios from '../../../lib/axios';
import BaseLoader from '../../base/BaseLoader';

const PageSectionMenuMealList = ({ mealCategories, comboCategories }) => {
	const { t, i18n } = useTranslation(['common']);

	// loader
	const [isLoading, setIsLoading] = useState(false);

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

	// pagination
	const [count, setCount] = useState(12); // count for each page
	const [totalCount, setTotalCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	/**
	 * Genreate query string
	 *
	 * @return {String}
	 */
	const generateQuery = () => {
		const stringified = queryString.stringify({
			Sorting: 'Id',
			MaxResultCount: count,
			SkipCount: currentPage * count,
			branchId: currentBranch.id,
			all: false,
			categoryId: currentActiveCategory.id,
			culture: i18n.language,
		});

		return stringified;
	};

	/**
	 * Get meals
	 *
	 * @return {Array} array of products
	 */
	const getMeals = async () => {
		setIsLoading(true);
		try {
			const query = generateQuery();
			const url = `customer/web/meals-service/category-meals?${query}`;
			const response = await axios.get(url);

			setMealsToShow(response.data.result.items);
			setTotalCount(response.data.result.totalCount);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Get combos
	 *
	 * @return {Array} array of products
	 */
	const getCombos = async () => {
		setIsLoading(true);
		try {
			const query = generateQuery();
			const url = `customer/web/meals-service/category-combo?${query}`;
			const response = await axios.get(url);

			setMealsToShow(response.data.result.items);
			setTotalCount(response.data.result.totalCount);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Handle pagination page change
	 * 
	 * @param {Number} page 
	 */
	const onPageChange = (page) => {
		setCurrentPage(page);
	}

	useEffect(() => {
		setMealsToShow([]);
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

	useEffect(() => {
		setMealsToShow([]);
		if (currentActiveTab === 'meal_list') {
			getMeals();
		} else if (currentActiveTab === 'combo') {
			getCombos();
		}
	}, [currentActiveCategory, currentPage]);

	useEffect(() => {
		if (totalCount === 0 || totalCount <= count) {
			setTotalPages(1);
		} else {
			setTotalPages(totalCount / count);
		}
	}, [totalCount]);

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
					<div className="tab-content tab-content--relative">
						{isLoading && <BaseLoader />}
						<div className="fade in show active">
							<div className="row tab-pane--h-md">
								{mealsToShow.map((meal) => {
									return (
										<div className="col-md-4" key={meal.id}>
											<ProductChefItemCardV2
												product={meal}
											/>
										</div>
									);
								})}
								{mealsToShow.length === 0 && !isLoading && (
									<div className="text-center py-10 desc font-20 mgb-20">
										<p>{t('no_result')}</p>
									</div>
								)}
							</div>
							<div className="pagi">
								<ul className="flex-center-center">
									<ReactPaginate
										pageCount={totalPages}
										pageRangeDisplayed={2}
										marginPagesDisplayed={1}
										previousLabel={
											<i className="ti-angle-left"></i>
										}
										nextLabel={
											<i className="ti-angle-right"></i>
										}
										nextClassName={'active'}
										previousClassName={'active'}
										activeClassName={'current'}
										containerClassName={'d-flex'}
										onPageChange={(page) => onPageChange(page.selected)}
									/>
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
