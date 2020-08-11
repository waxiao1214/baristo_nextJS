import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { isNil } from 'lodash';
import axios from '../../../lib/axios';
import BaseLoader from '../../base/BaseLoader';
import ChoicesSection from '../topping/ChoicesSection';
import { toggleConfirmProductModal } from '../../../store/actions/cart.actions';

const ProductModalCustomizeMeal = ({ isActive, productDetails, close, productType }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(['common']);
  const { currency } = useSelector((state) => state.root.settings);
  const { selectedPrice } = useSelector((state) => state.cart);
  const { id: branchId } = useSelector((state) => state.root.currentBranch);

  // eslint-disable-next-line no-unused-vars
  const [choiceGroups, setChoiceGroups] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [isValidChoices, setIsValidChoices] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const boundToggleConfirmProductModal = () => dispatch(toggleConfirmProductModal());

  const calcFinalPrice = (price) => {
    if (isNil(price)) return 0;

    if (price.mealSettings.length === 0) return price.price;

    const mealSettings = price.mealSettings[0];

    if (!mealSettings.applyDiscount) return price.price;

    if (mealSettings.discountType === 'Fixed') return price.price - mealSettings.discount;

    if (mealSettings.discountType === 'Percentage') return price.price - (mealSettings.discount * price.price / 100);

    return price.price;
  }

  /**
   * Generate query object
   *
   * @return {String}
   */
  const generateQueryObject = () => {
    if (productType === 'combo') {
      return queryString.stringify({
        comboId: productDetails.id,
        culture: i18n.language,
        branchId,
      });
    }
    return queryString.stringify({
      mealId: productDetails.id,
      culture: i18n.language,
      branchId,
    });
  };

  /**
   * Fetch product details
   *
   * @param {Array} ids
   */
  const getMealToppings = async () => {
    setIsLoading(true);
    setToppings([]);
    const query = generateQueryObject();
    try {
      const url = productType === 'combo' ? 'combo-toppings' : 'meal-toppings';
      
      const response = await axios.get(
        `customer/web/meals-service/${url}?${query}`,
      );

      setToppings(response.data.result[0]?.choiceItems ?? []);
      setChoiceGroups(response.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    getMealToppings();
  }, [productDetails, isActive]);

  if (!isActive) return '';

  return (
    <div>
      <div className="customize-food show">
        <div className="customize-main">
          <div className="customize-top relative">
            <h2 className="title">
              <span>{t('build_your_meal')}</span>
            </h2>
            <button type="button" className="close close-customize" onClick={close}>
              <i className="ti-close" />
            </button>
          </div>
          <div className="flex-between">
            <div className="flex-left">
              <h3 className="font-weight-bold font-48 mgb-10">
                {productDetails.title}
              </h3>
              <div className="product-index">
                <ul className="flex-center">
                  <li>
                    <span>
                      <img
                        src={productDetails.category.imagePath}
                        alt={productDetails.category.category}
                        style={{ height: '1.5rem' }}
                      />
                    </span>
                    {productDetails.category.category}
                  </li>
                  <li>
                    <span>
                      <img src="images/icon/icon-dish.svg" alt="" title="" />
                    </span>
                    {`${t('prepare')} ${productDetails.preparationDuration} ${t(
                      'minutes',
                    )}`}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-right">
              <button
                type="button"
                className="btn btn-white btn-h50 font-20 font-demi"
                onClick={boundToggleConfirmProductModal}
              >
                <i className="ti-plus mgr-15" /> {t('meal')}
              </button>
            </div>
          </div>
          <div className="menu-money-2 mgt-50">
            <div className="row">
              <div className="col-md-6">
                <div className="total-menu">
                  <div className="flex-center-between mgb-10">
                    <span className="font-24 text-ghi">{t('order_total')}</span>
                    <span className="font-weight-bold font-36 text-green">
                      {`${currency} ${selectedPrice.price}`}
                    </span>
                  </div>
                  {/* discount  */}
                  {selectedPrice.mealSettings[0]?.discount &&
                    <div className="flex-center-between mgb-10">
                      <span className="font-24 text-ghi">{t('discount')}</span>
                      <span className="font-weight-bold font-36 text-green">
                        {selectedPrice.mealSettings[0]?.discountType ===
                          'Fixed'
                        ? `${currency} `
                        : '% '}
                      {selectedPrice.mealSettings[0]?.discount}
                      </span>
                    </div>
                  }
                  <div className="flex-center-end">
                    <span className="font-weight-bold font-56 text-yellow">
                      {calcFinalPrice(selectedPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="total-promotion">
                  <p className="font-24 font-medium mgb-10">{t('optional')}</p>
                  <div className="font-24 mgb-30">
                    {toppings.map((topping, index) => {
                      if (!selectedToppings.includes(topping.id)) return '';

                      return <span key={topping.id}>{`${topping.choiceItem} ${index === selectedToppings.length - 1 ? '' : ', '}`}</span>
                    })}
                    {selectedToppings.length === 0 &&
                      <div className="text-center py-10 desc font-20 mgb-20">
                        <p>{t('no_toppings_selected')}</p>
                      </div>
                    }
                  </div>
                  <button
                    type="button"
                    className="btn btn-block btn-yellow btn-h80 font-24 font-weight-bold"
                  >
                    <span className="mgr-15">{t('check_out')}</span>
                    <i className="ti-arrow-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="optional mgt-50">
            {isLoading && <BaseLoader />}
            <h2 className="title text-left font-36 mgb-40">
              <span>{t('optional_topping')}</span>
            </h2>
            {!isLoading && choiceGroups.length !== 0 && 
                choiceGroups.map(choiceGroup => {
                  return <ChoicesSection choiceGroup={choiceGroup}/>
              })
            }
            {!isLoading && choiceGroups.length === 0 && (
              <div className="row">
                <div className="text-center px-3 py-10 desc font-20 mgb-20">
                  <p>{t('no_result')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductModalCustomizeMeal.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ProductModalCustomizeMeal;
