import { useSelector, useDispatch } from 'react-redux';
import { toggleCustomizeProductModal, toggleProductDetailsModal } from '../../store/actions/cart.actions';
import ProductModalDetails from '../../components/product/modal/ProductModalDetails';
import ProductModalCustomizeMeal from '../../components/product/modal/ProductModalCustomizeMeal';

const ProductsModalsContainer = () => {
  const dispatch = useDispatch();
  const {
    isProductDetailsActive,
    isCustomizeProductModalActive,
    isProductDetailsLoaderActive,
    productDetails,
  } = useSelector((state) => state.cart);

  const boundToggleProductDetailsModal = () =>
    dispatch(toggleProductDetailsModal());

  const boundToggleCustomizeProductModal = () =>
    dispatch(toggleCustomizeProductModal());
  
  const handleOrder = () => {
    boundToggleProductDetailsModal();
    boundToggleCustomizeProductModal();
  };
  
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
