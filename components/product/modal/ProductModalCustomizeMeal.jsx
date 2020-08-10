import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from '../../../lib/axios';
import BaseLoader from '../../base/BaseLoader';

const ProductModalCustomizeMeal = ({ isActive, productDetails }) => {
  const { t, i18n } = useTranslation(['common']);
  const { currency } = useSelector((state) => state.root.settings);
  const { id: branchId } = useSelector((state) => state.root.currentBranch);

  // eslint-disable-next-line no-unused-vars
  const [toppings, setToppings] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Generate query object
   *
   * @return {String}
   */
  const generateQueryObject = () => {
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
      const response = await axios.get(
        `customer/web/meals-service/meal-topping?${query}`,
      );

      console.log(response.data.result);
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
            <button type="button" className="close close-customize">
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
              >
                <i className="ti-plus mgr-15" /> MEAL
              </button>
            </div>
          </div>
          <div className="menu-money-2 mgt-50">
            <div className="row">
              <div className="col-md-6">
                <div className="total-menu">
                  <div className="flex-center-between mgb-10">
                    <span className="font-24 text-ghi">Order Total</span>
                    <span className="font-weight-bold font-36 text-green">
                      {`${currency} 76.00`}
                    </span>
                  </div>
                  <div className="flex-center-end">
                    <span className="font-weight-bold font-56 text-yellow">
                      76.00
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="total-promotion">
                  <p className="font-24 font-medium mgb-10">Optional</p>
                  <div className="font-24 mgb-30">
                    x2 Cheese, Crab, Grimp, no tomato sauce, Sausage...
                  </div>
                  <button
                    type="button"
                    className="btn btn-block btn-yellow btn-h80 font-24 font-weight-bold"
                  >
                    <span className="mgr-15">CHECK OUT</span>
                    <i className="ti-arrow-right" />{' '}
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
            {!isLoading && toppings.length !== 0 && (
              <div className="row">
                <div className="col-md-6 col-6" />
              </div>
            )}
            {!isLoading && toppings.length === 0 && (
              <div className="row">
                <div className="text-center py-10 desc font-20 mgb-20">
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
