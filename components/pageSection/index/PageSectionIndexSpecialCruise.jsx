import { withTranslation } from '../../../i18n/i18n';
import ProductsContainer from '../../../containers/products/ProductsContainer';

const PageSectionIndexSpecialCruise = ({ specialCruises, t }) => {
	return (
		<section className="special-cruise pd-100">
			<div className="container">
				<h2 className="title">
					<span>{t('special_cruise')}</span>
				</h2>
				<ProductsContainer products={specialCruises} />
			</div>
		</section>
	);
};

export default withTranslation()(PageSectionIndexSpecialCruise);
