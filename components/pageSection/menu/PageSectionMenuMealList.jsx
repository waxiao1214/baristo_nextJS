import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import _, { set } from 'lodash';
import axios from '../../../lib/axios';
import BaseLoader from '../../base/BaseLoader';
import ProductContainer from '../../../containers/products/ProductsContainer';

const PageSectionMenuMealList = ({
	mealCategories,
	comboCategories,
	isSearching,
}) => {
	const { t, i18n } = useTranslation(['common']);
	const router = useRouter();

	// loader
	const [isLoading, setIsLoading] = useState(false);

	const currentBranch = useSelector((state) => state.root.currentBranch);
	const availableTabs = [
		{ name: 'meal_list' },
		{ name: 'combo' }
	];
	const [currentActiveTab, setCurrentActiveTab] = useState(
		availableTabs[0].name
	);
	const [currentActiveCategories, setCurrentActiveCategories] = useState([]);
	const [categoriesToShow, setCategoriesToShow] = useState([]);
	const [mealsToShow, setMealsToShow] = useState([]);
	const [selectedPage, setSelectedPage] = useState(0);

	// pagination
	const [count] = useState(12); // count for each page
	const [totalCount, setTotalCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const ref = useRef(null);
	const [sticky2, setSticky2] = useState(false);
	const rigthTab = useRef(null);
	const discovery = useRef(null);
	const [start, setStart] = useState(false);
	const [height, setHeight] = useState(3000)

	useEffect(() => {
		let selectedPageSearch = window.location.search
		if (selectedPageSearch.length > 0 && selectedPageSearch.split("=")[0] === "?initialCurrentPage") {
			let selectedPageNumber = selectedPageSearch.split("=")[1]
			setSelectedPage(selectedPageNumber)
			setCurrentPage(selectedPageNumber)
			const element = document.getElementsByClassName("pagenation")
			let currentPageNavClass = Number(Number(selectedPageNumber) + 1);
			console.log(element[0].childNodes, "element------");
			let nodeList = element[0].childNodes;
			nodeList.forEach((list, key) => {
				list.className = ""
				if(selectedPageNumber === key) {
					list.className = "current"
				}
			})
		}
	}, [comboCategories, currentPage])

	useEffect(() => {
		let rightHeight = document.getElementById("rightMain").offsetHeight
		let leftHeight = document.getElementById("leftMenu").offsetHeight
		console.log(rightHeight, "height")
		setHeight(rightHeight)
		if (leftHeight > rightHeight)
			setHeight(leftHeight)
	}, [isLoading])

	const categoriesScrollWheeling = e => {
		e.preventDefault();
		if (start) {
			const slider = document.getElementById('sticky');
			console.log('hre', slider, slider.scrollHeight, slider.scrollTop)
			slider.scrollTop += (e.deltaY / Math.abs(e.deltaY)) * 100;
			// slider.scrollLeft += (e.deltaY / Math.abs(e.deltaY)) * 100;
		}
	}
	/**
	 * Check if a category is active
	 * @param {Number} id ;
	 * @return {Boolean}
	 */
	const isCategoryActive = (id) => {
		return currentActiveCategories.includes(id);
	};

	/**
	 * Handle category click
	 *
	 * @param {Object} category
	 * @return {Void}
	 */
	const handleCategoryClick = ({ id }) => {
		let categories = [];

		if (currentActiveCategories.includes(id)) {
			categories = currentActiveCategories.filter(
				(categoryId) => categoryId !== id
			);
		} else {
			categories = currentActiveCategories.concat([id]);
		}

		setCurrentActiveCategories(categories);
	};

	/**
	 * Genreate query string
	 *
	 * @return {String}
	 */
	const generateQuery = () => {
		const { priceFrom, priceTo } = router.query;

		const queryObject = {
			Sorting: 'Id',
			MaxResultCount: count,
			SkipCount: currentPage * count,
			branchId: currentBranch.id,
			culture: i18n.language,
		};

		if (isSearching) {
			queryObject.category = currentActiveCategories;
			if (!_.isNil(priceFrom)) {
				queryObject.priceFrom = priceFrom;
			}
			if (!_.isNil(priceTo)) {
				queryObject.priceFrom = priceTo;
			}
		} else if (currentActiveCategories.length !== 0) {
			queryObject.categoryId = currentActiveCategories;
			queryObject.all = false;
		}

		const stringified = queryString.stringify(queryObject);

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
	 * @return {Void}
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
	 * Search meals
	 *
	 * @return {Void}
	 */
	const searchMeals = async () => {
		setIsLoading(true);
		try {
			const query = generateQuery();
			const url = `customer/web/meals-service/search?${query}`;
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
		let searchString = `?initialCurrentPage=${page}`
		window.history.replaceState(null, null, searchString);
	};

	/**
	 * Method to generate the href 
	 * for the pagination anchore tag
	 * 
	 * @param {*} page 
	 */
	const hrefBuilder = (page) => {
		const query = queryString.stringify({
			initialCurrentPage: page
		});

		console.log(query);
		return `./${currentBranch.id}/menu?${query}`
	}

	useEffect(() => {
		const { category } = router.query;

		setMealsToShow([]);
		setCurrentActiveCategories([]);

		// user is searching
		if (isSearching && currentActiveTab === 'meal_list') {
			const categories = _.isEmpty(category) ? [] : _.toArray(category);

			setCategoriesToShow(mealCategories);
			setCurrentActiveCategories(categories);
			return;
		}

		// combo tab
		if (currentActiveTab === 'combo') {
			setCategoriesToShow(comboCategories);;
			return;
		}

		// meal list tab
		if (currentActiveTab === 'meal_list') {
			setCategoriesToShow(mealCategories);

		}
	}, [currentActiveTab]);

	useEffect(() => {
		setMealsToShow([]);

		// user is searching
		if (isSearching && currentActiveTab === 'meal_list') {
			searchMeals();
			return;
		}

		if (currentActiveTab === 'meal_list') {
			getMeals();
			return;
		}

		if (currentActiveTab === 'combo') {
			getCombos();

		}
	}, [currentActiveCategories, currentPage]);

	useEffect(() => {
		if (totalCount === 0 || totalCount <= count) {
			setTotalPages(1);
		} else {
			setTotalPages(totalCount / count);
		}
	}, [totalCount]);


	return (
		<div>
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
				<div className="discovery relative" id="discovery" ref={discovery}>
					<div className="sticky-wrapper" style={{ height: `${height}px` }}>
						<div id="leftMenu" className="menu-abs" ref={ref}>
							<h4>{t('discover')}</h4>
							<ul className="nav nav-tabs">
								{categoriesToShow.map((category, index) => {
									return (
										<li className="nav-item" key={index}>
											<h2
												className={`title nav-link text-left ${
													isCategoryActive(category.id)
														? 'active'
														: ''
													}`}
												onClick={() =>
													handleCategoryClick(category)
												}
											>
												<span>{category.category}</span>
											</h2>
										</li>
									);
								})}
							</ul>
						</div>

						<div id="rightMain" className="container" style={{ float: 'right', position: 'relative' }}>
							<div className="tab-content tab-content--relative" style={{ position: 'relative', top: '-100px' }} id="sticky">
								{isLoading && <BaseLoader />}
								<div className={`fade in show active menu_list_right ${sticky2 ? 'right-list-menu' : ''}`} ref={rigthTab}>
									<div className="row tab-pane--h-md" style={{ marginTop: '100px' }}>
										<ProductContainer productType={currentActiveTab} products={mealsToShow} productCardType="v2" />
									</div>
									{mealsToShow.length === 0 && !isLoading && (
										<div className="row text-center py-10 desc font-20 mgb-20">
											<p>{t('no_result')}</p>
										</div>
									)}
									<div className="pagi">
										<ul className="flex-center-center">
											<ReactPaginate
												pageCount={totalPages}
												pageRangeDisplayed={2}
												forcePage={selectedPage}
												marginPagesDisplayed={1}
												previousLabel={
													<i className="ti-angle-left" />
												}
												nextLabel={
													<i className="ti-angle-right" />
												}
												nextClassName="active"
												previousClassName="active"
												activeClassName="current"
												containerClassName="d-flex pagenation"
												onPageChange={(page) =>
													onPageChange(page.selected)
												}
												hrefBuilder={hrefBuilder}
											/>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PageSectionMenuMealList;
