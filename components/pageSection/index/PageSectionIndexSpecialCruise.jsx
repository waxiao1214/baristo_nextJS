import { useTranslation } from 'react-i18next';
import ProductsContainer from '../../../containers/products/ProductsContainer';

const PageSectionIndexSpecialCruise = ({ specialCruises }) => {
	const { t } = useTranslation(['home']);

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

export default PageSectionIndexSpecialCruise;
