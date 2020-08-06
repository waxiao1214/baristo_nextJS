import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from '../../../lib/axios';

const ModalFilterSearch = ({ isActive, close, search }) => {
	const { t, i18n } = useTranslation(['common']);
	const { id: branchId } = useSelector((state) => state.root.currentBranch);

	const [priceFrom, setPriceFrom] = useState(0);
	const [priceTo, setPriceTo] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
	const [categories, setCategories] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);

	/**
	 * Get meal categories
	 *
	 * @return {Void}
	 */
	const getMealCategories = async () => {
		try {
			const url = `customer/web/meals-service/meal-categories?branchId=${branchId}&culture=${i18n.language}`;
			const response = await axios.get(url);

			setCategories(response.data.result.items);
		} catch (error) {
			console.error(error);
		}
	};

	const handlePriceFromChange = (e) => {
		const val = parseInt(e.target.value);
		if (val < 0) {
			return setPriceTo(0);
		}
		setPriceFrom(val);
	};

	const handlePriceToChange = (e) => {
		const val = parseInt(e.target.value);
		if (val < 0) {
			return setPriceTo(0);
		}
		setPriceTo(val);
	};

	const isCategorySelected = (id) => {
		return selectedCategories.includes(id);
	};

	const handleCategoryClick = ({ id }) => {
		let categories = [];

		if (selectedCategories.includes(id)) {
			categories = selectedCategories.filter(
				(categoryId) => categoryId !== id
			);
		} else {
			categories = selectedCategories.concat([id]);
		}

		setSelectedCategories(categories);
	};

	const handleSubmit = () => {
		// validate the price
		if (priceFrom > priceTo) {
			setErrorMessage(t('price_from_should_be_less_than_price_to'));
			return setTimeout(() => {
				setErrorMessage('');
			}, 5000);
		}

		search({
			priceFrom,
			priceTo,
			category: selectedCategories,
		});
	};

	useEffect(() => {
		getMealCategories();
	}, []);

	if (!isActive) {
		return '';
	}

	return (
		<div>
			<div className="modal fade modal-box show" id="search-filter">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-top">
							<h2 className="title">
								<span>{t('search_with_filter')}</span>
							</h2>
							<button
								onClick={close}
								type="button"
								className="close"
							>
								<i className="ti-close"></i>
							</button>
						</div>
						<div className="modal-main">
							<form>
								<div className="price-range">
									<h3 className="modal-title-md">
										<img
											src="/images/icon/local_atm_24px_rounded.svg"
											alt=""
											title=""
										/>
										{t('price_range')}
									</h3>
									<div className="range-box">
										<span>{t('from')}</span>
										<div className="formRow--input-wrapper js-inputWrapper">
											<input
												type="number"
												className="formRow--input js-input"
												value={priceFrom}
												onChange={(e) => handlePriceFromChange(e)}
												placeholder="00.0"
											/>
										</div>
										<span className="mgl-15">
											{t('to')}
										</span>
										<div className="formRow--input-wrapper js-inputWrapper">
											<input
												type="number"
												className="formRow--input js-input"
												value={priceTo}
												onChange={(e) => handlePriceToChange(e)}
												placeholder="00.0"
											/>
										</div>
									</div>
									{errorMessage.length !== 0 && (
										<div className="alert alert-danger mt-5">
											{errorMessage}
										</div>
									)}
								</div>
								<div className="category-choose">
									<h3 className="modal-title-md">
										<img src="/images/icon/restaurant_menu_24px_rounded.svg" />
										{t('category')}
									</h3>
									<ul className="category-list">
										{categories.map((category) => {
											return (
												<li key={category.id}>
													<label className="label-check relative">
														<input
															type="checkbox"
															className="hide-abs"
															checked={isCategorySelected(
																category.id
															)}
															onChange={() =>
																handleCategoryClick(
																	category
																)
															}
														/>
														<span>
															{category.category}
														</span>
													</label>
												</li>
											);
										})}
									</ul>
								</div>
								<div className="text-center btn-modal-submit">
									<button
										type="submit"
										className="btn btn-yellow btn-h60 font-20 font-demi"
										onClick={handleSubmit}
									>
										{t('apply')}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
	);
};

export default ModalFilterSearch;
