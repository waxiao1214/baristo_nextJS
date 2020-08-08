import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductSliderSlide from './ProductSliderSlide';

SwiperCore.use([Navigation]);

const ProductSlider = ({ close, isActive }) => {
	if (!isActive) return '';

	return (
		<div>
			<div className="modal fade full-box show" id="product-detail">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="product-details">
							<button
								type="button"
								className="close"
								onClick={close}
							>
								<i className="ti-close"></i>
							</button>
							<div className="detail-slider">
								<Swiper
									spaceBetween={20}
									slidesPerView={1}
									navigation
								>
									<SwiperSlide>
										<ProductSliderSlide />
									</SwiperSlide>
									<SwiperSlide>
										<ProductSliderSlide />
									</SwiperSlide>
								</Swiper>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
	);
};

export default ProductSlider;
