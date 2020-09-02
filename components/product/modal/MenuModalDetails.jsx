/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { isNil, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import BaseLoader from '../../base/BaseLoader';
import BaseDiscountPill from '../../base/BaseDiscountPill';
import { setDeliveryType, setSelectedPrice } from '../../../store/actions/cart.actions';

const MealPrice = ({ price, onClick, isSelected }) => {
  const { discountType } = price.mealSettings[0] && price.mealSettings[0]
  const { currency } = useSelector((state) => state.root.settings);
  console.log(discountType, "size")
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return (<div onClick={onClick} className="" style={{ cursor: 'pointer', opacity: isSelected ? 1 : 0.4 }}>
    <span
      className="font-weight-bold"
      style={{
        whiteSpace: 'nowrap',
        fontSize: '1rem'
      }}
    >
      {discountType == "Fixed" ? 
        <span className="discount inflex-center-center btn-gray btn-bgLeft" style={{backgroundColor: 'transparent', zIndex: '100'}}>{`${currency} ${price.price} - ${price.size}`}</span> : 
        <span>{`${currency} ${price.price} - ${price.size}`}</span>
      }
      
    </span>
  </div>)
}

const DeliveryTypeSwitch = ({ deliveryType, onChange }) => {
  const types = ['Delivery', 'PickUp'];

  return (
    <div className="col-md-12" style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-start' }}>
      {types.map((type) => {
        return (
          <button onClick={() => onChange(type)} type="button" key={type} className="px-5 mr-5 btn btn-primary inflex-center-center btn-gray btn-h46">
            {type}
          </button>)
      })
      }
    </div>
  )
}

const MenuModalDetails = ({
  close,
  isActive,
  isLoading,
  productDetails,
  order,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['common']);
  const { currency } = useSelector((state) => state.root.settings);
  const { deliveryType, selectedPrice, orderItems, comboOrderItems } = useSelector((state) => state.cart);
  const { mealPrices } = productDetails;
  const { loyaltyPointsBase } = useSelector((state) => state.root.settings);

  const boundSetDeliveryType = (type) => dispatch(setDeliveryType(type));
  const boundSetSelectedPrice = (price) => dispatch(setSelectedPrice(price));

  const selectPrice = (id) => {
    if (selectedPrice.id === id) return;

    boundSetSelectedPrice(mealPrices.filter(price => price.id === id)[0]);
  }
  const calcFinalPrice = (price) => {
    if (isNil(price)) return 0;

    if (price.mealSettings.length === 0) return price.price;

    const mealSettings = price.mealSettings[0];

    if (!mealSettings.applyDiscount) return price.price;

    if (mealSettings.discountType === 'Fixed') return price.price - mealSettings.discount;

    if (mealSettings.discountType === 'Percentage') return price.price - (mealSettings.discount * price.price / 100);

    return price.price;
  }

  useEffect(() => {
    if (isNil(mealPrices) || isEmpty(mealPrices)) return;

    boundSetSelectedPrice(mealPrices[0]);
  }, []);

  useEffect(() => {
    if (isNil(mealPrices) || isEmpty(mealPrices)) return;

    boundSetSelectedPrice(mealPrices.filter(price => price.menuPriceOption === deliveryType)[0]);
  }, [deliveryType, mealPrices])

  if (!isActive) return '';
  if (isNil(productDetails)) return '';

  const onClose = () => {
    close();
    window.location.hash = ""
  }

  console.log(productDetails, "product")

  return (
    <div>
      <div className="modal fade full-box show" id="product-detail">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="product-details">
              <button type="button" className="close" onClick={onClose}>
                <i className="ti-close" />
              </button>
              <div className="detail-slider">
                {isLoading && <BaseLoader />}
                {!isLoading && (
                  <div className="item">
                    <div className="detail-wrapper flex">
                      <div className="product-gallery d-flex justify-content-center align-items-center">
                        <img
                          src={productDetails.thumbnail}
                          alt={productDetails.thumbnail}
                        />
                      </div>
                      <div className="product-right">
                        <div className="product-detail d-flex flex-column justify-content-between min-h-full">
                          <div>
                            <h1>{productDetails.title}</h1>
                            <p className="font-20 mgt-10 mgb-20">
                              Pizza with sea flavor, make you feel the sea
                            </p>
                            <div className="desc">
                              {productDetails.description}
                            </div>
                            <div className="product-index">
                              <ul className="flex-center">
                                <li>
                                  <span>
                                    <img
                                      style={{ height: '1.5rem' }}
                                      src={productDetails.category.imagePath}
                                      alt={productDetails.category.category}
                                    />
                                  </span>
                                  {productDetails.category.category}
                                </li>
                                <li>
                                  <span>
                                    <img
                                      src="images/icon/icon-dish.svg"
                                      alt=""
                                    />
                                  </span>
                                  {`${t('prepare')} ${
                                    productDetails.preparationDuration
                                    } ${t('minutes')}`}
                                </li>
                                {loyaltyPointsBase === 'POINTSBASE-ITEM' &&
                                  <li>
                                    {`${t('loyalty_points')}`}
                                  </li>
                                }
                              </ul>
                            </div>
                            {!isNil(productDetails.ingredients) && (
                              <div className="product-component flex">
                                <span>
                                  <img
                                    src="images/icon/icon-nutrition.svg"
                                    alt=""
                                  />
                                  {t('components')}
                                </span>
                                <div>{productDetails.ingredients}</div>
                              </div>
                            )}
                          </div>
                          <div className="group-price">
                            {/* show delivery switch if cart is empty  */}
                            {orderItems.length === 0 && comboOrderItems.length === 0 &&
                              <div className="form-inline">
                                <div className="container">
                                  <div style={{ marginTop: '20px', marginBottom: '20px', fontSize: '18px' }}>
                                    <span>Do you want to get {productDetails.title} by delivery or pickup?</span>
                                  </div>
                                  <div className="row">
                                    <DeliveryTypeSwitch deliveryType={deliveryType} onChange={(type) => boundSetDeliveryType(type)} />
                                  </div>
                                </div>
                              </div>
                            }
                            <div className="form-inline">
                              {
                                productDetails.offeredInSizes && <div className="container">
                                  <div style={{ marginTop: '40px', marginBottom: '20px', fontSize: '18px' }}>
                                    <span>Please select the meal size.</span>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12 mealSize" style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-start' }}>
                                      {mealPrices.map((price, index) => {
                                        if (price.menuPriceOption !== deliveryType) return '';
                                        return <button type="button" style = {{ padding: "0px", marginBottom:"20px"}} 

                                          onClick={() => selectPrice(price.id)} isSelected={selectedPrice.id === price.id}
                                          className="px-5 mr-5 btn btn-primary inflex-center-center btn-gray btn-h46">
                                          <MealPrice key={index} price={price} />
                                        </button>
                                      })}
                                    </div>
                                  </div>
                                </div>
                              }
                            </div>
                            <div className="row">
                              <div className="col-md-5">
                                <div className="new-price">{`${currency} ${calcFinalPrice(selectedPrice)}`}</div>
                              </div>
                              <div className="col-md-5 d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-yellow btn-h60 font-18 font-demi w230 btn-order"
                                  onClick={order}
                                >
                                  {t('add to cart')}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </div >
  );
};

export default MenuModalDetails;
