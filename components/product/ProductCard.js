const ProductCard = ({ product }) => {
    return (
        <div className="product-item">
            <div className="product-image relative">
                <a href="" title=""><img src={product.thumbnail} alt="" title="" /></a>
                <div className="delivery absolute flex-center-center hide-abs">
                    <a href="" title="" className="btn btn-h46 btn-yellow btn-bgLeft" data-toggle="modal" data-target="#product-detail">Delivery Now</a>
                </div>
            </div>
            <div className="product-text">
                <h3 className="title-sm mgb-10">
                    <a href="" title="" data-toggle="modal" data-target="#product-detail">{product.title}</a>
                </h3>
                <div className="desc font-18 mgb-20">
                    {product.description}
                </div>
                <div className="product-price text-yellow font-28 font-demi">$ 120.00</div>
                <div className="product-sale mgt-10">
                    <span className="discount inflex-center-center btn-gray btn-h46 btn-bgLeft">Discount 30%</span>
                    <a href="menu.html" title="" className="btn-h46 inflex-center-center btn-gray more" data-toggle="modal" data-target="#product-detail">More</a>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;