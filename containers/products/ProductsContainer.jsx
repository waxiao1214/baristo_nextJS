import React, { useState } from 'react';
import _ from 'lodash';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product/ProductCard';
import ProductModalDetails from '../../components/product/ProductModalDetails';
import axios from '../../lib/axios';

const ProductsContainer = ({ products }) => {
	const { i18n } = useTranslation(['common']);
	const { id: branchId } = useSelector((state) => state.root.currentBranch);
	const [isProductDetailsActive, setIsProductDetailsActive] = useState(false);
	const [
		isProductDetailsLoaderActive,
		setIsProductDetailsLoaderActive,
	] = useState(false);
	const [productDetails, setProductDetails] = useState({});

	/**
	 * Generate query object
	 *
	 * @param {Number} id
	 * @return {String}
	 */
	const generateQueryObject = (id) => {
		return queryString.stringify({
			mealId: id,
			culture: i18n.language,
			branchId,
		});
	};

	/**
	 * Fetch product details
	 *
	 * @param {Array} ids
	 */
	const fetchProductDetails = async (id) => {
		setIsProductDetailsLoaderActive(true);
		const query = generateQueryObject(id);
		try {
			const response = await axios.get(
				`customer/web/meals-service/meal-details?${query}`
			);

			setProductDetails(response.data.result);
		} catch (error) {
			console.error(error);
		} finally {
			setIsProductDetailsLoaderActive(false);
		}
	};

	const openProductSlider = (id) => {
		setIsProductDetailsActive(true);
		fetchProductDetails(id);
	};

	if (!_.isArray(products)) return '';

	return (
		<div>
			<ProductModalDetails
				isActive={isProductDetailsActive}
				isLoading={isProductDetailsLoaderActive}
				productDetails={productDetails}
				close={() => setIsProductDetailsActive(false)}
			/>
			<div className="row">
				{products.map((product) => (
					<div className="col-md-4" key={product.id}>
						<ProductCard
							openMoreDetails={() =>
								openProductSlider(product.id)
							}
							product={product}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

ProductsContainer.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	products: PropTypes.array.isRequired,
};

export default ProductsContainer;
