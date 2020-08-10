import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import BaseLoader from '../../base/BaseLoader';

const ProductModalDetails = ({
  close,
  isActive,
  isLoading,
  productDetails,
  order,
}) => {
  const { t } = useTranslation(['common']);
  const { currency } = useSelector((state) => state.root.settings);

  if (!isActive) return '';
  if (isNil(productDetails)) return '';

  return (
    <div>
      <div className="modal fade full-box show" id="product-detail">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="product-details">
              <button type="button" className="close" onClick={close}>
                <i className="ti-close" />
              </button>
              <div className="detail-slider">
                {isLoading && <BaseLoader />}
                {!isLoading && (
                  <div className="item">
                    <div className="detail-wrapper flex">
                      <div className="product-gallery">
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
                            <div className="row">
                              <div className="col-md-7">
                                <div className="old-price">
                                  <span
                                    style={{
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {`${currency}`} 118.00
                                  </span>
                                  <div
                                    className="discount inflex-center-center btn-gray btn-h46 btn-bgLeft"
                                    style={{
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {`${t('discount')} 30%`}
                                  </div>
                                </div>
                                <div className="new-price">$ 76.00</div>
                              </div>
                              <div className="col-md-5 flex-end-end">
                                <button
                                  type="button"
                                  className="btn btn-yellow btn-h60 font-18 font-demi w230 btn-order"
                                  onClick={order}
                                >
                                  {t('order_now')}
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
    </div>
  );
};

export default ProductModalDetails;
