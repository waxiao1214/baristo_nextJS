import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useProductPriceAndDiscountValueToShow from '../../hooks/product/useProductPriceAndDiscountValueToShow';

const ProductChefItemCardV2 = ({ product }) => {
	const { t } = useTranslation(['common']);
	const { currency } = useSelector((state) => state.root.settings);
	const {
		isDiscountStillInRange,
		mainMeal,
	} = useProductPriceAndDiscountValueToShow(product);

	return (
		<div className="chef-item relative">
			<div className="ch-image">
				<div>
					<img src={product.imagePath} />
				</div>
			</div>
			<div className="ch-text text-center">
				<h3 className="title-sm mgb-10">
					<div>{product.title}</div>
				</h3>
				<p className="desc text-gray font-18">{product.description}</p>
			</div>
			<div className="d-flex flex-column align-items-center">
				<div className="d-flex justify-content-center align-items-center my-4">
					{product.mealPrices.length > 1 && (
						<span className="mr-3 font-16">{t('from')}</span>
					)}
					<div className="product-price text-yellow font-28 font-demi">{`${currency} ${mainMeal.price}`}</div>
				</div>
				{mainMeal.mealSettings[0].applyDiscount &&
					isDiscountStillInRange(
						mainMeal.mealSettings[0].from,
						mainMeal.mealSettings[0].to
					) && (
						<div className="product-sale mgt-10">
							<span className="discount discount--white inflex-center-center btn-gray btn-h46 btn-bgLeft">
								{`${t('discount')} `}
								{mainMeal.mealSettings[0].discount}
								{mainMeal.mealSettings[0].discountType ===
								'Fixed'
									? `${currency}`
									: ' %'}
							</span>
						</div>
					)}
			</div>
			<div className="text-center order-abs">
				<button className="btn btn-yellow btn-h60 font-18 font-demi text-uppercase">
					{t('order_now')}
				</button>
			</div>
		</div>
	);
};

export default ProductChefItemCardV2;
