import React from 'react';
import ProductCard from '../../components/product/ProductCard';

const ProductsContainer = ({ products }) => {
	return (
		<div className="row">
			{products.map((product) => (
				<ProductCard product={product} />
			))}
		</div>
	);
};

export default ProductsContainer;
