import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsContainer from '../../../containers/products/ProductsContainer';

const PageSectionMenuDealOfToday = ({ products }) => {
	const { t } = useTranslation(['common']);

	return (
		<section className="deal-day pd-100">
			<div className="container">
				<h2 className="title text-left">
                    <span>{t('deal_of_the_day')}</span>
				</h2>
				{products.length === 0 ? (
					<div className="row">
						<div className="text-center px-3 py-10 desc font-20 mgb-20">
                            <p>{t('no_result')}</p>
						</div>
					</div>
				) : (
					<ProductsContainer products={products} />
				)}
			</div>
		</section>
	);
};

export default PageSectionMenuDealOfToday;
