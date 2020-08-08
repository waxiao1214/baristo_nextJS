import React from 'react';
import _ from 'lodash';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  setProductDetails,
  toggleProductDetailsModal,
  toggleProductDetailsModalLoader,
} from '../../store/actions/cart.actions';
import ProductCard from '../../components/product/ProductCard';
import axios from '../../lib/axios';

const ProductsContainer = ({ products }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation(['common']);
  const { id: branchId } = useSelector((state) => state.root.currentBranch);

  const boundSetProductDetails = (product) => dispatch(setProductDetails(product));
  const boundToggleProductDetailsModalLoader = () =>
    dispatch(toggleProductDetailsModalLoader());
  const boundToggleProductDetailsModal = () =>
    dispatch(toggleProductDetailsModal());
  
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

  const openMoreDetailsModal = (id) => {
    fetchProductDetails(id);
  };

  if (!_.isArray(products)) return '';

  return (
    <div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <ProductCard
              openMoreDetails={() => openMoreDetailsModal(product.id)}
              product={product}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ProductsContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired,
};

export default ProductsContainer;
