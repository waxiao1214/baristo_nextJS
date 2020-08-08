import React from 'react';
import _ from 'lodash';
import ProductCard from '../../components/product/ProductCard';
import ProductSlider from '../../components/product/slider/ProductSlider';

const ProductsContainer = ({ products }) => {
	if (!_.isArray(products)) return '';

	return (
		<div>
			<ProductSlider />
			<div className="row">
				{products.map((product) => (
					<div className="col-md-4" key={product.id}>
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductsContainer;
