import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const BaseDiscountPill = ({ discount }) => {
    const { currency } = useSelector((state) => state.root.settings);
    const { t } = useTranslation(['common']);

    if (!discount.applyDiscount) return '';

    return (<div className="product-sale">
        <span className="discount inflex-center-center btn-gray btn-h46 btn-bgLeft">
            {t('discount')}{' '}
            {discount.discount}
            {discount.discountType ===
                'Fixed'
                ? currency
                : '%'}
        </span>
    </div>)
}

export default BaseDiscountPill;