import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ProductModalCustomizeMeal = ({ isActive }) => {
  const { t } = useTranslation(['common']);

  if (!isActive) return '';

  return (
    <div>
      <div className="customize-food show">
        <div className="customize-main">
          <div className="customize-top relative">
            <h2 className="title">
              <span>{t('build_your_meal')}</span>
            </h2>
            <button
              type="button"
              className="close close-customize"
            >
              <i className="ti-close" />
            </button>
          </div>
          <div className="flex-between">
            <div className="flex-left">
              <h3 className="font-weight-bold font-48 mgb-10">
                Healthy Pizza of Seafood
              </h3>
              <div className="product-index">
                <ul className="flex-center">
                  <li>
                    <span>
                      <img src="images/icon/icon-cutler.svg" alt="" title="" />
                    </span>
                    Fast Food
                  </li>
                  <li>
                    <span>
                      <img src="images/icon/icon-dish.svg" alt="" title="" />
                    </span>
                    Prepare: 13 minutes
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-right">
              <button
                type="button"
                className="btn btn-white btn-h50 font-20 font-demi"
                data-toggle="modal"
                data-target="#confirm-meal"
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
                      $ 76.00
                    </span>
                  </div>
                  <div className="flex-center-between mgb-10">
                    <span className="font-24 text-ghi">Coupon</span>
                    <span className="font-weight-bold font-36 text-green">
                      - $10
                    </span>
                  </div>
                  <div className="flex-center-between mgb-10">
                    <span className="font-24 text-ghi">Loyalty Point</span>
                    <span className="font-weight-bold font-36 text-green">
                      - $10
                    </span>
                  </div>
                  <div className="flex-center-end">
                    <span className="font-weight-bold font-56 text-yellow">
                      $ 76.00
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="total-promotion">
                  <p className="font-24 font-medium mgb-10">Optional</p>
                  <div className="font-24 mgb-30">
                    x2 Cheese, Crab, Grimp, no tomato sauce, Sausage...{' '}
                    <a href="" title="" className="view">
                      (view)
                    </a>
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
            <h2 className="title text-left font-36 mgb-40">
              <span>Optional Topping</span>
            </h2>
            <div className="row">
              <div className="col-md-6 col-6">
                <div className="optional-item">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="optional-image">
                        <img
                          src="images/picture/optional-1.png"
                          alt=""
                          title=""
                        />
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="optional-info">
                        <h4 className="font-24 font-medium">x2 Cheese</h4>
                        <div className="font-weight-bold font-32 text-yellow">
                          $10
                        </div>
                        <button
                          type="button"
                          className="btn-remove-op btn-optional font-18 font-demi mgt-30"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
