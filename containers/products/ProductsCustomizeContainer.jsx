import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import _ from 'lodash';
import ProductModalDetails from '../../components/product/modal/ProductModalDetails';
import ProductModalCustomizeMeal from '../../components/product/modal/ProductModalCustomizeMeal';
import {
  setProductDetails,
  toggleProductDetailsModal,
  toggleProductDetailsModalLoader,
  toggleCustomizeProductModal,
} from '../../store/actions/cart.actions';
import axios from '../../lib/axios';

const ProductsModalsContainer = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation(['common']);
  const { id: branchId } = useSelector((state) => state.root.currentBranch);
  const {
    currentActiveProductId,
    currentActiveProductIndex,
    isProductDetailsActive,
    isCustomizeProductModalActive,
    isProductDetailsLoaderActive,
    productDetails,
  } = useSelector((state) => state.cart);

  const boundToggleProductDetailsModal = () =>
    dispatch(toggleProductDetailsModal());

  const boundToggleCustomizeProductModal = () =>
    dispatch(toggleCustomizeProductModal());

  const boundSetProductDetails = (product) =>
    dispatch(setProductDetails(product));

  const boundToggleProductDetailsModalLoader = () =>
    dispatch(toggleProductDetailsModalLoader());

  const handleOrder = () => {
    boundToggleProductDetailsModal();
    boundToggleCustomizeProductModal();
  };

  /**
   * Generate query object
   *
   * @param {Number} id
   * @return {String}
   */
  const generateQueryObject = (id) => {
    return queryString.stringify({
      mealId: id,
      culture: i18n.language,
      branchId,
    });
  };

  /**
   * Fetch product details
   *
   * @param {Array} ids
   */
  const fetchProductDetails = async (id) => {
    boundToggleProductDetailsModalLoader();
    boundToggleProductDetailsModal();
    const query = generateQueryObject(id);
    try {
      const response = await axios.get(
        `customer/web/meals-service/meal-details?${query}`,
      );

      boundSetProductDetails(response.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      boundToggleProductDetailsModalLoader();
    }
  };

  // on id or index change fetch the details again
  useEffect(() => {
    if (currentActiveProductId === 0) return;
    console.log('adf')
    fetchProductDetails(currentActiveProductId);
  }, [currentActiveProductId, currentActiveProductIndex]);

  return (
    <div>
      <ProductModalDetails
        isActive={isProductDetailsActive}
        isLoading={isProductDetailsLoaderActive}
        productDetails={productDetails}
        close={boundToggleProductDetailsModal}
        order={() => handleOrder()}
      />
      <ProductModalCustomizeMeal
        isActive={isCustomizeProductModalActive}
        productDetails={productDetails}
        close={boundToggleCustomizeProductModal}
      />
    </div>
  );
};

export default ProductsModalsContainer;
