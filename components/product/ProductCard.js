import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product }) => {
    const { t } = useTranslation(['common']);
    const { currency } = useSelector(state => state.settings)
    const { mealPrices } = product;
    const mainMeal = mealPrices[0];

    /**
     * Check if the discount is still 
     * valid in terms of date range
     * @param {*} from 
     * @param {*} to 
     * @return {Boolean}
     */
    const isDiscountStillInRange = (from, to) => {
        if (!from || !to) return false;

        const fromDate = new Date(from);
        const toDate = new Date(to);
        const now = new Date();

        if (now < fromDate || now > toDate) return false;
        
        return true;
    }

    return (
        <div className="product-item">
            <div className="product-image relative">
                <a href="" title=""><img src={product.thumbnail} /></a>
                {mainMeal.menuPriceOption === 'Delivery' &&
                    <div className="delivery absolute flex-center-center hide-abs">
                        <button
                            className="btn btn-h46 btn-yellow btn-bgLeft"
                        >
                            {t('delivery_now')}
                        </button>
                    </div>
                }
                {mainMeal.menuPriceOption === 'PickUp' &&
                    <div className="absolute flex-center-center hide-abs">
                        <button
                            className="btn btn-h46 btn-yellow"
                        >
                            {t('pick_up')}
                        </button>
                    </div>
                }
            </div>
            <div className="product-text">
                <h3 className="title-sm mgb-10">
                    <a href="" title="" data-toggle="modal" data-target="#product-detail">{product.title}</a>
                </h3>
                <div className="desc font-18 mgb-20">
                    {product.description}
                </div>

                {mealPrices.map((mealPrice, index) => {
                    return (
                        <div className={index !== 0 ? 'product-size-variation' : ''} key={mealPrice.id}>
                            <div className="product-price-size">
                                <div className="product-price text-yellow font-28 font-demi">{`${currency} ${mealPrice.price}`}</div>
                                <span>{mealPrice.size}</span>
                            </div>
                            {mealPrice.mealSettings[0].applyDiscount && isDiscountStillInRange(mealPrice.mealSettings[0].from, mealPrice.mealSettings[0].to) &&
                                <div className="product-sale mgt-10">
                                    <span className="discount inflex-center-center btn-gray btn-h46 btn-bgLeft">
                                    {t('discount')} {mealPrice.mealSettings[0].discount}{mealPrice.mealSettings[0].discountType === 'Fixed' ? currency : '%'}
                                </span>
                                    <a className="btn-h46 inflex-center-center btn-gray more">{t('more')}</a>
                                </div>
                            }
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
}

export default ProductCard;