import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { isNil } from 'lodash';
import ProductModalDetails from '../../components/product/modal/ProductModalDetails';
import MenuModalDetails from '../../components/product/modal/MenuModalDetails';
import ProductModalCustomizeMeal from '../../components/product/modal/ProductModalCustomizeMeal';
import ProductModalConfirmMeal from '../../components/product/modal/ProductModalConfirmMeal';

import {
  setProductDetails,
  toggleProductDetailsModal,
  toggleProductDetailsModalLoader,
  toggleCustomizeProductModal,
  toggleConfirmProductModal,
  setProductDetailsTrigger
} from '../../store/actions/cart.actions';
import axios from '../../lib/axios';

const ProductsModalsContainer = ({ productType }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation(['common']);
  const { id: branchId } = useSelector((state) => state.root.currentBranch);
  const {
    currentActiveProductId,
    currentActiveProductIndex,
    isProductDetailsActive,
    isCustomizeProductModalActive,
    isProductDetailsLoaderActive,
    isConfirmProductModalActive,
    productDetails,
    isProductDetailsTrigger,
    isMenuDetailsTrigger
  } = useSelector((state) => state.cart);

  const boundToggleProductDetailsModal = () =>
    dispatch(toggleProductDetailsModal());

    const boundToggleCustomizeProductModal = () =>
    dispatch(toggleCustomizeProductModal());

  const boundSetProductDetails = (product) =>
    dispatch(setProductDetails(product));

  const boundToggleProductDetailsModalLoader = () =>
    dispatch(toggleProductDetailsModalLoader());

  const boundToggleConfirmProductModal = () => dispatch(toggleConfirmProductModal());

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
    if (productType === 'combo') {
      return queryString.stringify({
        comboId: id,
        culture: i18n.language,
        branchId,
      });
    }
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
      const url = productType === 'combo' ? 'combo-details' : 'meal-details';

      const response = await axios.get(
        `customer/web/meals-service/${url}?${query}`,
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
    let id = currentActiveProductId;
    const { productId } = queryString.parse(window.location.hash);
    if (!isNil(productId) && id === 0) {
      // eslint-disable-next-line radix
      id = parseInt(productId);
    } else if (id === 0) {
      return;
    }

    window.location = `#productId=${id}`;
    fetchProductDetails(id);
  }, [isProductDetailsTrigger, isMenuDetailsTrigger]);

  return (
    <div>
      <ProductModalDetails
        isActive={isProductDetailsActive}
        isLoading={isProductDetailsLoaderActive}
        productDetails={productDetails}
        close={boundToggleProductDetailsModal}
        order={() => handleOrder()}
      />
      <MenuModalDetails
        isActive={isProductDetailsActive}
        isLoading={isProductDetailsLoaderActive}
        productDetails={productDetails}
        close={boundToggleProductDetailsModal}
        order={() => handleOrder()}
      />
      <ProductModalConfirmMeal
        isActive={isConfirmProductModalActive}
        close={boundToggleConfirmProductModal}
        add={() => { }}
      />
      <ProductModalCustomizeMeal
        productType={productType}
        isActive={isCustomizeProductModalActive}
        productDetails={productDetails}
        close={boundToggleCustomizeProductModal}
      />
    </div>
  );
};

export default ProductsModalsContainer;
