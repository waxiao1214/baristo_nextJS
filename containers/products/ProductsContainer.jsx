import React from 'react';
import ProductCard from '../../components/product/ProductCard';
import _ from 'lodash';

const ProductsContainer = ({ products }) => {
	if (!_.isArray(products)) return '';

	return (
		<div className="row">
			{products.map((product) => (
				<div className="col-md-4" key={product.id}>
					<ProductCard product={product}/>
				</div>
			))}
		</div>
	);
};

export default ProductsContainer;
