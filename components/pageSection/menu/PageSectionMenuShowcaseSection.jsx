import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsContainer from '../../../containers/products/ProductsContainer';

const PageSectionMenuShowcaseSection = () => {
	const { t } = useTranslation(['common']);
    const [currentActiveTab, setCurrentActiveTab] = useState('popular');

	return (
		<section className="special-cruise-tab menu-showcase-section pd-60">
			<div className="container">
				<ul className="nav nav-tabs" role="tablist">
					<li className="nav-item">
						<h2 className="title nav-link active text-left">
							<span>{t('popular')}</span>
						</h2>
					</li>
					<li className="nav-item">
						<h2 className="title nav-link text-left">
							<span>{t('discount')}</span>
						</h2>
					</li>
				</ul>
				<ProductsContainer products={[]} />
			</div>
		</section>
	);
};

export default PageSectionMenuShowcaseSection;
