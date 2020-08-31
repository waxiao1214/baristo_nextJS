import React from 'react';
import { useSelector } from 'react-redux';
import useProductPriceAndDiscountValueToShow from '../../hooks/product/useProductPriceAndDiscountValueToShow';
import { withTranslation } from '../../i18n/i18n';

const ProductCard = ({ product, openMoreDetails, t }) => {
	const { currency } = useSelector((state) => state.root.settings);
	const {
		isDiscountStillInRange,
		mainMeal,
	} = useProductPriceAndDiscountValueToShow(product);

	return (
		<div className="product-item">
			<div className="product-image relative">
				<a href="" title="">
					<img src={product.thumbnail} />
				</a>
				{mainMeal.menuPriceOption === 'Delivery' && (
					<div className="delivery absolute flex-center-center hide-abs">
						<button type="button" className="btn btn-h46 btn-yellow btn-bgLeft">
							{t('delivery_now')}
						</button>
					</div>
				)}
				{mainMeal.menuPriceOption === 'PickUp' && (
					<div className="absolute flex-center-center hide-abs">
						<button type="button" className="btn btn-h46 btn-yellow">
							{t('pick_up')}
						</button>
					</div>
				)}
			</div>
			<div className="product-text">
				<h3 className="title-sm mgb-10">
					<a
						href=""
						title=""
						data-toggle="modal"
						data-target="#product-detail"
					>
						{product.title}
					</a>
				</h3>
				<div className="desc font-18 mgb-20">{product.description}</div>
				<div>
					<div className="product-price-size">
						<div className="product-price text-yellow font-28 font-demi">{`${currency} ${mainMeal.price}`}</div>
						<span>{mainMeal.size}</span>
					</div>
					{mainMeal?.mealSettings && mainMeal.mealSettings[0]?.applyDiscount &&
						isDiscountStillInRange(
							mainMeal.mealSettings[0].from,
							mainMeal.mealSettings[0].to
						) && (
							<div className="product-sale mgt-10">
								<span className="discount inflex-center-center btn-gray btn-h46 btn-bgLeft">
									{t('discount')}{' '}
									{mainMeal.mealSettings[0].discount}
									{mainMeal.mealSettings[0].discountType ===
										'Fixed'
										? currency
										: '%'}
								</span>
							</div>
						)}
				</div>
				<div className="d-flex justify-content-end mgt-10">
					<a
						onClick={openMoreDetails}
						className="btn-h46 inflex-center-center btn-gray more"
					>
						{t('more')}
					</a>
				</div>
			</div>
		</div>
	);
};

export default withTranslation()(ProductCard);
