const ProductSliderSlide = () => {
	return (
		<div className="item">
			<div className="detail-wrapper flex">
				<div className="product-gallery">
					<img src="images/picture/product-detail.png" />
				</div>
				<div className="product-right">
					<div className="product-detail">
						<h1>Healthy Pizza of Seafood</h1>
						<p className="font-20 mgt-10 mgb-20">
							Pizza with sea flavor, make you feel the sea
						</p>
						<div className="desc">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam,
						</div>
						<div className="product-index">
							<ul className="flex-center">
								<li>
									<span>
										<img src="images/icon/icon-cutler.svg" />
									</span>
									Fast Food
								</li>
								<li>
									<span>
										<img src="images/icon/icon-dish.svg" />
									</span>
									Prepare: 13 minutes
								</li>
							</ul>
						</div>
						<div className="product-component flex">
							<span>
								<img src="images/icon/icon-nutrition.svg" />
								Component
							</span>
							<div>
								Piza, Eggs, Sweet pepper, Spicy tomato, Shrimp,
								Cheese, Green onion
							</div>
						</div>
						<div className="group-price">
							<div className="row">
								<div className="col-md-7">
									<div className="old-price">
										<span>$ 118.00</span>
										<div className="discount inflex-center-center btn-gray btn-h46 btn-bgLeft">
											Discount 30%
										</div>
									</div>
									<div className="new-price">$ 76.00</div>
								</div>
								<div className="col-md-5 flex-end-end">
									<button className="btn btn-yellow btn-h60 font-18 font-demi w230 btn-order">
										ORDER NOW
									</button>
									<button className="btn btn-yellow btn-h60 font-18 font-demi w230 btn-order btn-mobile">
										CANCEL
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSliderSlide;
