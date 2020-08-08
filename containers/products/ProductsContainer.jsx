import React, { useState } from 'react';
import _ from 'lodash';
import ProductCard from '../../components/product/ProductCard';
import ProductSlider from '../../components/product/slider/ProductSlider';

const ProductsContainer = ({ products }) => {
	const [isProductSliderActive, setIsProductSliderActive] = useState(false);

	const openProductSlider = (id, index) => {
		console.log(id, index);
	}

	if (!_.isArray(products)) return '';

	return (
		<div>
			<ProductSlider
				isActive={isProductSliderActive}
				close={() => setIsProductSliderActive(false)}
			/>
			<div className="row">
				{products.map((product, index) => (
					<div className="col-md-4" key={product.id}>
						<ProductCard
							openMoreDetails={() => openProductSlider(product.id, index)}
							product={product}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductsContainer;
